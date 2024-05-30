'use client';

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import MySocialIcon from '../custom-social-icon';
import { music } from '@/constants';
import { useThemeColor } from '../context/theme-color-provider';
import { cn } from '@/lib/utils';

type Props = {}

const Contacts = (props: Props) => {
  const router = useRouter();
  const themeColor = useThemeColor();
  const [showAll, setShowAll] = useState(false)
  const itemsToShow = showAll ? music : music.slice(0, 4)

  return (
    <div className='p-4'>
      <h1 className={cn(themeColor.color === 'light' ? 'text-black' : 'text-white')}>Music Links</h1>
      <ul className='space-y-2 mt-2'>
        {itemsToShow.map((type, i) => (
          <li key={i} onClick={() => router.push(`/account/setup/add/${type.network}`)} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
            <MySocialIcon network={type.network} className='text-white' />
            <div className='ml-4'>
              <p className='text-lg'>{type.title}</p>
            </div>
            <div className='ml-auto mr-2 flex items-center'>
              <Plus size={14} color="black" />
              <p className='ml-2'>Add</p>
            </div>
          </li>
        ))}
        {!showAll && music.length > 4 && (
          <button onClick={() => setShowAll(true)} className={cn('text-white underline flex items-center', themeColor.color === 'light' ? 'text-black' : 'text-white')}>Show More <ArrowDown className="ml-1" size={12} /></button>
        )}
        {showAll && (
          <button onClick={() => setShowAll(false)} className={cn('text-white underline flex items-center', themeColor.color === 'light' ? 'text-black' : 'text-white')}>Show Less <ArrowUp className="ml-1" size={12} /></button>
        )}
      </ul>
    </div>
  )
}

export default Contacts