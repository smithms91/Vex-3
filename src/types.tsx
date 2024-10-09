"use client";

import { z } from "zod";

export type Social = {
  id: string;
  name: string;
  user_id: string;
  value: string;
  title?: string;
  network: string;
  url?: string;
};


// Database["public"]["Tables"]["profiles"]["Row"]
export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  theme_color: string;
  job_title: string;
  phone_number: string;
  website: string;
  onboarding: boolean;
  profile_color: string;
  profile_picture: string;
  socials: Social[];
  disabled: boolean;
  border: string;
  direct: boolean;
  premium: boolean;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_current_period_end: string;
  vex_branding: boolean;
  branding_logo: string;
};

export const OnboardingSchema = z.object({
  username: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(20, { message: "Username has to be less than 20 characters long." }).refine(val => !val.includes(' '), { message: 'Username cannot contain spaces' }),
  first_name: z.string().min(1, { message: "This field has to be filled." }),
  last_name: z.string().min(1, { message: "This field has to be filled." }),
});

const phoneRegex = new RegExp(
  "^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$",
);
export const OnboardingSchemaTwo = z.object({
  first_name: z.string(),
  last_name: z.string(),
  job_title: z.string().optional(),
  phone_number: z
    .string()
    .optional()
    .or(z.string().regex(phoneRegex, "Invalid phone number")),
  website: z.string().optional(),
});

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
});

export const EditSocialSchema = z.object({
  value: z.string().min(1, { message: "This field has to be filled." }),
  title: z.string().optional(),
});

export const AddSocialSchema = z.object({
  value: z.string().min(1, { message: "This field has to be filled." }),
  name: z.string().min(1, { message: "This field has to be filled." }),
  title: z.string().optional(),
  network: z.string(),
  url: z.string(),
});

export const ForgotPasswordSchema = z.object({
  new_password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
  confirm_password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
});

export const UpdatePasswordSchema = z.object({
  current_password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
  new_password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
  confirm_password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
});

export const UpdateUsernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username has to be at least 3 characters long." }).refine(val => !val.includes(' '), { message: 'Username cannot contain spaces' }),
  password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
});

export const UpdateEmailSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email has to be at least 3 characters long." }),
  password: z
    .string()
    .min(7, { message: "Password has to be at least 7 characters long." }),
});

export const DeleteAccountSchema = z.object({
  password: z
    .string()
    .min(3, { message: "Password has to be atleast 7 characters long." }),
});
