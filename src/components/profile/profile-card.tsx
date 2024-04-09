'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { Globe, MailIcon, PhoneIcon, UploadIcon } from 'lucide-react'
import OnboardingFormTwo from '../forms/onboarding-form-two';
import ThemePicker from '../color-picker';
import { cn } from '@/lib/utils';
import EditPictureModal from '../modals/edit-picture-modal';
import { useTheme } from 'next-themes';
import { User } from '@/types';

type Props = {
  user: User
  email: string;
  options?: boolean
  className?: string
}

const ProfileCard = ({ user, email: authEmail, options, className }: Props) => {
  const userData = user;
  const { setTheme } = useTheme();
  const [firstName, setFirstName] = useState(userData.first_name || '')
  const [lastName, setLastName] = useState(userData.last_name || '')
  const [email, setEmail] = useState(authEmail || '')
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number || '')
  const [website, setWebsite] = useState(userData.website || '')
  const [jobTitle, setJobTitle] = useState(userData.job_title || '')
  const [pictureModalOpen, setPictureModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(userData.profile_picture || '/profile.jpg');

  useEffect(() => {
    setTheme(userData.profile_color); //set your theme here after component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(`space-y-4 z-50 w-full`, className)}>
      <section className='flex bg-card-bg w-full my-6 pr-4 h-[225px] rounded-md bg-gradient-to-tl from-card-bg-dark to-card-bg-light z-50'>
        <div onClick={() => setPictureModalOpen(true)} className='relative w-[45%]'>
          {options && (
            <UploadIcon size={24} color="black" className='z-40 cursor-pointer absolute -top-2 -left-2 z-100 border-2 border-card-bg-dark rounded-full p-2 box-content bg-white shadow-lg' />
          )}
          <Image defaultValue="profile.jpg" className="rounded-tl-md rounded-bl-md object-cover z-20" src={selectedFileUrl || '/profile.jpg'} fill alt="" />
        </div>
        <div className='text-black flex flex-col justify-between pl-2 py-4'>
          <div className='space-y-[-4px] text-card-foreground'>
            <p className='text-lg xs:text-2xl'>{firstName} {lastName}</p>
            <p className='text-xs xs:text-md'>{jobTitle}</p>
          </div>
          <div className='text-card-foreground'>
            <p className='flex items-center text-xs xs:text-sm'>{phoneNumber !== '' && <PhoneIcon size={16} color="white" className='mr-2 tracking-tighter' />}{phoneNumber || ''}</p>
            <p className='flex items-center text-xs xs:text-sm'>{email !== '' && <MailIcon size={16} color="white" className='mr-2 tracking-tighter' />}{email || ''}</p>
            <p className='flex items-center text-xs xs:text-sm'>{website !== '' && <Globe size={16} color="white" className='mr-2 tracking-tighter' />}{website || ''}</p>
          </div>
        </div>
      </section>
      {options &&
        <>
          <ThemePicker />
          <OnboardingFormTwo options user={userData} setEmail={setEmail} setFirstName={setFirstName} setLastName={setLastName} setPhoneNumber={setPhoneNumber} setWebsite={setWebsite} setJobTitle={setJobTitle} />
        </>
      }
      {pictureModalOpen && <EditPictureModal selectedFile={selectedFile!} selectedFileUrl={selectedFileUrl!} setSelectedFile={setSelectedFile} setSelectedFileUrl={setSelectedFileUrl} closeModal={() => setPictureModalOpen(false)} />}
    </div>
  )
}

export default ProfileCard