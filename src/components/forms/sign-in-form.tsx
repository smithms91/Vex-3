'use client';

import { SignInSchema } from '@/schemas';
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from '@/queries';

type Props = {}

const SignInForm = (props: Props) => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignInSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    await signIn(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 z-10">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-lg shadow-sm'>Email</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50" type="email" placeholder="admin@vex.cards" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-white text-lg shadow-sm'>Password</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50" type="password" placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full bg-black hover:bg-black/50'>Login</Button>
      </form>
    </Form>
  )
}

export default SignInForm