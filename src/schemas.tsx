"use client"

import { z } from "zod"

export const OnboardingSchema = z.object({
  username: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(20, { message: "Username has to be less than 20 characters long." }),
  first_name: z.string().min(1, { message: "This field has to be filled." }),
  last_name: z.string().min(1, { message: "This field has to be filled." }),
})

const phoneRegex = new RegExp("^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$")
export const OnboardingSchemaTwo = z.object({
  first_name: z.string(),
  last_name: z.string(),
  job_title: z.string().optional(),
  phone_number: z.string().optional().or(z.string().regex(phoneRegex, "Invalid phone number")),
  email: z.string().optional().or(z.string().email()),
  website: z.string().optional(),
})

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(7, { message: "Password has to be at least 7 characters long." }),
})

export const EditSocialSchema = z.object({
  value: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  title: z.string().optional(),
})

export const AddSocialSchema = z.object({
  value: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  title: z.string().optional(),
  network: z.string(),
})