'use client';

import React from 'react'
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { signOut, updateProfileColor } from '@/queries';

type Props = {}

const ColorPicker = (props: Props) => {
  const { theme, setTheme } = useTheme()
  console.log('theme', theme)
  return (
    <div className='flex w-full overflow-scroll gap-x-4'>
      <Button onClick={() => { setTheme('red'); updateProfileColor('red') }} className='w-[75px] h-[75px] bg-[#8f0000] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('orange'); updateProfileColor('orange') }} className='w-[75px] h-[75px] bg-[#9b6500] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('yellow'); updateProfileColor('yellow') }} className='w-[75px] h-[75px] bg-[#b19f00] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('green'); updateProfileColor('green') }} className='w-[75px] h-[75px] bg-[#118f00] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('blue'); updateProfileColor('blue') }} className='w-[75px] h-[75px] bg-[#004E8F] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('indigo'); updateProfileColor('indigo') }} className='w-[75px] h-[75px] bg-[#4a008f] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('violet'); updateProfileColor('violet') }} className='w-[75px] h-[75px] bg-[#8f0088] flex-shrink-0'></Button>
      <Button onClick={() => { setTheme('gray'); updateProfileColor('gray') }} className='w-[75px] h-[75px] bg-[#7c7c7c] flex-shrink-0'></Button>
    </div>
  )
}

export default ColorPicker