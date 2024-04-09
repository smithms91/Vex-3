'use client';

import { updateUserEmail } from '@/queries';
import { UpdateEmailSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useThemeColor } from '../context/theme-color-provider';
import { cn } from '@/lib/utils';

const UpdateEmailForm = () => {
  const router = useRouter();
  const themeColor = useThemeColor();

  const form = useForm<z.infer<typeof UpdateEmailSchema>>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateEmailSchema>) {
    try {
      console.log('values', values)
      const response = await updateUserEmail(values)
      if (!response) {
        return toast('Email update failed', { position: 'top-center' })
      }
      toast('Nice! Check your new email to confirm.', { position: 'top-center' })
      router.push('/account/settings/user-settings')
    } catch (error) {
      console.log('error', error)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 z-10 max-w-[450px]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('text-lg flex items-center', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Email</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" type="email" placeholder="vex@vex.cards" {...field} />
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
              <FormLabel className={cn('text-lg flex items-center', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Password</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className='w-full bg-card-bg-dark hover:bg-card-bg-light py-7 text-md'>Update Email</Button>
      </form>
    </Form>
  )
}

export default UpdateEmailForm