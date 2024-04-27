import { createClient } from '@/lib/supabase/server'
import { ArrowRight, Frame, Pencil, Star, Trash, Upload } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Switch } from '../ui/switch'
import { Button } from '../ui/button'
import BrandingSwitch from './branding-switch'

type Props = {}

const PremiumSection = async (props: Props) => {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  const user = await supabase.from('profiles').select().eq('id', data.user.id)

  if (user.data && user.data[0].premium) {
    return (
      <section className='text-white p-4 max-w-[450px] mb-4 z-50 relative'>
        <Drawer>
          <DrawerTrigger>
            <h1 className='text-bold text-xl opacity-80 mb-1 text-left'>Branding</h1>
            <div className='flex items-center bg-slate-200/20 p-4 rounded-md'>
              <Frame className='mr-4' />
              <div className='basis-2/3 text-left'>
                <h1 className='text-md'>Edit Branding</h1>
                <p className='text-xs opacity-75'>Hide Vex branding from your profile and upload your own logo.</p>
              </div>
              <ArrowRight size={18} className='ml-auto' />
            </div>
          </DrawerTrigger>
          <DrawerContent className='p-4 px-6 max-w-[450px] mx-auto gap-y-4'>
            <h1 className='text-2xl'>Branding</h1>
            <div className='flex justify-between bg-slate-600/20 p-4 rounded-md'>
              <p>Remove Vex Branding</p>
              <BrandingSwitch vexBranding={!user.data[0].vex_branding} />
            </div>
            <div className='flex flex-col bg-slate-600/20 p-4'>
              <div className='flex justify-between'>
                <p className='mb-2'>Profile Logo</p>
                <Image src={user.data[0].profile_picture} width="50" height="50" alt='Profile Logo' className='rounded-md' />
              </div>
              <Button className='bg-black mt-4'><Upload size="16" className='mr-2' />Upload</Button>
              {/* <div className='flex gap-x-4 mt-4'>
                <Button className='bg-black basis-1/2'><Pencil size="16" className='mr-2' />Edit</Button>
                <Button className='bg-black basis-1/2'><Trash size="16" className='mr-2' />Remove</Button>
              </div> */}
            </div>
          </DrawerContent>
        </Drawer>
      </section>
    )
  };

  return (
    <section className='text-white p-4 max-w-[450px] mb-4 z-50 relative'>
      <h1 className='text-bold text-xl opacity-80 mb-1'>Premium</h1>
      <Link href="/premium/features" className='z-50'>
        <div className='flex items-center bg-slate-200/20 p-4 rounded-md'>
          <Star className='mr-4' />
          <div className='basis-2/3'>
            <h1 className='text-md'>Upgrade to <strong>Vex Premium</strong></h1>
            <p className='text-xs opacity-75'>Hide Vex branding from your profile and upload your own logo.</p>
          </div>
          <ArrowRight size={18} className='ml-auto' />
        </div>
      </Link>
    </section>
  )
}

export default PremiumSection