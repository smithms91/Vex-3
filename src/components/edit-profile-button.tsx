'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

type Props = {}

const EditProfileButton = (props: Props) => {
  const router = useRouter()
  return (
    <Button className="z-10 py-6 text-md bg-card-bg-dark hover:bg-card-bg-light w-full border-b-2 border-card-bg-light cursor-pointer" onClick={() => router.push('/account/setup')}>Edit Profile</Button>
  )
}

export default EditProfileButton