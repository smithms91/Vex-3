"use server";

import { createClient } from "./lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SignInSchema, OnboardingSchema, OnboardingSchemaTwo, AddSocialSchema, UpdatePasswordSchema, UpdateUsernameSchema, UpdateEmailSchema, DeleteAccountSchema } from "@/types";
import { revalidatePath } from "next/cache";
import { Social } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer'

export const signUp = async (values: z.infer<typeof SignInSchema>) => {
  const { email, password } = values;
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return redirect("/sign-up?message=Could not authenticate user");
  }

  if (!data.user) {
    return redirect("/sign-up?message=Could not authenticate user");
  }

  return redirect("/sign-in?message=Check email for confirmation.");
};

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
    console.error('Error signing out:', error);
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
      .from('profiles')
      .update({ disabled: value })
      .eq('id', userId)
      .select();

    return response;
  } catch (error) {
    console.error('Error disabling account:', error);
  }
};

export const deleteAccount = async (values: z.infer<typeof DeleteAccountSchema>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  const verifyResponse = await supabase.rpc('verify_user_password', { password: values.password });

  if (verifyResponse.data) {
    try {
      const deletedUser = await supabase.rpc('delete_user');
      // await signOut();
      return true;
    } catch (error) {
      console.error('Error disabling account:', error);
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
      .from('profiles')
      .select('disabled')
      .eq('id', userId);

    if (!response.data || response.data.length === 0) {
      return false;
    }
    console.log('response', response.data[0].disabled);
    return response.data[0].disabled === true ? true : false;
  } catch (error) {
    console.error('Error getting account disabled:', error);
  }
};

// Checks if username is available to be taken. Returns true if available, false if not.
export const verifyUsername = async (username: string) => {
  const supabase = createClient();

  if (username === '' || username === null) return false;

  if (username.length < 3 || username.length > 20) return false;

  const user = await supabase.from('profiles').select().eq('username', username)

  if (user.data && user.data.length > 0) {
    return false;
  }

  return true;
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
      redirectTo: 'http://localhost:3000/account/settings/user-settings/forgot-password'
    });

    return response;
  } catch (error) {
    console.error('Error resetting password:', error);
  }
};

export const updateForgotPassword = async (password: string, token?: string) => {
  const supabase = createClient();

  try {
    const response = await supabase.auth.updateUser({ password });

    return response;
  } catch (error) {
    console.error('Error updating password:', error);
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
      .from('profiles')
      .update({ border })
      .eq('id', userId)
      .select();

    return response;
  } catch (error) {
    console.error('Error updating border:', error);
  }
};

export const updateProfile = async (values: z.infer<typeof OnboardingSchema>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from('profiles')
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: user.data.user?.email,
        onboarding: false
      })
      .eq('id', userId)
      .select();

    revalidatePath('/account');
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

export const updateProfileTwo = async (values: z.infer<typeof OnboardingSchemaTwo>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from('profiles')
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
        job_title: values.job_title,
        phone_number: values.phone_number,
        website: values.website,
        onboarding: true
      })
      .eq('id', userId)
      .select();

    revalidatePath('/account');
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

export const updateUserPassword = async (values: z.infer<typeof UpdatePasswordSchema>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const verifyResponse = await supabase.rpc('verify_user_password', { password: values.current_password });

  if (verifyResponse.data) {
    try {
      const response = await supabase.auth.updateUser({
        password: values.new_password
      });

      console.error('GG:');
      return response;
    } catch (error) {
      console.error('Error updating password:', error);
    }
  } else {
    return false;
  }
};


// Helper function to update the profile table with the new email. FIX: Configure a SQL function to automatically update the email in the profiles table when the user updates their email.
const updateProfileEmail = async (values: z.infer<typeof UpdateEmailSchema>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from('profiles')
      .update({
        email: values.email,
      })
      .eq('id', userId)
      .select();

    return response;
  } catch (error) {
    console.error('Error updating email:', error);
  }
}

export const updateUserEmail = async (values: z.infer<typeof UpdateEmailSchema>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const verifyResponse = await supabase.rpc('verify_user_password', { password: values.password });

  if (verifyResponse.data) {
    try {
      const response = await supabase.auth.updateUser({
        email: values.email
      }, { emailRedirectTo: 'http://localhost:3000/account' });

      await updateProfileEmail(values);
      revalidatePath('/account/settings/user-settings/update-email');
      return response;
    } catch (error) {
      console.error('Error updating email:', error);
    }
  } else {
    return false;
  }
};

