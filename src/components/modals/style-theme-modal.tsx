'use client';

import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ColorPicker from '../color-picker';
import { Instagram, Palette, X } from 'lucide-react';
import { useIconBorder } from '../context/icon-border-provider';
import { setUserBorder, setUserThemeColor } from '@/queries';
import { toast } from 'sonner';
import { useThemeColor } from '../context/theme-color-provider';
import { Button } from '../ui/button';

type Props = {
}

const StyleThemeModal = ({ }: Props) => {
  const { rounded, setRounded } = useIconBorder();
  const { setColor } = useThemeColor();

  const handleUpdateBorder = async (border: 'small' | 'large' | 'full') => {
    setRounded(border);
    try {
      await setUserBorder(border)
      toast('Border updated!', { position: 'top-center' })
    } catch (error) {
      console.log('error', error)
    }
  };

  const handleUpdateThemeColor = async (color: 'light' | 'dark' | 'black') => {
    setColor(color);
    try {
      await setUserThemeColor(color)
      toast('Background color updated!', { position: 'top-center' })
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
      <DrawerContent className='px-10 max-w-[450px] space-y-2 mx-auto bg-white h-[450px]'>
        <DrawerClose className='ml-auto'>
          <X className='bg-white shadow-lg p-1 box-content rounded-full' />
        </DrawerClose>
        <h1 className='mb-2 font-bold text-lg'>Color</h1>
        <ColorPicker />
        {/* <h1 className='mt-6 font-bold text-lg'>Theme</h1> */}
        <h1 className='mt-8 mb-2 text-lg font-bold'>Border</h1>
        <div className='flex w-full items-center overflow-scroll gap-x-4 z-50'>
          <Button onClick={() => handleUpdateBorder('full')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full`}><Instagram size={30} color="white" /></Button>
          <Button onClick={() => handleUpdateBorder('large')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg`}><Instagram size={30} color="white" /></Button>
          <Button onClick={() => handleUpdateBorder('small')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-sm`}><Instagram size={30} color="white" /></Button>
        </div>
        <h1 className='mt-8 mb-2 text-lg font-bold'>Background Color</h1>
        <div className='flex w-full items-center overflow-scroll gap-x-4 z-50'>
          <Button onClick={() => handleUpdateThemeColor('light')} className={`w-[75px] h-[75px] bg-gradient-to-br from-[#c2cee0] to-[#ffffff] flex-shrink-0`}></Button>
          <Button onClick={() => handleUpdateThemeColor('dark')} className='w-[75px] h-[75px] bg-gradient-to-br from-[#1c202e] to-[#303950] flex-shrink-0'></Button>
          <Button onClick={() => handleUpdateThemeColor('black')} className={`w-[75px] h-[75px] bg-gradient-to-br from-[#000000] to-[#191c24] flex-shrink-0`}></Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default StyleThemeModal