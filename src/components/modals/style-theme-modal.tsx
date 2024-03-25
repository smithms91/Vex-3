'use client';

import React, { useEffect } from 'react'
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
import ColorPicker from '../color-picker';
import { Instagram, Palette, X } from 'lucide-react';
import { useIconBorder } from '../context/icon-border-provider';
import { setUserBorder } from '@/queries';
import { toast } from 'sonner';

type Props = {
}

const StyleThemeModal = ({ }: Props) => {
  const { rounded, setRounded } = useIconBorder();

  const handleUpdateBorder = async (border: 'small' | 'large' | 'full') => {
    try {
      await setUserBorder(border)
      toast('Border updated!', { position: 'top-center' })
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div className='flex flex-col items-center z-10'>
          <Palette size={22} color='white' />
          <p className='text-xs uppercase text-white'>Style</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className='px-10 max-w-[450px] mx-auto bg-white'>
        <DrawerClose className='ml-auto'>
          <X className='bg-white shadow-lg p-1 box-content rounded-full' />
        </DrawerClose>
        <h1 className='mb-2 font-bold text-lg'>Color</h1>
        <ColorPicker />
        {/* <h1 className='mt-6 font-bold text-lg'>Theme</h1> */}
        <h1 className='mt-8 mb-2 text-lg font-bold'>Border</h1>
        <div className='flex w-full items-center overflow-scroll gap-x-4 z-50'>
          <button onClick={() => { setRounded('full'); handleUpdateBorder('full') }} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full`}><Instagram size={30} color="white" /></button>
          <button onClick={() => { setRounded('large'); handleUpdateBorder('large') }} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg`}><Instagram size={30} color="white" /></button>
          <button onClick={() => { setRounded('small'); handleUpdateBorder('small') }} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-sm`}><Instagram size={30} color="white" /></button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default StyleThemeModal