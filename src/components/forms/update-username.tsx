'use client';

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { UpdateUsernameSchema } from '@/types';
import { updateUsername } from '@/queries';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useThemeColor } from '../context/theme-color-provider';

type Props = {
}

const UpdateUsernameForm = ({ }: Props) => {
  const router = useRouter();
  const themeColor = useThemeColor();

  const form = useForm<z.infer<typeof UpdateUsernameSchema>>({
    resolver: zodResolver(UpdateUsernameSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateUsernameSchema>) {
    try {
      console.log('values', values)
      const response = await updateUsername(values)

      if (response && response.msg === 'Password Incorrect') {
        return toast('Password Incorrect', { position: 'top-center' })
      } else if (response && response.msg === 'Username Taken') {
        return toast('Username Taken', { position: 'top-center' })
      }

      toast('Username updated!', { position: 'top-center' })
      router.push('/account/settings/user-settings')
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 z-10 max-w-[450px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn('text-lg flex items-center', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Username</FormLabel>
                <FormControl>
                  <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" placeholder="Username" {...field} />
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
          <Button type="submit" className="w-full bg-card-bg-dark hover:bg-card-bg-light py-7 text-md">Update Username</Button>
        </form>
      </Form>
    </section>
  )
}

export default UpdateUsernameForm