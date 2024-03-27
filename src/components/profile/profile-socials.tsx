'use client';

import React, { useRef, useState } from 'react'
import { Reorder } from "framer-motion"
import { ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateUserSocials } from '@/queries';
import CustomSocialIcon from '../custom-social-icon';
import { toast } from 'sonner';
import { Social } from '@/types';
import { useThemeColor } from '../context/theme-color-provider';
import { cn } from '@/lib/utils';

type Props = {
  socials: Social[]
}

const ProfileSocials = ({ socials }: Props) => {
  const [items, setItems] = useState<Social[]>(socials)
  const [mounted, setMounted] = useState(false)
  const themeColor = useThemeColor();

  const router = useRouter();

  const toastTimeout = useRef<NodeJS.Timeout | null>(null);
  const toastScheduled = useRef(false);

  const handleUpdateItems = async (order: typeof items) => {
    setItems(order)
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
  }

  return (
    <section className='w-full mt-4 z-50 mb-20'>
      {items && items.length > 0 &&
        <Reorder.Group className="flex flex-col gap-y-2 z-50" axis="y" values={items} onReorder={handleUpdateItems}>
          <h1 className={cn(`text-xl mt-2 -mb-1`, themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>Socials</h1>
          {items && items.map((item, index) => (
            <Reorder.Item key={item.id} value={item} className='flex items-center bg-slate-600/50 text-white w-full p-2 z-50 cursor-pointer rounded-md' onClick={() => router.push(`/account/setup/edit/${item.id}`)} >
              <CustomSocialIcon network={item.network} />
              <div className='ml-4'>
                <p className={cn('text-lg', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>{item.title !== '' ? item.title : item.network.charAt(0).toUpperCase() + item.network.slice(1)}</p>
                <p className={cn('text-sm', themeColor['color'] === 'light' ? 'text-black' : 'text-white')}>{item.value}</p>
              </div>
              <ArrowUpDown size={16} color={themeColor['color'] === 'light' ? 'black' : 'white'} className='ml-auto mr-4 cursor-grab active:cursor-grabbing' />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      }
    </section>
  )
}

export default ProfileSocials