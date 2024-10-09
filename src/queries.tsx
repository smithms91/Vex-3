"use server";

import { createClient } from "./lib/supabase/server";
import { redirect } from "next/navigation";
import type { Stripe } from "stripe";
import { z } from "zod";
import {
  SignInSchema,
  OnboardingSchema,
  OnboardingSchemaTwo,
  AddSocialSchema,
  UpdatePasswordSchema,
  UpdateUsernameSchema,
  UpdateEmailSchema,
  DeleteAccountSchema,
  User,
} from "@/types";
import { revalidatePath } from "next/cache";
import { Social } from "./types";
import { v4 as uuidv4 } from "uuid";
import { decode } from "base64-arraybuffer";

// Table of Contents (ctrl + f to goto function)
// signUp               -> Sign up a user
// signUpWithCard       -> Sign up a user with a card ID (Card Sign Up Route - only used when user scans a card with no user_id)
// signIn               -> Sign in a user
// signOut              -> Sign out a user
// disableAccount       -> Disable a user account
// deleteAccount        -> Delete a user account
// getAccountDisabled   -> Get the status of a user account (disabled or not)
// verifyUsername       -> Verify if a username is available
// getAuthUserEmail     -> Get the email of the authenticated user
// forgotUserPassword   -> Send a password reset email
// updateForgotPassword -> Update the user's password
// setUserBorder        -> Set the user's border
// setUserThemeColor    -> Set the user's theme color
// updateProfile        -> Update the user's profile
// updateProfileTwo     -> Update the user's profile pt. 2
// updateUserPassword   -> Update the user's password
// updateProfileEmail   -> Only called when updateUserEmail is called to update user email in profile table to match auth email change.
// updateUserEmail      -> Update the user's email (the one they use to sign in and receive emails too)
// updateUsername       -> Update the user's username
// updateProfileColor   -> Update the user's profile color
// getProfileColor      -> Get the user's profile color
// getThemeColor        -> Get the user's theme color
// uploadProfileImage   -> Upload a profile image
// getProfilePicture    -> Get the user's profile picture
// getUserId            -> Get the user's ID
// updateUserDirect     -> Update the user's direct status
// addUserSocial        -> Add a social to the user's profile
// getUserSocial        -> Get a single social object
// getUserSocials       -> Get all socials
// updateSocial         -> Update a single social object
// updateUserSocials    -> Update all socials
// deleteSocial         -> Delete a single social object
// getUserProfile       -> Get a user's profile
// lookupCardId         -> Lookup a card ID returns associated user profile if exists or null if not

export const signUp = async (values: z.infer<typeof SignInSchema>) => {
  const { email, password } = values;
  const supabase = createClient();

  // First, check if the user already exists
  const { data: existingUser, error: checkError } = await supabase
    .from('profiles')
    .select('id')
    .eq('email', email)
    .single();

  // AI gave me this, no clue what error code PGRST116 is
  if (checkError && checkError.code !== 'PGRST116') {
    console.error('Error checking existing user:', checkError);
    return redirect("/sign-up?message=An error occurred. Please try again.");
  }

  if (existingUser) {
    // User exists, send magic link
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `https://vex.cards/account`,
      },
    });

    if (error) {
      console.error('Error sending magic link:', error);
      if (error.message.includes('Email rate limit exceeded')) {
        return redirect("/sign-up?message=Too many attempts. Please try again later.");
      }
      return redirect("/sign-up?message=Could not send login link. Please try again.");
    }

    return redirect("/sign-up?message=Check your email for a login link.");
  }

  // If user doesn't exist, proceed with sign up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Email rate limit exceeded')) {
      return redirect("/sign-up?message=Too many attempts. Please try again later.");
    }
    return redirect("/sign-up?message=Could not create account. Please try again.");
  }

  if (!data.user) {
    return redirect("/sign-up?message=Could not create user");
  }

  return redirect("/sign-in?message=Check email for confirmation.");
};

export const signUpWithCard = async (values: z.infer<typeof SignInSchema>, cardId: string) => {
  const { email, password } = values;
  const supabase = createClient();

  // Sign up the user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Error signing up:", error);
    throw error;
  }

  if (!data.user) {
    throw new Error("User creation failed");
  }

  const { error: updateError } = await supabase.rpc('update_card_user', {
    p_card_id: cardId,
    p_user_id: data.user.id
  });

  if (updateError) {
    console.error("Error updating card:", updateError);
    throw updateError;
  }

  // Possibly just return data and handle success message on current route.
  return redirect("/sign-in?message=Check email for confirmation.");
}

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  const { email, password } = values;
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/sign-in?message=Could not authenticate user");
  }

  return redirect("/account");
};

