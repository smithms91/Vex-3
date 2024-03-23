'use client';

import React, { useState } from 'react'
import { Reorder } from "framer-motion"
import { ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateUserSocials } from '@/queries';
import CustomSocialIcon from '../custom-social-icon';
import { toast } from 'sonner';
import { Social } from '@/types';

type Props = {
  socials: Social[]
}

const ProfileSocials = ({ socials }: Props) => {
  const [items, setItems] = useState<Social[]>(socials)
  const [mounted, setMounted] = useState(false)
  const router = useRouter();

  const handleUpdateItems = async (order: typeof items) => {
    setItems(order)
    try {
      await updateUserSocials(order)
      toast('Socials updated!', { position: 'top-center' })
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <section className='w-full mt-4 z-50 mb-20'>
      {items.length > 0 &&
        <Reorder.Group className="flex flex-col gap-y-4 z-50" axis="y" values={items} onReorder={handleUpdateItems}>
          <h1 className='text-white text-xl mt-2 -mb-1'>Socials</h1>
          {items && items.map((item, index) => (
            <Reorder.Item key={item.id} value={item} className='flex items-center bg-white/60 text-black w-full p-2 z-50 cursor-pointer rounded-sm' onClick={() => router.push(`/account/setup/edit/${item.id}`)} >
              <CustomSocialIcon network={item.network} />
              <div className='ml-4'>
                <p className='text-lg'>{item.title !== '' ? item.title : item.network.charAt(0).toUpperCase() + item.network.slice(1)}</p>
                <p className='text-sm'>{item.value}</p>
              </div>
              <ArrowUpDown size={16} color="black" className='ml-auto mr-4 cursor-grab active:cursor-grabbing' />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      }
    </section>
  )
}

export default ProfileSocials