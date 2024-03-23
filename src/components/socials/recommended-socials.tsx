'use client';

import { Phone, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { SocialIcon } from 'react-social-icons'
type Props = {}

const RecommendedSocials = (props: Props) => {
  const router = useRouter();

  return (
    <div className='p-4'>
      <h1>Recommended</h1>
      <ul className='space-y-2 mt-2'>
        <div onClick={() => router.push('/account/setup/add/phone')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
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
        <div onClick={() => router.push('/account/setup/add/email')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon network='email' />
          <div className='ml-4'>
            <p className='text-lg'>Email</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/website')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon network='sharethis' />
          <div className='ml-4'>
            <p className='text-lg'>Website</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/instagram')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon network='instagram' />
          <div className='ml-4'>
            <p className='text-lg'>Instagram</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/x')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm'>
          <SocialIcon network='x' />
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