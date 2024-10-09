'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateProfile, verifyUsername } from '@/queries';
import { OnboardingSchema, User } from '@/types';
import { setTimeout } from "timers";
import { useRouter } from "next/navigation";

type Props = {
  user: User
}

const OnboardingForm = ({ user }: Props) => {
  console.log('user', user)
  const [usernameVerified, setUsernameVerified] = useState(user.username ? true : false)
  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm<z.infer<typeof OnboardingSchema>>({
    resolver: zodResolver(OnboardingSchema),
    defaultValues: {
      username: user.username || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
    },
  })

  const verifyButton = async () => {
    const verify = await verifyUsername(form.getValues('username'))
    console.log('ver', verify)
    if (verify) {
      setUsernameVerified(true)
    } else {
      setUsernameVerified(false)
      setError('Username already taken. Please try another.')
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  async function onSubmit(values: z.infer<typeof OnboardingSchema>) {
    const user = await updateProfile(values)
    console.log('here too', user)
    if (user?.data && user.data[0].username) {
      return router.push('/account/onboarding/profile-card');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 z-10 px-10 w-full flex flex-col">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-lg shadow-sm'>Username</FormLabel>
              <FormControl>
                <Input type="string" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs">{error}</p>
        <Button type="button" className="bg-card-bg-dark" onClick={verifyButton}>Verify Username</Button>
        {usernameVerified && (
          <>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-lg shadow-sm'>First Name</FormLabel>
                  <FormControl>
                    <Input type="string" placeholder='First Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-white text-lg shadow-sm'>Last Name</FormLabel>
                  <FormControl>
                    <Input type="string" placeholder='Last Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full bg-card-bg-dark'>Continue</Button>
          </>
        )}
      </form>
    </Form>
  )
}

export default OnboardingForm