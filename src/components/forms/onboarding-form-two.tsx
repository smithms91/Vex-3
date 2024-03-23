'use client';

import React from 'react'
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
import { OnboardingSchemaTwo } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileTwo } from '@/queries';
import { useRouter } from 'next/navigation';
import { Tables } from '@/lib/database.types';
import { toast } from 'sonner';

type Props = {
  user: Tables<'profiles'> | null;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  setWebsite: React.Dispatch<React.SetStateAction<string>>;
  options?: boolean;
}

const OnboardingFormTwo = ({ user, setFirstName, setLastName, setEmail, setPhoneNumber, setJobTitle, setWebsite, options }: Props) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof OnboardingSchemaTwo>>({
    resolver: zodResolver(OnboardingSchemaTwo),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      job_title: user?.job_title || "",
      phone_number: user?.phone_number || "",
      website: user?.website || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof OnboardingSchemaTwo>) => {
    try {
      const user = await updateProfileTwo(values)
      toast('Profile updated!', { position: 'top-center' })
      if (user?.data) {
        router.push('/account');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-y-4 text-card-foreground'>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-card-bg-dark text-lg shadow-sm'>First Name</FormLabel>
              <FormControl>
                <Input onChangeCapture={e => setFirstName(e.currentTarget.value)} className="py-6" type="string" placeholder='Mike' {...field} />
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
              <FormLabel className='text-card-bg-dark text-lg shadow-sm'>Last Name</FormLabel>
              <FormControl>
                <Input onChangeCapture={e => setLastName(e.currentTarget.value)} className="py-6" type="string" placeholder='Smith' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="job_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-card-bg-dark text-lg shadow-sm'>Job Title</FormLabel>
              <FormControl>
                <Input onChangeCapture={e => setJobTitle(e.currentTarget.value)} className="py-6" type="string" placeholder='Real Estate Agent' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-card-bg-dark text-lg shadow-sm'>Phone Number</FormLabel>
              <FormControl>
                <Input onChangeCapture={e => setPhoneNumber(e.currentTarget.value)} className="py-6" type="tel" placeholder='(123) 456-7890' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-card-bg-dark text-lg shadow-sm'>Website</FormLabel>
              <FormControl>
                <Input onChangeCapture={e => setWebsite(e.currentTarget.value)} className="py-6" type="string" placeholder='www.website.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full p-6 mt-4 bg-card-bg-dark'>{options ? 'Save' : 'Continue'}</Button>
      </form>
    </Form>
  )
}

export default OnboardingFormTwo