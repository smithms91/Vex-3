"use server";

import { createClient } from "./lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SignInSchema, OnboardingSchema, OnboardingSchemaTwo, AddSocialSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { Database } from "./lib/database.types";
import { Social } from "./types";
import { v4 as uuidv4 } from 'uuid';

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

  const { error } = await supabase.auth.signInWithPassword({
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
        job_title: values.job_title,
        phone_number: values.phone_number,
        website: values.website,
        email: values.email,
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
  console.log('file from back', url)
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const filePath = `profile_pictures/${Date.now()}.png`;

  // Remove the prefix that declares the base64 image
  const base64Data = url.replace(/^data:image\/\w+;base64,/, "");

  // Convert base64 to raw binary data
  const byteCharacters = atob(base64Data);

  // Write the bytes of the string to a typed array
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  // Create a blob and convert it to a file
  const blob = new Blob([byteArray], { type: 'image/png' });
  const file = new File([blob], 'profile.png', { type: 'image/png' });

  try {
    const { data, error } = await supabase.storage.from('profile_pictures').upload(filePath, file!);

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

  const userId = user.data.user?.id;

  try {
    const response = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId);

    if (!response.data || response.data.length === 0) {
      return '';
    }

    return response.data[0].id
  } catch (error) {
    console.error('Error getting User ID:', error);
  }
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

    return response.data[0].socials
  } catch (error) {
    console.error('Error getting User ID:', error);
  }
};

// Update a single social object
export const updateSocial = async (social: Social) => {
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
      .eq('id', userId)


    if (!response.data || response.data.length === 0) return null;

    const updatedSocials = response.data[0].socials.map((item: any) => {
      return item.id === social.id ? social : item;
    });

    await updateUserSocials(updatedSocials);
    revalidatePath('/account');
    return updatedSocials;
  } catch (error) {
    console.error('Error getting User ID:', error);
  }
};

// Mostly used for re-ordering the socials on account page. This updates the order and stores them in the DB.
export const updateUserSocials = async (socials: {}) => {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No authenticated user");
  }

  const userId = user.data.user?.id;
  console.log('soc,', socials)
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
