'use client';

import { updateUserPassword } from '@/queries';
import { UpdatePasswordSchema } from '@/types';
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

type Props = {}

const UpdatePasswordForm = (props: Props) => {
  const router = useRouter();
  const themeColor = useThemeColor();

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof UpdatePasswordSchema>) {
    if (values.new_password !== values.confirm_password) {
      return toast('Passwords do not match', { position: 'top-center' })
    }

    try {
      console.log('values', values)
      const response = await updateUserPassword(values)
      if (!response) {
        return toast('Password update failed', { position: 'top-center' })
      }
      toast('Password updated!', { position: 'top-center' })
      router.push('/account/settings/user-settings')
    } catch (error) {
      console.log('error', error)
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 z-10 max-w-[450px] p-6">
        <FormField
          control={form.control}
          name="current_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('text-lg flex items-center', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Current Password</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" type="password" placeholder="Current Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('text-lg flex items-center', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>New Password</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" type="password" placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn('text-lg flex items-center', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Confirm Password</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" type="password" placeholder="Confirm Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full bg-card-bg-dark hover:bg-card-bg-light py-7 text-md'>Update Password</Button>
      </form>
    </Form>
  )
}

export default UpdatePasswordForm