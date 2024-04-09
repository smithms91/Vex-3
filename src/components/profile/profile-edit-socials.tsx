'use client';

import React, { useState } from 'react'
import { Reorder } from "framer-motion"
import { Grip, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { updateUserSocials } from '@/queries';
import CustomSocialIcon from '../custom-social-icon';
import { toast } from 'sonner';
import { Social } from '@/types';

type Props = {
  socials: Social[]
}

const ProfileEditSocials = ({ socials }: Props) => {
  const [items, setItems] = useState<Social[]>(socials)
  const [mounted, setMounted] = useState(false)

  const router = useRouter();

  const handleUpdateItems = async (order: typeof items) => {
    setItems(order)
    try {
      await updateUserSocials(order)
      toast('Socials updated!', { position: 'top-center' })
    } catch (error) {
      console.error('error', error);
    }
  }

  return (
    <section className='w-full z-50 mb-4 relative'>
      {items && items.length > 0 &&
        <div className='bg-gradient-to-br from-card-bg-light to-card-bg-dark p-4'>
          <Reorder.Group className="flex flex-col gap-y-4 z-50" axis="y" values={items} onReorder={handleUpdateItems}>
            {items && items.map((item, index) => (
              <Reorder.Item key={item.id} value={item} className='flex items-center bg-white/80 inset-4 text-black w-full p-2 z-50'>
                <Grip size={20} color="black" className='mr-4 cursor-grab' />
                <CustomSocialIcon network={item.network} />
                <div className='ml-4'>
                  <p className='text-lg'>{item.title !== '' ? item.title : item.network.charAt(0).toUpperCase() + item.network.slice(1)}</p>
                  <p className='text-xs'>{item.value}</p>
                </div>
                <Pencil onClick={() => router.push(`/account/setup/edit/${item.id}`)} size={16} color="black" className='ml-auto mr-4 cursor-pointer' />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      }
    </section>
  )
}

export default ProfileEditSocials