export const signOut = async () => {
  const supabase = createClient();

  const user = supabase.auth.getUser();

  if (!user) {
    throw new Error("No user is currently signed in");
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return redirect("/sign-out?message=Could not sign out");
  }

  return redirect("/");
};

export const disableAccount = async (value: boolean) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({ disabled: value })
      .eq("id", userId)
      .select();

    return response;
  } catch (error) {
    console.error("Error disabling account:", error);
  }
};

export const deleteAccount = async (
  values: z.infer<typeof DeleteAccountSchema>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  const verifyResponse = await supabase.rpc("verify_user_password", {
    password: values.password,
  });

  if (verifyResponse.data) {
    try {
      const deletedUser = await supabase.rpc("delete_user");
      // await signOut();
      return true;
    } catch (error) {
      console.error("Error disabling account:", error);
    }
  }
  return false;
};

export const getAccountDisabled = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .select("disabled")
      .eq("id", userId);

    if (!response.data || response.data.length === 0) {
      return false;
    }
    console.log("response", response.data[0].disabled);
    return response.data[0].disabled === true ? true : false;
  } catch (error) {
    console.error("Error getting account disabled:", error);
  }
};
// Checks if username is available to be taken. Returns true if available, false if not.
export const verifyUsername = async (username: string) => {
  const supabase = createClient();

  if (username === "" || username === null) return false;

  if (username.length < 3 || username.length > 20) return false;

  // Get the current authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  // Get the current user's profile
  const { data: currentUserProfile, error: currentUserError } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  if (currentUserError) {
    console.error("Error fetching current user profile:", currentUserError);
    return false;
  }

  // Check if the username belongs to the current user
  if (currentUserProfile.username === username) {
    return true; // Username is available (it's the user's current username)
  }

  // Check if the username is taken by another user
  const { data: existingUser, error: existingUserError } = await supabase
    .from("profiles")
    .select()
    .eq("username", username);

  if (existingUserError) {
    console.error("Error checking existing username:", existingUserError);
    return false;
  }

  if (existingUser && existingUser.length > 0) {
    return false; // Username is taken by another user
  }

  return true; // Username is available
};

// Gets the currently authenticated user's email
export const getAuthUserEmail = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  return user.data.user?.email;
};

export const forgotUserPassword = async (email: string) => {
  const supabase = createClient();
  try {
    const response = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        "http://localhost:3000/account/settings/user-settings/forgot-password",
    });

    return response;
  } catch (error) {
    console.error("Error resetting password:", error);
  }
};

export const updateForgotPassword = async (
  password: string,
  token?: string
) => {
  const supabase = createClient();

  try {
    const response = await supabase.auth.updateUser({ password });

    return response;
  } catch (error) {
    console.error("Error updating password:", error);
  }
};

export const setUserBorder = async (border: string) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({ border })
      .eq("id", userId)
      .select();

    return response;
  } catch (error) {
    console.error("Error updating border:", error);
  }
};

export const setUserThemeColor = async (color: string) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({ theme_color: color })
      .eq("id", userId)
      .select();

    revalidatePath("/account");
    return response;
  } catch (error) {
    console.error("Error updating border:", error);
  }
};

export const updateProfile = async (
  values: z.infer<typeof OnboardingSchema>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: user.data.user?.email,
        onboarding: false,
      })
      .eq("id", userId)
      .select();

    revalidatePath("/account");
    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

export const updateProfileTwo = async (
  values: z.infer<typeof OnboardingSchemaTwo>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
        job_title: values.job_title,
        phone_number: values.phone_number,
        website: values.website,
        onboarding: true,
      })
      .eq("id", userId)
      .select();

    revalidatePath("/account");
    return response;
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

export const updateUserPassword = async (
  values: z.infer<typeof UpdatePasswordSchema>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const verifyResponse = await supabase.rpc("verify_user_password", {
    password: values.current_password,
  });

  if (verifyResponse.data) {
    try {
      const response = await supabase.auth.updateUser({
        password: values.new_password,
      });

      console.error("GG:");
      return response;
    } catch (error) {
      console.error("Error updating password:", error);
    }
  } else {
    return false;
  }
};

// Helper function to update the profile table with the new email. FIX: Configure a SQL function to automatically update the email in the profiles table when the user updates their email.
const updateProfileEmail = async (
  values: z.infer<typeof UpdateEmailSchema>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({
        email: values.email,
      })
      .eq("id", userId)
      .select();

    return response;
  } catch (error) {
    console.error("Error updating email:", error);
  }
};

export const updateUserEmail = async (
  values: z.infer<typeof UpdateEmailSchema>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const verifyResponse = await supabase.rpc("verify_user_password", {
    password: values.password,
  });

  if (verifyResponse.data) {
    try {
      const response = await supabase.auth.updateUser(
        {
          email: values.email,
        },
        { emailRedirectTo: "http://localhost:3000/account" }
      );

      await updateProfileEmail(values);
      revalidatePath("/account/settings/user-settings/update-email");
      return response;
    } catch (error) {
      console.error("Error updating email:", error);
    }
  } else {
    return false;
  }
};

export const updateUsername = async (
  values: z.infer<typeof UpdateUsernameSchema>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const verifyResponse = await supabase.rpc("verify_user_password", {
    password: values.password,
  });

  if (verifyResponse.data) {
    try {
      const response = await verifyUsername(values.username);

      if (!response) {
        console.error("Username Taken");
        return { msg: "Username Taken" };
      }

      const data = await supabase
        .from("profiles")
        .update({ username: values.username })
        .eq("id", user.data.user?.id)
        .select();
      revalidatePath("/account/settings/user-settings/update-username");
      return { msg: "Username Updated", data: data };
    } catch (error) {
      console.error("Error updating username:", error);
    }
  } else {
    return { msg: "Password Incorrect" };
  }
};

export const updateProfileColor = async (color: string) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({
        profile_color: color,
      })
      .eq("id", userId)
      .select();

    revalidatePath("/account");
    return response;
  } catch (error) {
    console.error("Error updating profile color:", error);
  }
};

export const getProfileColor = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .select("profile_color")
      .eq("id", userId);

    if (!response.data || response.data.length === 0) {
      return "blue";
    }

    return response.data[0].profile_color;
  } catch (error) {
    console.error("Error getting profile color:", error);
  }
};

export const getThemeColor = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .select("theme_color")
      .eq("id", userId);

    if (!response.data || response.data.length === 0) {
      return "dark";
    }

    return response.data[0].theme_color;
  } catch (error) {
    console.error("Error getting profile color:", error);
  }
};

export const uploadProfileImage = async (url: string) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }
  console.log("url", url);
  const filePath = `profile_pictures/${Date.now()}.png`;
  console.log("url", url);

  // Remove the prefix that declares the base64 image
  const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
  console.log("base64Data", base64Data);

  try {
    const { data, error } = await supabase.storage
      .from("profile_pictures")
      .upload(filePath, decode(base64Data), { contentType: "image/*" });

    if (error) {
      console.error("Error uploading image:", error);
    } else {
      console.log("Image uploaded successfully");
      try {
        const userId = user.data.user?.id;
        const response = await supabase
          .from("profiles")
          .update({
            profile_picture: `https://bqsmvopplukdfrrkowkz.supabase.co/storage/v1/object/public/profile_pictures/${data.path}`,
          })
          .eq("id", userId);

        revalidatePath("/account/setup");
        return response;
      } catch (error) {
        console.error("Error adding profile picture to profile:", error);
      }
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const getProfilePicture = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .select("profile_picture")
      .eq("id", userId);

    if (!response.data || response.data.length === 0) {
      return "";
    }

    return response.data[0].profile_picture;
  } catch (error) {
    console.error("Error getting profile picture:", error);
  }
};

export const getUserId = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id!;

  return userId;
};

export const updateUserDirect = async (direct: boolean) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id!;

  try {
    const response = await supabase
      .from("profiles")
      .update({ direct: direct })
      .eq("id", userId)
      .select();

    return response.data && response.data[0].direct;
  } catch (error) {
    console.error("Error getting profile picture:", error);
    return error;
  }
};

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
/////////////// Socials ////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export const addUserSocial = async (
  values: z.infer<typeof AddSocialSchema>
) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;
  const socials = await getUserSocials();

  const newObject = {
    id: uuidv4(),
    name: values.name,
    title: values.title,
    value: values.value,
    network: values.network,
    url: values.url,
    user_id: userId,
  };

  const newSocials = [...socials, newObject];

  try {
    const response = await supabase
      .from("profiles")
      .update({ socials: newSocials })
      .eq("id", userId)
      .select();

    revalidatePath("/account/setup");
    return response;
  } catch (error) {
    console.error("Error adding social:", error);
  }
};

// Get Single Social Object from the ID
export const getUserSocial = async (id: string) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .select("socials")
      .eq("id", userId);

    if (!response.data) return null;

    const socialObject: Social = response.data[0].socials.find(
      (social: { id: string }) => social.id === id
    );

    if (!socialObject) return null;

    return socialObject;
  } catch (error) {
    console.error("Error getting User ID:", error);
  }
};

