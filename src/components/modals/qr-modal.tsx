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
import { DialogTriggerProps } from '@radix-ui/react-dialog';
import QRCode from "react-qr-code";

type Props = {
}

const QrModal = ({ }: Props) => {
  return (
    <div className='fixed bottom-0 z-50 bg-red-500 left-0 right-0'>
      <Drawer>
        <DrawerTrigger>
          <h1>HEY</h1>
        </DrawerTrigger>
        <DrawerContent className='px-10 max-w-[450px] mx-auto'>
          <DrawerClose className='ml-auto'>
            <X className='bg-blue-500 shadow-lg p-1 box-content rounded-full' />
          </DrawerClose>
          <h1 className='mb-2'>QR Code</h1>

        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default QrModal