export const updateUsername = async (values: z.infer<typeof UpdateUsernameSchema>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const verifyResponse = await supabase.rpc('verify_user_password', { password: values.password });

  if (verifyResponse.data) {
    try {
      const response = await verifyUsername(values.username);

      if (!response) {
        console.error('Username Taken');
        return { msg: 'Username Taken' };
      }

      const data = await supabase.from('profiles').update({ username: values.username }).eq('id', user.data.user?.id).select();
      revalidatePath('/account/settings/user-settings/update-username');
      return { msg: 'Username Updated', data: data };
    } catch (error) {
      console.error('Error updating username:', error);
    }
  } else {
    return { msg: 'Password Incorrect' };
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
      .from('profiles')
      .update({
        profile_color: color,
      })
      .eq('id', userId)
      .select();

    revalidatePath('/account');
    return response;
  } catch (error) {
    console.error('Error updating profile color:', error);
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
      .from('profiles')
      .select('profile_color')
      .eq('id', userId);

    if (!response.data || response.data.length === 0) {
      return 'blue';
    }

    return response.data[0].profile_color;
  } catch (error) {
    console.error('Error getting profile color:', error);
  }
};

export const uploadProfileImage = async (url: string) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }
  console.log('url', url);
  const filePath = `profile_pictures/${Date.now()}.png`;
  console.log('url', url);

  // Remove the prefix that declares the base64 image
  const base64Data = url.replace(/^data:image\/\w+;base64,/, "");
  console.log('base64Data', base64Data);

  // // Convert base64 to raw binary data
  // const byteCharacters = atob(base64Data);
  // console.log('byteCharacters', byteCharacters);

  // // Write the bytes of the string to a typed array
  // const byteNumbers = new Array(byteCharacters.length);
  // console.log('byteNumbers', byteNumbers);

  // for (let i = 0; i < byteCharacters.length; i++) {
  // byteNumbers[i] = byteCharacters.charCodeAt(i);
  // }

  // const byteArray = new Uint8Array(byteNumbers);
  // console.log('byteArray', byteArray);

  // Create a blob and convert it to a file
  // const blob = new Blob([byteArray], { type: 'image/png' });
  // const file = new File([blob], 'profile.png', { type: 'image/png' });
  // console.log('filePath', filePath);
  // console.log('file', file);

  try {
    const { data, error } = await supabase.storage.from('profile_pictures').upload(filePath, decode(base64Data), { contentType: 'image/*' });

    if (error) {
      console.error('Error uploading image:', error);
    } else {
      console.log('Image uploaded successfully');
      try {
        const userId = user.data.user?.id;
        const response = await supabase
          .from('profiles')
          .update({ profile_picture: `https://bqsmvopplukdfrrkowkz.supabase.co/storage/v1/object/public/profile_pictures/${data.path}` })
          .eq('id', userId);

        revalidatePath('/account/setup');
        return response;
      } catch (error) {
        console.error('Error adding profile picture to profile:', error);
      }
    }
  } catch (error) {
    console.error('Error uploading image:', error);
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
      .from('profiles')
      .select('profile_picture')
      .eq('id', userId);

    if (!response.data || response.data.length === 0) {
      return '';
    }

    return response.data[0].profile_picture
  } catch (error) {
    console.error('Error getting profile picture:', error);
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

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
/////////////// Socials ////////////////
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export const addUserSocial = async (values: z.infer<typeof AddSocialSchema>) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;
  const socials = await getUserSocials();

  const newObject = {
    id: uuidv4(),
    title: values.title,
    value: values.value,
    network: values.network,
    url: values.url,
    user_id: userId
  }

  const newSocials = [...socials, newObject];

  try {
    const response = await supabase
      .from('profiles')
      .update({ socials: newSocials })
      .eq('id', userId)
      .select();

    revalidatePath('/account/setup');
    return response;
  } catch (error) {
    console.error('Error adding social:', error);
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
      .from('profiles')
      .select('socials')
      .eq('id', userId);

    if (!response.data) return null;

    const socialObject: Social = response.data[0].socials.find((social: { id: string }) => social.id === id);

    if (!socialObject) return null;

    return socialObject;
  } catch (error) {
    console.error('Error getting User ID:', error);
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
      .from('profiles')
      .select('socials')
      .eq('id', userId);

    if (!response.data) return null;

    return response.data[0].socials || [];
  } catch (error) {
    console.error('Error getting User ID:', error);
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
    console.error('Error updating social:', error);
  }

  const updatedSocials = socials.map((item: any) => {
    return item.id === social.id ? social : item;
  });

  try {
    await updateUserSocials(updatedSocials);
  } catch (error) {
    console.error('Error updating social:', error);
  }

  revalidatePath('/account');
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
      .from('profiles')
      .update({ socials: socials })
      .eq('id', userId)
      .select();

    revalidatePath('/account');
    return response
  } catch (error) {
    console.error('Error getting User ID:', error);
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
  const newSocials = socials.filter((item: Social) => item.id !== social.id)

  try {
    const response = await supabase
      .from('profiles')
      .update({ socials: newSocials })
      .eq('id', userId)
      .select();

    revalidatePath('/account');
    return response
  } catch (error) {
    console.error('Error getting User ID:', error);
  }
};
