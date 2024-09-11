'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import { Globe, MailIcon, PhoneIcon } from 'lucide-react'
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { profileColors } from '@/constants';
import Link from 'next/link';
import { useUser } from '@/components/context/user-provider';

type Props = {
  // user: User
}

const UserCard = ({ }: Props) => {
  const user = useUser()
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
            {user.phone_number && <Link href={`tel:${user.phone_number}`} className='flex items-center text-xs xs:text-sm'><PhoneIcon size={16} color="white" className='mr-2 tracking-tighter' />{user.phone_number}</Link>}
            {user.email && <Link href={`mailto:${user.email}`} className='flex items-center text-xs xs:text-sm'><MailIcon size={16} color="white" className='mr-2 tracking-tighter' />{user.email}</Link>}
            {user.website && <Link href={`https://${user.website}`} className='flex items-center text-xs xs:text-sm'><Globe size={16} color="white" className='mr-2 tracking-tighter' />{user.website}</Link>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserCard