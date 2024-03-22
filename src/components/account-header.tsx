'use client';

import { QrCode, UserRoundCog, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import QrModal from './modals/qr-modal';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from './ui/drawer';
import QRCode from 'react-qr-code';
import { getProfilePicture, getUserId } from '@/queries';
import Image from 'next/image';

type Props = {}

const AccountHeader = (props: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState('')
  const [userID, setUserID] = useState('')

  useEffect(() => {
    async function fetchPicture() {
      const pic = await getProfilePicture()
      setProfilePicture(pic)
      const id = await getUserId()
      setUserID(id)
    }
    fetchPicture()
  }, [])

  return (
    <div className='flex items-center justify-between w-full z-10'>
      <div className='flex items-center justify-center shadow-xl bg-white rounded-full p-2 box-content'>
        <UserRoundCog className="cursor-pointer" onClick={() => router.push('/account/settings')} size={20} color="black" />
      </div>
      <div className="relative">
        <h1 className="absolute text-3xl uppercase z-10 text-white drop-shadow-md blur-md opacity-1">Vex</h1>
        <h1 className="text-3xl uppercase z-10 text-white drop-shadow-md">Vex</h1>
      </div>
      <Drawer>
        <div onClick={() => setModalOpen(!modalOpen)} className='flex items-center justify-center shadow-xl bg-white rounded-full p-2 box-content'>
          <DrawerTrigger>
            <QrCode size={20} color="black" />
          </DrawerTrigger>
        </div>
        <DrawerContent className='px-10 max-w-[450px] mx-auto'>
          <DrawerClose className='ml-auto'>
            <X className='bg-blue-500 shadow-lg p-1 box-content rounded-full' />
          </DrawerClose>
          <h1 className='mb-2'>QR Code</h1>
          <div className='relative'>
            <QRCode
              style={{ height: "auto", maxWidth: "450px", width: "auto", margin: "0 auto" }}
              value={`https://vex.cards/${userID}`}
              viewBox={`0 0 256 256`}
            />
            <Image src={profilePicture} className='rounded-lg absolute  top-[40%] left-[42%] border-4 border-black' alt='Profile Picture' width={52} height={22} />
          </div>
          <div className="relative mx-auto mt-4 tracking-widest">
            <h1 className="absolute text-lg uppercase z-10 text-black drop-shadow-md blur-md opacity-25">Vex</h1>
            <h1 className="text-lg uppercase z-10 text-black/75 drop-shadow-md">Vex</h1>
          </div>
        </DrawerContent>
      </Drawer >
    </div>
  )
}

export default AccountHeader