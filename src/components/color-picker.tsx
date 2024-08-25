'use client';

import React from 'react'
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { updateProfileColor } from '@/queries';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import { User } from '@/types';

type Props = {
  user: User
}

const ColorPicker = ({user}: Props) => {
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();

  const handleProfileUpdate = async (color: string) => {
    console.log(user.premium)
    try {
      await updateProfileColor(color)
      toast('Profile color updated!', { position: 'top-center' })
    } catch (error) {
      console.error('error', error)
    }
  };

  if (pathName === '/account') {
    return (
      <div className='flex w-full overflow-scroll overflow-y-hidden gap-x-4 bg-slate-200/20 p-4 mb-4'>
        <Button onClick={() => { setTheme('red'); handleProfileUpdate('red') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#ef7272] to-[#8f0000] flex-shrink-0'></Button>
        <Button onClick={() => { setTheme('orange'); handleProfileUpdate('orange') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#efc372] to-[#9b6500] flex-shrink-0'></Button>
        <Button onClick={() => { setTheme('yellow'); handleProfileUpdate('yellow') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#efe772] to-[#b19f00] flex-shrink-0'></Button>
        <Button onClick={() => { setTheme('green'); handleProfileUpdate('green') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#81ef72] to-[#118f00] flex-shrink-0'></Button>
        <Button onClick={() => { setTheme('blue'); handleProfileUpdate('blue') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#72c6ef] to-[#004E8F] flex-shrink-0'></Button>
        <Button onClick={() => { setTheme('indigo'); handleProfileUpdate('indigo') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#b772ef] to-[#4a008f] flex-shrink-0'></Button>
        <Button onClick={() => { setTheme('violet'); handleProfileUpdate('violet') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#ef72e9] to-[#8f0088] flex-shrink-0'></Button>
        <Button onClick={() => { setTheme('gray'); handleProfileUpdate('gray') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#ebebeb] to-[#7c7c7c] flex-shrink-0'></Button>
        {user.premium && (
          <>
            <Button onClick={() => { setTheme('roseGold'); handleProfileUpdate('roseGold') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#D4A4AA] to-[#8C5359] flex-shrink-0'></Button>
            <Button onClick={() => { setTheme('teal'); handleProfileUpdate('teal') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#33B2B2] to-[#005757] flex-shrink-0'></Button>
            <Button onClick={() => { setTheme('midnightPurple'); handleProfileUpdate('midnightPurple') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#604C9E] to-[#1B0033] flex-shrink-0'></Button>
            <Button onClick={() => { setTheme('champagne'); handleProfileUpdate('champagne') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#FFFFFF] to-[#D2B48C] flex-shrink-0'></Button>
            <Button onClick={() => { setTheme('emerald'); handleProfileUpdate('emerald') }} className='w-[50px] h-[50px] bg-gradient-to-br from-[#80D99E] to-[#3A9B6E] flex-shrink-0'></Button>
          </>
        )}
      </div>
    )
  }



  return (
    <div className='flex w-full overflow-scroll gap-x-4'>
      <Button onClick={() => { setTheme('red'); handleProfileUpdate('red') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#ef7272] to-[#8f0000] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('orange'); handleProfileUpdate('orange') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#efc372] to-[#9b6500] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('yellow'); handleProfileUpdate('yellow') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#efe772] to-[#b19f00] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('green'); handleProfileUpdate('green') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#81ef72] to-[#118f00] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('blue'); handleProfileUpdate('blue') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#72c6ef] to-[#004E8F] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('indigo'); handleProfileUpdate('indigo') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#b772ef] to-[#4a008f] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('violet'); handleProfileUpdate('violet') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#ef72e9] to-[#8f0088] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('gray'); handleProfileUpdate('gray') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#ebebeb] to-[#7c7c7c] flex-shrink-0'></Button>
      {user.premium && (
        <>
          <Button onClick={() => { setTheme('roseGold'); handleProfileUpdate('roseGold') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#D4A4AA] to-[#8C5359] flex-shrink-0'></Button>
          <Button onClick={() => { setTheme('teal'); handleProfileUpdate('teal') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#33B2B2] to-[#005757] flex-shrink-0'></Button>
          <Button onClick={() => { setTheme('midnightPurple'); handleProfileUpdate('midnightPurple') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#604C9E] to-[#1B0033] flex-shrink-0'></Button>
          <Button onClick={() => { setTheme('champagne'); handleProfileUpdate('champagne') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#FFFFFF] to-[#D2B48C] flex-shrink-0'></Button>
          <Button onClick={() => { setTheme('emerald'); handleProfileUpdate('emerald') }} className='w-[75px] h-[75px] bg-gradient-to-br from-[#80D99E] to-[#3A9B6E] flex-shrink-0'></Button>
        </>
    )}
    </div>
  )
}

export default ColorPicker