'use client';

import React from 'react'
import { ArrowRight } from 'lucide-react';
import { User } from '@/types';
import Link from 'next/link';
import UserSocialIcon from './user-social-icon';

type Props = {
  user: User
}

const UserSocials = ({ user }: Props) => {

  return (
    <section className='w-full mt-4 z-50'>
      {user.socials && user.socials.length > 0 &&
        <div className="flex flex-col gap-y-2 z-50" >
          <h1 className='text-white text-xl mt-2 -mb-1'>Socials</h1>
          {user.socials && user.socials.map((social, index) => (
            <Link key={social.id} className='flex items-center bg-slate-600/50 text-white w-full p-2 z-50 cursor-pointer rounded-md' href={`${social.url}${social.value}`} >
              <UserSocialIcon network={social.network} border={user.border} />
              <div className='ml-4'>
                <p className='text-lg'>{social.title !== '' ? social.title : social.network.charAt(0).toUpperCase() + social.network.slice(1)}</p>
                <p className='text-xs'>{social.value}</p>
              </div>
              <ArrowRight size={16} color="white" className='ml-auto mr-4 cursor-grab active:cursor-grabbing' />
            </Link>
          ))}
        </div>
      }
    </section>
  )
}

export default UserSocials