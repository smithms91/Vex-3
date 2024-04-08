'use client';

import React, { useRef, useState } from 'react'
import { Reorder } from "framer-motion"
import { ArrowRight, ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateUserSocials } from '@/queries';
import CustomSocialIcon from '../custom-social-icon';
import { toast } from 'sonner';
import { Social } from '@/types';
import { useThemeColor } from '../context/theme-color-provider';
import { cn } from '@/lib/utils';
import { usePreviewMode } from '../context/preview-mode-provider';
import Link from 'next/link';
import UserSocialIcon from '@/app/[username]/_components/user-social-icon';

type Props = {
  socials: Social[]
}

const ProfileSocials = ({ socials }: Props) => {
  const [items, setItems] = useState<Social[]>(socials);
  const { preview, setPreview } = usePreviewMode();

  const { color, setColor } = useThemeColor();

  const router = useRouter();

  const toastTimeout = useRef<NodeJS.Timeout | null>(null);
  const toastScheduled = useRef(false);

  const handleUpdateItems = async (order: typeof items) => {
    if (JSON.stringify(order) !== JSON.stringify(items)) {
      setItems(order);
    }
    try {
      await updateUserSocials(order)
      if (toastScheduled.current) {
        clearTimeout(toastTimeout.current!);
      }
      toastScheduled.current = true;
      toastTimeout.current = setTimeout(() => {
        toast('Socials updated!', { position: 'top-center' })
        toastScheduled.current = false;
      }, 600); // Wait for .6 seconds before showing the toast
    } catch (error) {
      console.log('error', error)
    }
    console.log('order', order)
  }

  if (preview) {
    return (
      <section className='w-full mt-6 z-50'>
        {items && items.length > 0 &&
          <div className="flex flex-col gap-y-2 z-50" >
            <div className='flex items-center gap-y-0 relative'>
              <h1 className={cn(`text-xl`, color === 'light' ? 'text-black' : 'text-white')}>Socials</h1>
              {!preview ? <p onClick={() => setPreview(!preview)} className='text-white text-xs bottom-0 right-0 underline opacity-80 hover:text-card-bg-light absolute cursor-pointer'>Preview Profile</p> : <p onClick={() => setPreview(!preview)} className='cursor-pointer text-white text-xs bottom-0 right-0 underline opacity-80 hover:text-card-bg-light absolute'>Edit Mode</p>}
            </div>
            {items && items.map((social, index) => (
              <Link key={social.id} className={cn('flex items-center bg-slate-600/50 text-white w-full p-2 z-50 cursor-pointer rounded-md', color === 'light' || color === 'dark' ? 'bg-slate-600/50' : 'bg-gray-200/20')} href={`${social.url}${social.value}`} >
                <UserSocialIcon network={social.network} />
                <div className='ml-4'>
                  <p className={cn('text-lg', color === 'light' ? 'text-black' : 'text-white')}>{social.title !== '' ? social.title : social.network.charAt(0).toUpperCase() + social.network.slice(1)}</p>
                  <p className={cn('text-sm', color === 'light' ? 'text-black' : 'text-white')}>{social.value}</p>
                </div>
                <ArrowRight size={16} color='#FFFFFF' className='ml-auto mr-4 cursor-grab active:cursor-grabbing' />
              </Link>
            ))}
          </div>
        }
      </section>
    )
  }

  return (
    <section className='w-full mt-6 z-50 mb-20'>
      {items && items.length > 0 &&
        <Reorder.Group as="div" className="flex flex-col gap-y-2 z-50" axis="y" values={items} onReorder={handleUpdateItems}>
          <div className='flex items-center gap-y-0 relative'>
            <h1 className={cn(`text-xl`, color === 'light' ? 'text-black' : 'text-white')}>Socials</h1>
            {!preview ? <p onClick={() => setPreview(!preview)} className='text-white text-xs bottom-0 right-0 underline opacity-80 hover:text-card-bg-light absolute cursor-pointer'>Preview Profile</p> : <p onClick={() => setPreview(!preview)} className='cursor-pointer text-white text-xs bottom-0 right-0 underline opacity-80 hover:text-card-bg-light absolute'>Edit Mode</p>}
          </div>
          {items && items.map((item, index) => (
            <Reorder.Item as="div" key={item.id} value={item} className={cn('flex items-center text-white w-full p-2 z-50 cursor-pointer rounded-md', color === 'light' || color === 'dark' ? 'bg-slate-600/50' : 'bg-gray-200/20')} onClick={() => router.push(`/account/setup/edit/${item.id}`)} >
              <CustomSocialIcon network={item.network} />
              <div className='ml-4'>
                <p className={cn('text-lg', color === 'light' ? 'text-black' : 'text-white')}>{item.title !== '' ? item.title : item.network.charAt(0).toUpperCase() + item.network.slice(1)}</p>
                <p className={cn('text-sm', color === 'light' ? 'text-black' : 'text-white')}>{item.value}</p>
              </div>
              <ArrowUpDown size={16} color={color === 'light' ? 'black' : 'white'} className='ml-auto mr-4 cursor-grab active:cursor-grabbing' />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      }
    </section>
  )
}

export default ProfileSocials