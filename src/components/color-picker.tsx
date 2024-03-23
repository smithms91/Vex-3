'use client';

import React from 'react'
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { updateProfileColor } from '@/queries';
import { toast } from 'sonner';

type Props = {}

const ColorPicker = (props: Props) => {
  const { theme, setTheme } = useTheme();

  const handleProfileUpdate = async (color: string) => {
    try {
      await updateProfileColor(color)
      toast('Profile color updated!', { position: 'top-center' })
    } catch (error) {
      console.error('error', error)
    }
  };

  return (
    <div className='flex w-full overflow-scroll gap-x-4'>
      <Button onClick={() => { setTheme('red'); handleProfileUpdate('red') }} className='w-[60px] h-[60px] bg-[#8f0000] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('orange'); handleProfileUpdate('orange') }} className='w-[60px] h-[60px] bg-[#9b6500] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('yellow'); handleProfileUpdate('yellow') }} className='w-[60px] h-[60px] bg-[#b19f00] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('green'); handleProfileUpdate('green') }} className='w-[60px] h-[60px] bg-[#118f00] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('blue'); handleProfileUpdate('blue') }} className='w-[60px] h-[60px] bg-[#004E8F] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('indigo'); handleProfileUpdate('indigo') }} className='w-[60px] h-[60px] bg-[#4a008f] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('violet'); handleProfileUpdate('violet') }} className='w-[60px] h-[60px] bg-[#8f0088] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('gray'); handleProfileUpdate('gray') }} className='w-[60px] h-[60px] bg-[#7c7c7c] flex-shrink-0'></Button>
    </div>
  )
}

export default ColorPicker