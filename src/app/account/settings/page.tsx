'use client';

import HeaderBackButton from '@/components/header-with-back-button';
import { SparklesCore } from '@/components/sparkles';
import { Button } from '@/components/ui/button'
import { signOut } from '@/queries'
import { Instagram, ShieldQuestion, Store, TrendingUp, UserRoundCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const AccountSettingsPage = (props: Props) => {
  const router = useRouter();

  return (
    <main className='min-h-screen z-50 max-w-[450px] mx-auto flex flex-col items-center bg-gradient-to-tl from-from to-to'>
      <HeaderBackButton title='Account Settings' link='account' />
      <section className='flex flex-col gap-y-2 w-full p-4'>
        <Button onClick={() => router.push('/account/insights')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-blue-600/20 p-2'>
            <TrendingUp size={18} color='white' />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className='text-md'>Profile Insights</h1>
            <p className='text-xs font-thin'>View your latest insights &amp; analytics</p>
          </div>
        </Button>
        <Button onClick={() => router.push('/account/settings/user-settings')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-purple-600/20 p-2'>
            <UserRoundCog size={18} color="white" />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className='text-md'>Settings</h1>
            <p className='text-xs font-thin'>Customize your preferences</p>
          </div>
        </Button>
        <Button onClick={() => router.push('/account/settings/help-center')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-gray-800/20 p-2'>
            <ShieldQuestion size={18} color="white" />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className='text-md'>Help Center</h1>
            <p className='text-xs font-thin'>View FAQ and contact support</p>
          </div>
        </Button>
        <Button onClick={() => router.push('/shop')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-green-400/20 p-2'>
            <Store size={18} color='white' />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className='text-md'>Shop Devices</h1>
            <p className='text-xs font-thin'>Save 10% on your first device</p>
          </div>
        </Button>
        <Button onClick={() => router.push('https://www.instagram.com/vexcards')} className='flex justify-start bg-slate-600/50 inset-4 text-white w-full py-9 z-50'>
          <div className='flex items-center justify-center rounded-full box-content bg-red-600/20 p-2'>
            <Instagram size={18} color='white' />
          </div>
          <div className='flex flex-col items-start ml-4'>
            <h1 className='text-md'>Join the community</h1>
            <p className='text-xs font-thin'>Follow us on instagram</p>
          </div>
        </Button>
        <Button className="max-w-[420px] mx-auto py-7 text-lg bg-card-bg-dark mt-4 absolute bottom-14 left-4 right-4 z-50" onClick={() => signOut()}>Log Out</Button>
        <div className="absolute bottom-0 left-4 right-4 flex items-center justify-center py-6">
          <h1 className="absolute text-xs uppercase z-10 text-white drop-shadow-md blur-md opacity-1">Vex 3.0</h1>
          <h1 className="text-xs uppercase z-10 text-white drop-shadow-md">Vex 3.0</h1>
        </div>
      </section>

      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="max-w-[450px] mx-auto h-full absolute top-0 left-0 right-0 z-0"
        particleColor="#FFFFFF" />
    </main>
  )
}

export default AccountSettingsPage