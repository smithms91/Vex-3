'use client';

import React, { useRef } from 'react'
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
import { Button } from '../ui/button';
import ColorPicker from '../color-picker';
import { Palette, X } from 'lucide-react';

type Props = {
}

const StyleThemeModal = ({ }: Props) => {

  return (
    <Drawer>
      <DrawerTrigger>
        <div className='flex flex-col items-center z-10'>
          <Palette size={22} color='black' />
          <p className='text-xs uppercase'>Style</p>
        </div>
      </DrawerTrigger>
      <DrawerContent className='px-10 max-w-[450px] mx-auto'>
        <DrawerClose className='ml-auto'>
          <X className='bg-white shadow-lg p-1 box-content rounded-full' />
        </DrawerClose>
        <h1 className='mb-2'>Color</h1>
        <ColorPicker />
        <h1 className='mt-8'>Theme</h1>
      </DrawerContent>
    </Drawer>
  )
}

export default StyleThemeModal