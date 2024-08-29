'use client';

import React from 'react'
import { useThemeColor } from '../context/theme-color-provider';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

type Props = {
  onClose: () => void;
}

const PremiumModal = ({ onClose }: Props) => {
  const { color, setColor } = useThemeColor();

  const bgColor = {
    light: 'bg-white',
    dark: 'bg-gray-800',
    black: 'bg-black',
  }[color] || 'bg-black';

  // Determine text color based on background color
  const textColor = {
    light: 'text-slate-800',
    dark: 'text-slate-100',
    black: 'text-slate-100',
  }[color] || 'text-slate-100';

  return (
    <div
      className="relative z-40"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div onClick={onClose} className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center ">
          <div className={cn("relative w-[450px] sm:w-[450px] my-auto rounded-2xl text-left shadow-xl transition-all z-50", bgColor, textColor)}>
            <div className={cn('w-[120px] h-[120px] absolute right-[calc(50%-60px)] -top-10 rounded-full z-[-1]', bgColor)}></div>
            <div className="px-5 py-10 flex flex-col items-center justify-center z-50">
              <h1 className=''>Get VEX Premium</h1>
              <p>Unlock endless customization and powerful insights with Vex Premium—your digital business card, elevated.</p>
              <h4></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PremiumModal