'use client';

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

type Props = {
  title: string;
  link: string;
}

const HeaderBackButton = ({ title, link }: Props) => {
  const router = useRouter();

  return (
    <div className='w-full relative bg-slate-600 text-white h-20 flex items-center justify-center text-xl'>
      <ArrowLeft onClick={() => router.push(`/${link}`)} className="absolute left-8 top-6 bottom-0 border-2 rounded-full box-content p-1 cursor-pointer" size={24} color="white" />
      <h1>{title}</h1>
    </div>
  )
}

export default HeaderBackButton