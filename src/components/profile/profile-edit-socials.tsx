'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { SocialIcon } from 'react-social-icons'
import { Reorder, useDragControls } from "framer-motion"
import { Grip, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getUserSocials, updateUserSocials } from '@/queries';
import { Database } from '@/lib/database.types';

type Props = {}

const ProfileEditSocials = (props: Props) => {
  const [items, setItems] = useState<Database['public']['Tables']['socials']['Row'][]>([])
  const [mounted, setMounted] = useState(false)

  const router = useRouter();

  useEffect(() => {
    async function getSocials() {
      const socials = await getUserSocials();
      console.log('socials on account page', socials)
      setItems(socials)
      setMounted(true)
    }
    getSocials()
  }, [])

  if (!mounted) return <p className='text-white text-lg mt-10'>Loading Socials...</p>;

  const handleUpdateItems = async (order: typeof items) => {
    setItems(order)
    await updateUserSocials(order)
    console.log('lol', order);
  }

  return (
    <section className='w-full z-50 mb-10'>
      {items.length > 0 &&
        <div className='bg-card-bg-dark p-4'>
          <Reorder.Group className="flex flex-col gap-y-4 z-50" axis="y" values={items} onReorder={handleUpdateItems}>
            {items && items.map((item, index) => (
              <Reorder.Item key={item.id} value={item} className='flex items-center bg-white/80 inset-4 text-black w-full p-2 z-50'>
                <Grip size={20} color="black" className='mr-4 cursor-grab' />
                <SocialIcon network={item.network} />
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