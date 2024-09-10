'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import { Globe, MailIcon, PhoneIcon } from 'lucide-react'
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { profileColors } from '@/constants';

type Props = {
  user: User
}

const UserCard = ({ user }: Props) => {
  const profileColor = profileColors.find(color => color.color === user.profile_color)
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(user.profile_picture || '/profile.jpg');
  return (
    <div className={cn(`space-y-4 z-50 w-full`)}>
      <section className={cn(`flex w-full mb-6 pr-4 h-[225px] rounded-md z-50`, profileColor!.css)}>
        <div className='relative basis-1/2'>
          <Image defaultValue="profile.jpg" className="rounded-tl-md rounded-bl-md object-cover z-20" src={user.profile_picture || '/profile.jpg'} fill alt="" />
        </div>
        <div className='text-black flex basis-1/2 flex-col justify-between pl-2 py-4'>
          <div className='space-y-[-4px] text-white'>
            <p className='text-lg xs:text-2xl'>{user.first_name} {user.last_name}</p>
            <p className='text-xs xs:text-md'>{user.job_title}</p>
          </div>
          <div className='text-card-foreground text-white'>
            <p className='flex items-center text-xs xs:text-sm'>{user.phone_number !== '' && <PhoneIcon size={16} color="white" className='mr-2 tracking-tighter' />}{user.phone_number || ''}</p>
            <p className='flex items-center text-xs xs:text-sm'>{user.email !== '' && <MailIcon size={16} color="white" className='mr-2 tracking-tighter' />}{user.email || ''}</p>
            <p className='flex items-center text-xs xs:text-sm'>{user.website !== '' && <Globe size={16} color="white" className='mr-2 tracking-tighter' />}{user.website || ''}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserCard