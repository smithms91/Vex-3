'use client';

import React, { useEffect, useState } from 'react'
import { useThemeColor } from './context/theme-color-provider';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  let themeColor = useThemeColor();
  const [bgColor, setBgColor] = useState<string>('');

  useEffect(() => {
    if (themeColor['color'] === 'light') {
      setBgColor('bg-gradient-to-tl from-light-from to-light-to');
    } else if (themeColor['color'] === 'dark') {
      setBgColor('bg-gradient-to-tl from-dark-from to-dark-to');
    } else {
      setBgColor('bg-gradient-to-tl from-black-from to-black-to');
    }
  }, [themeColor]);

  return (
    <main className={cn("min-h-screen max-w-[450px]", className, bgColor)}>{children}</main>
  )
}

export default Container