// Get Entire Social Array from the User Profile
export const getUserSocials = async () => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .select("socials")
      .eq("id", userId);

    if (!response.data) return null;

    return response.data[0].socials || [];
  } catch (error) {
    console.error("Error getting User ID:", error);
  }
};

// Update a single social object
export const updateSocial = async (social: Social) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  let socials = [];

  if (!user) {
    throw new Error("No authenticated user");
  }

  try {
    socials = await getUserSocials();
  } catch (error) {
    console.error("Error updating social:", error);
  }

  const updatedSocials = socials.map((item: any) => {
    return item.id === social.id ? social : item;
  });

  try {
    await updateUserSocials(updatedSocials);
  } catch (error) {
    console.error("Error updating social:", error);
  }

  revalidatePath("/account");
  return updatedSocials;
};

// Used for re-ordering the socials on account page.
export const updateUserSocials = async (socials: Social[]) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({ socials: socials })
      .eq("id", userId)
      .select();

    revalidatePath("/account");
    return response;
  } catch (error) {
    console.error("Error getting User ID:", error);
  }
};

// Delete a single social object
export const deleteSocial = async (social: Social) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  const socials = await getUserSocials();
  const newSocials = socials.filter((item: Social) => item.id !== social.id);

  try {
    const response = await supabase
      .from("profiles")
      .update({ socials: newSocials })
      .eq("id", userId)
      .select();

    revalidatePath("/account");
    return response;
  } catch (error) {
    console.error("Error getting User ID:", error);
  }
};

export const updateUserBranding = async (value: boolean) => {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from("profiles")
      .update({ vex_branding: value })
      .eq("id", userId)
      .select();

    revalidatePath("/account/setup");
    return response;
  } catch (error) {
    console.error("Error getting User ID:", error);
  }
};

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
////////////////////User profile queries/////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

export const getUserProfile = async (username: string) => {
  const supabase = createClient();
  let user;

  // Decode the username
  const decodedUsername = decodeURIComponent(username);

  if (username.includes("-")) {
    user = await supabase.from("profiles").select().eq("id", decodedUsername);
  } else {
    user = await supabase
      .from("profiles")
      .select()
      .eq("username", decodedUsername);
  }

  if (!user.data) {
    return null;
  }

  console.log("user", user.data[0]);
  return user.data[0] as User;
};

//
// Stripe
//

export const updatePremiumUser = async (session: Stripe.Checkout.Session) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;
  console.log("session", session);
  console.log("session Email", session.customer_email);
  try {
    const response = await supabase
      .from("profiles")
      .update({
        stripe_subscription_id: session.subscription,
        stripe_customer_id: session.customer,
        stripe_current_period_end: new Date(session.expires_at * 1000),
        premium: true,
      })
      .eq("email", session.customer_email)
      .select();

    console.log("res", response);
    return response;
  } catch (error) {
    console.error("Error updating premium user:", error);
  }
};

export const lookupCardIdReturnUser = async (cardId: string): Promise<User | null> => {
  const supabase = createClient();
  // First, get the card and its associated user_id
  const cardResponse = await supabase
    .from("cards")
    .select("user_id")
    .eq("id", cardId)
    .single();

  if (!cardResponse.data) return null;

  const userId = cardResponse.data.user_id;

  // Now, lookup the user in the profiles table
  const userResponse = await supabase
    .from("profiles")
    .select()
    .eq("id", userId)
    .single();

  if (!userResponse.data) return null;

  return userResponse.data as User;
}

export const lookupUserOrCard = async (id: string): Promise<User | null> => {
  const supabase = createClient();

  if (id.includes('-')) {
    // This is a card_id
    const cardResponse = await supabase
      .from("cards")
      .select("user_id")
      .eq("id", id)
      .single();

    if (!cardResponse.data) return null;

    const userResponse = await supabase
      .from("profiles")
      .select()
      .eq("id", cardResponse.data.user_id)
      .single();

    if (!userResponse.data) return null;

    return userResponse.data as User;
  } else {
    // This is a username
    const userResponse = await supabase
      .from("profiles")
      .select()
      .eq("username", id)
      .single();

    if (!userResponse.data) return null;

    return userResponse.data as User;
  }
}

export const getCardIdFromUserId = async (userId: string): Promise<string | null> => {
  const supabase = createClient();

  const cardResponse = await supabase
    .from("cards")
    .select("id")
    .eq("user_id", userId)
    .single();

  return cardResponse.data?.id || null;
}