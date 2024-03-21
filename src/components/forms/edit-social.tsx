'use client';

import { EditSocialSchema, SignInSchema } from '@/schemas';
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from 'react'
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
import { getUserSocial, signIn, updateSocial } from '@/queries';
import { Plus } from 'lucide-react';
import { Social } from '@/types';

type Props = {
  id: string
}

const EditSocialForm = (props: Props) => {
  const [showTitle, setShowTitle] = useState(false)
  const [deleteButton, setDeleteButton] = useState(false)
  const [socialObject, setSocialObject] = useState<Social>()

  const form = useForm<z.infer<typeof EditSocialSchema>>({
    resolver: zodResolver(EditSocialSchema),
    defaultValues: {
      value: '',
      title: '',
    },
  })

  useEffect(() => {
    async function getSocial() {
      const social = await getUserSocial(props.id)
      console.log('social', social)
      if (!social) return;
      form.setValue('value', social.value);
      form.setValue('title', social.title || '');
      setSocialObject(social)
    }
    getSocial()
  }, [])

  async function onSubmit(values: z.infer<typeof EditSocialSchema>) {
    await updateSocial({ ...socialObject, value: values.value, title: values.title } as Social)
  }

  const handleDeleteButton = (value: boolean) => {
    setDeleteButton(value)
    setTimeout(() => {
      setDeleteButton(!value)
    }, 3000)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 z-10 max-w-[450px] p-6">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-black text-lg'>Social</FormLabel>
              <FormControl>
                <Input className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6" placeholder="VexTheBest" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          {!deleteButton ? <Button type="button" onClick={() => handleDeleteButton(true)} className='w-[45%] bg-black py-6 text-md active:bg-black hover:bg-black'>Delete</Button> : <Button variant="destructive" className='w-[45%] py-6 text-md' onClick={() => console.log('test')}>Confirm</Button>}
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

export default EditSocialForm