'use client';

import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useThemeColor } from './context/theme-color-provider';

type Props = {
  title: string;
  link: string;
}

const HeaderBackButton = ({ title, link }: Props) => {
  const router = useRouter();
  const theme = useThemeColor();

  return (
    <div className={cn('w-full z-10 relative h-20 flex items-center justify-center text-xl',
      theme.color === 'black'
        ? 'bg-black text-white shadow-xl shadow-[#ffffff15]'
        : 'bg-slate-600 text-white'
    )}>
      <ArrowLeft
        onClick={() => router.push(`/${link}`)}
        className={cn(
          "absolute left-8 top-6 bottom-0 border-2 rounded-full box-content p-1 cursor-pointer",
          theme.color === 'black' ? 'text-white border-white' : 'text-white border-white'
        )}
        size={24}
      />
      <h1>{title}</h1>
    </div>
  )
}

export default HeaderBackButton