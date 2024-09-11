'use client';

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import CustomSocialIcon from '../custom-social-icon';
import { allSocials } from '@/constants';
import { useThemeColor } from '../context/theme-color-provider';
import { cn } from '@/lib/utils';

type Props = {
}

const RecommendedSocials = (props: Props) => {
  const router = useRouter();
  const themeColor = useThemeColor();
  const socialsOfType = allSocials.filter(social => social.type === 'recommended')

  return (
    <div className='p-4'>
      <h1 className={cn(themeColor.color === 'light' ? 'text-black' : 'text-white')}>Recommended</h1>
      <ul className='space-y-2 mt-2'>
        {socialsOfType.map((social, i) => (
          <li key={i} onClick={() => router.push(`/account/setup/add/${social.network}`)} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
            <CustomSocialIcon network={social.network} className='text-white' />
            <div className='ml-4'>
              <p className='text-lg'>{social.title}</p>
            </div>
            <div className='ml-auto mr-2 flex items-center'>
              <Plus size={14} color="black" />
              <p className='ml-2'>Add</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecommendedSocials