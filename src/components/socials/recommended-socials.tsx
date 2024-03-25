'use client';

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import MySocialIcon from '../custom-social-icon';
import { constants } from '@/constants';

type Props = {}

const RecommendedSocials = (props: Props) => {
  const router = useRouter();

  return (
    <div className='p-4'>
      <h1>Recommended</h1>
      <ul className='space-y-2 mt-2'>
        {constants.map((constant, i) => (
          <li key={i} onClick={() => router.push(`/account/setup/add/${constants[i].network}`)} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
            <MySocialIcon network={constants[i].network} className='text-white' />
            <div className='ml-4'>
              <p className='text-lg'>{constants[i].title}</p>
            </div>
            <div className='ml-auto mr-2 flex items-center'>
              <Plus size={14} color="black" />
              <p className='ml-2'>Add</p>
            </div>
          </li>
        ))}

        {/* <div onClick={() => router.push('/account/setup/add/email')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='email' />
          <div className='ml-4'>
            <p className='text-lg'>Email</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/website')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='website' />
          <div className='ml-4'>
            <p className='text-lg'>Website</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/instagram')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='instagram' />
          <div className='ml-4'>
            <p className='text-lg'>Instagram</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/x')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='x' />
          <div className='ml-4'>
            <p className='text-lg'>Twitter</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/linkedin')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='linkedin' />
          <div className='ml-4'>
            <p className='text-lg'>LinkedIn</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/facebook')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='facebook' />
          <div className='ml-4'>
            <p className='text-lg'>Facebook</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/youtube')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='youtube' />
          <div className='ml-4'>
            <p className='text-lg'>YouTube</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/snapchat')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='snapchat' />
          <div className='ml-4'>
            <p className='text-lg'>Snapchat</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/tiktok')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='tiktok' />
          <div className='ml-4'>
            <p className='text-lg'>TikTok</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div>
        <div onClick={() => router.push('/account/setup/add/twitch')} className='flex items-center bg-gray-200 text-black w-full p-2 z-50 rounded-sm cursor-pointer'>
          <MySocialIcon network='twitch' />
          <div className='ml-4'>
            <p className='text-lg'>Twitch</p>
          </div>
          <div className='ml-auto mr-2 flex items-center'>
            <Plus size={14} color="black" />
            <p className='ml-2'>Add</p>
          </div>
        </div> */}
      </ul>
    </div>
  )
}

export default RecommendedSocials