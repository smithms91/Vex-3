'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';
import { usePreviewMode } from './context/preview-mode-provider';
import AddContactButton from '@/app/[username]/_components/user-add-contact';
import { User } from '@/types';

type Props = {
  user: any;
}

const EditProfileButton = ({ user }: Props) => {
  const router = useRouter()
  const { preview } = usePreviewMode();
  return (
    !preview ? <Button className="z-10 py-7 -my-2 text-md bg-card-bg-dark hover:bg-card-bg-light w-full border-b-2 border-card-bg-light cursor-pointer" onClick={() => router.push('/account/setup')}>Edit Profile</Button> : <AddContactButton user={user.data[0] as User} />
  )
}

export default EditProfileButton