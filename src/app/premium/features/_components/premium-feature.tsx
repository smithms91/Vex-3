'use client';

import React, { ReactNode } from 'react'
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
import { Button } from '@/components/ui/button'
import { LucideIcon, Paintbrush, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

type Props = {
  title: string
  subTitle?: string
  icon: ReactNode
  image: ReactNode
}

const PremiumFeature = ({ title, subTitle, icon, image }: Props) => {
  const router = useRouter();

  return (
    <Drawer>
      <div className='bg-slate-600/50 p-4 rounded-md flex items-center w-full'>
        <div className='rounded-full bg-[#202B37] p-3'>{icon}</div>
        <DrawerTrigger className='ml-4 text-left'>
          <h2 className='text-lg'>{title}</h2>
          <p className='text-xs'>{subTitle}</p>
        </DrawerTrigger>
        <DrawerContent className='max-w-[450px] mx-auto px-4 pb-4'>
          <DrawerHeader className='flex items-center justify-between p-0 my-4'>
            <DrawerTitle className='text-2xl'>{title}</DrawerTitle>
            <DrawerClose className='bg-gray-600 rounded-full p-2 text-white'>
              <X />
            </DrawerClose>
          </DrawerHeader>
          <DrawerDescription className='w-full'>
            <div className='h-40 relative mb-4'>
              {image}
            </div>
            <p>{subTitle}</p>
          </DrawerDescription>
          <DrawerFooter className='p-0'>
            <Button onClick={() => router.push('/premium/choose-plan')} className='text-white py-6 bg-blue-500 hover:bg-blue-500/90 text-md hover:shadow-md'>Continue</Button>
          </DrawerFooter>
        </DrawerContent>
      </div>
    </Drawer>
  )
}

export default PremiumFeature