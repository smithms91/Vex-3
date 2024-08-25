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
import { cn } from '@/lib/utils';
import { User } from '@/types';

type Props = {
  user: User
}


const StyleThemeModal = ({ user }: Props) => {
  const { rounded, setRounded } = useIconBorder();
  const { color, setColor } = useThemeColor();

  const handleUpdateBorder = async (border: 'small' | 'large' | 'full' | 'color_small' | 'color_large' | 'color_full') => {
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
          <Palette size={22} color={color === 'light' ? 'black' : 'white'} />
          <p className={cn('text-xs uppercase', color === 'light' ? 'text-black' : 'text-white')}>Style</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className={cn('px-6 pt-4 pb-6 max-w-[450px] mx-auto h-[450px] border-0 shadow-lg', color == 'light' ? 'bg-gradient-to-tl from-light-from to-light-to' : color == 'dark' ? 'bg-gradient-to-tl from-dark-from to-dark-to' : 'bg-gradient-to-tl from-black-from to-black-to')}>
        <DrawerClose className='ml-auto'>
          <X className='bg-white shadow-lg p-1 box-content rounded-full' />
        </DrawerClose>
        <h1 className={cn('font-bold text-xl', color == 'light' ? 'text-black' : 'text-white')}>Color</h1>
        <ColorPicker user={user} />
        {/* <h1 className='mt-6 font-bold text-lg'>Theme</h1> */}
        <h1 className={cn('text-xl font-bold', color == 'light' ? 'text-black' : 'text-white')}>Border</h1>
        <div className='flex w-full mb-4 items-center overflow-scroll gap-x-4 z-50 bg-slate-200/20 p-4'>
          <Button onClick={() => handleUpdateBorder('full')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full`}><Instagram size={30} color="white" /></Button>
          <Button onClick={() => handleUpdateBorder('large')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg`}><Instagram size={30} color="white" /></Button>
          <Button onClick={() => handleUpdateBorder('small')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-sm`}><Instagram size={30} color="white" /></Button>
          {user.premium && (
            <>
              <Button onClick={() => handleUpdateBorder('color_full')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-card-bg-light to-card-bg-dark rounded-full`}><Instagram size={30} color="white" /></Button>
              <Button onClick={() => handleUpdateBorder('color_large')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-card-bg-light to-card-bg-dark rounded-lg`}><Instagram size={30} color="white" /></Button>
              <Button onClick={() => handleUpdateBorder('color_small')} className={`flex items-center justify-center w-[50px] h-[50px] bg-gradient-to-br from-card-bg-light to-card-bg-dark rounded-sm`}><Instagram size={30} color="white" /></Button>
            </>
          )}
        </div>
        <h1 className={cn('text-xl font-bold', color == 'light' ? 'text-black' : 'text-white')}>Background Color</h1>
        <div className='flex w-full items-center overflow-scroll gap-x-4 z-50 bg-slate-200/20 p-4'>
          <Button onClick={() => handleUpdateThemeColor('light')} className={`w-[50px] h-[50px] bg-gradient-to-br from-[#c2cee0] to-[#ffffff] flex-shrink-0`}></Button>
          <Button onClick={() => handleUpdateThemeColor('dark')} className='w-[50px] h-[50px] bg-gradient-to-br from-[#1c202e] to-[#303950] flex-shrink-0'></Button>
          <Button onClick={() => handleUpdateThemeColor('black')} className={`w-[50px] h-[50px] bg-gradient-to-br from-[#000000] to-[#191c24] flex-shrink-0`}></Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default StyleThemeModal