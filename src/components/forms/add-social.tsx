'use client';

import { AddSocialSchema } from '@/types';
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
import { addUserSocial } from '@/queries';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import CustomSocialIcon from '../custom-social-icon';
import { constants } from '@/constants';

type Props = {
  network: string
}

const AddSocialForm = ({ network }: Props) => {
  const [showTitle, setShowTitle] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)

  const router = useRouter();

  const url = constants.find((constant) => constant.network === network)?.href

  console.log('url', url)

  const form = useForm<z.infer<typeof AddSocialSchema>>({
    resolver: zodResolver(AddSocialSchema),
    defaultValues: {
      value: '',
      title: '',
      network: network,
      url: url
    },
  })

  async function onSubmit(values: z.infer<typeof AddSocialSchema>) {
    try {
      values = { ...values, url: url! }
      await addUserSocial(values)
      toast('Social updated!', { position: 'top-center' })
    } catch (error) {
      console.log('error', error)
    }
    router.push('/account/setup')
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 z-10 max-w-[450px] p-6">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black text-lg flex items-center'><CustomSocialIcon edit="true" size="16" network={network} /><p className='ml-2'>{network.charAt(0).toUpperCase() + network.slice(1)}</p></FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" placeholder="VexTheBest" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          {!deleteButton ? <Button type="button" className='w-[45%] bg-black py-6 text-md active:bg-black hover:bg-black'>Delete</Button> : <Button variant="destructive" className='w-[45%] py-6 text-md' onClick={() => console.log('test')}>Confirm</Button>}
          {/* <Button variant="destructive" className='w-[45%] py-6 text-md'>Delete</Button> */}
          <Button className='bg-black w-[45%] py-6 text-md'>Test</Button>

        </div>
        {!showTitle && <Button className='w-full bg-black text-white text-md' onClick={() => setShowTitle(true)}><Plus size={14} className='mt-[.15rem] mr-1' />Add Title</Button>}
        {showTitle &&
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black text-lg shadow-sm'>Title</FormLabel>
                  <FormControl>
                    <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" placeholder='Title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-black text-md" onClick={() => setShowTitle(false)}>Close Title</Button>
          </>
        }
        <Button type="submit" className='bg-card-bg-dark hover:bg-black/50 fixed max-w-[400px] py-6 bottom-20 left-6 right-6 mx-auto text-md'>Save</Button>
      </form>
    </Form>
  )
}

export default AddSocialForm