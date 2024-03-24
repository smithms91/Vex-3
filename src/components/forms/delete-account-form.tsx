'use client';

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { DeleteAccountSchema } from '@/types';
import { deleteAccount, updateUsername } from '@/queries';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

type Props = {
}

const UpdateUsernameForm = ({ }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof DeleteAccountSchema>>({
    resolver: zodResolver(DeleteAccountSchema),
    defaultValues: {
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof DeleteAccountSchema>) {
    try {
      console.log('values', values)
      const deleted = await deleteAccount(values)
      if (deleted) {
        toast('Account Deleted!', { position: 'top-center' })
        router.push('/')
      } else {
        toast('Error deleting account!', { position: 'top-center' })
      }
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-black text-lg flex items-center'>Password</FormLabel>
                <FormControl>
                  <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-black/80 hover:bg-card-bg-dark py-7 text-md">Delete Account</Button>
        </form>
      </Form>
    </section>
  )
}

export default UpdateUsernameForm