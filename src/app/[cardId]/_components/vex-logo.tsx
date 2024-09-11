'use client';

import { useUser } from '@/components/context/user-provider';
import { cn } from '@/lib/utils';
import Link from 'next/link'
import React from 'react'

type Props = {}

const VexLogo = (props: Props) => {
  const user = useUser();

  return (
    <div className="relative flex items-center justify-center mb-3">
      <h1 className={cn(`absolute text-lg uppercase z-10 drop-shadow-md blur-sm`, user.theme_color === 'light' ? 'text-black' : 'text-white')}>Vex</h1>
      <Link href="/" className={cn(`text-lg uppercase z-10 drop-shadow-md`, user.theme_color === 'light' ? 'text-black' : 'text-white')}>Vex</Link>
    </div>
  )
}

export default VexLogo