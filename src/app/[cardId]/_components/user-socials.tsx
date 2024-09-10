'use client';

import React from 'react'
import { ArrowRight } from 'lucide-react';
import { User } from '@/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MySocialIcon from '@/components/custom-social-icon';

type Props = {
  user: User
  darkText: boolean;
}

const UserSocials = ({ user, darkText }: Props) => {
  return (
    <section className='w-full mt-4 z-50'>
      {user.socials && user.socials.length > 0 &&
        <div className="flex flex-col gap-y-2 z-50" >
          <h1 className={cn(`text-xl mt-2 -mb-1`, darkText ? 'text-black' : 'text-white')}>Socials</h1>
          {user.socials && user.socials.map((social, index) => (
            <Link key={social.id} className={cn('flex items-center bg-slate-600/50 text-white w-full p-2 z-50 cursor-pointer rounded-md', user.theme_color === 'light' || user.theme_color === 'dark' ? 'bg-slate-600/50' : 'bg-gray-200/20')} href={`${social.url}${social.value}`} >
              <MySocialIcon network={social.network} border={user.border} />
              <div className='ml-4'>
                <p className={cn('text-lg', darkText ? 'text-black' : 'text-white')}>{social.title !== '' ? social.title : social.name}</p>
                <p className={cn('text-xs', darkText ? 'text-black' : 'text-white')}>{social.value}</p>
              </div>
              <ArrowRight size={16} color={darkText ? '#000000' : '#FFFFFF'} className='ml-auto mr-4 cursor-grab active:cursor-grabbing' />
            </Link>
          ))}
        </div>
      }
    </section>
  )
}

export default UserSocials