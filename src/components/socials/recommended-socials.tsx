'use client';

import { Phone, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { Button } from '../ui/button';
import { addUserSocial } from '@/queries';
type Props = {}

const RecommendedSocials = (props: Props) => {
  const router = useRouter();

  return (
    <div className='p-4'>
      <h1>Recommended</h1>
      {/* <Button className="bg-black" onClick={() => addUserSocial()}>Test</Button> */}

      <ul className='space-y-2 mt-2'>
        <div onClick={() => router.push('/account/setup/add/Phone')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <div className='p-[.8rem] rounded-full box-content bg-green-400' >
            <Phone className='text-white' />
          </div>
          <div className='ml-4'>
            <p className='text-lg'>Phone</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/Email')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon url='www.email.com' />
          <div className='ml-4'>
            <p className='text-lg'>Email</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/Website')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon url='www.website.com' />
          <div className='ml-4'>
            <p className='text-lg'>Website</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/Instagram')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon url='www.instagram.com' />
          <div className='ml-4'>
            <p className='text-lg'>Instagram</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/Twitter')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon url='www.x.com' />
          <div className='ml-4'>
            <p className='text-lg'>Twitter</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
      </ul>
    </div>
  )
}

export default RecommendedSocials