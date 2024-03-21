'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {
  title: string
}

const CtaBanner = ({ title }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true)
    }, 2500)
  }, [])

  return (
    <Link href='/' className={cn('max-w-[450px] mx-auto text-xs uppercase tracking-widest h-[50px] fixed top-0 left-0 right-0 bg-foreground text-white drop-shadow-md flex items-center justify-center transition-all', open === false && 'hidden')}>
      {title}
      <X onClick={() => setOpen(!open)} className='h-4 w-4 absolute right-4 cursor-pointer' />
    </Link>
  )
}

export default CtaBanner