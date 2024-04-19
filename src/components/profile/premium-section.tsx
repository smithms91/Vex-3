'use client';

import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const PremiumSection = (props: Props) => {
  return (
    <section className='text-white p-4 max-w-[450px] mb-4 z-50 relative'>
      <h1 className='text-bold text-xl opacity-80 mb-1'>Premium</h1>
      <Link href="/premium/features" className='z-50'>
        <div className='flex items-center bg-slate-200/20 p-4 rounded-md'>
          <Star className='mr-4' />
          <div className='basis-2/3'>
            <h1 className='text-md'>Upgrade to <strong>Vex Premium</strong></h1>
            <p className='text-xs opacity-75'>Hide Vex branding from your profile and upload your own logo.</p>
          </div>
          <ArrowRight size={18} className='ml-auto' />
        </div>
      </Link>
    </section>
  )
}

export default PremiumSection