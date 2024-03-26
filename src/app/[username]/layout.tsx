import ColorThemeProvider from '@/components/color-provider';
import { SparklesCore } from '@/components/sparkles';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils'
import { getProfileColor, getUserProfile } from '@/queries';
import { User } from '@/types';
import { Kanit } from 'next/font/google';
import { redirect } from 'next/navigation';
import React from 'react'
const kanit = Kanit({ weight: ['400', '500', '600'], subsets: ["latin"] });

type Props = {
  params: {
    username: string
  }
  children: React.ReactNode
}

const UserProfileLayout = async ({ children, params }: Props) => {

  return (
    <section className={cn('min-h-screen max-w-[450px] mx-auto flex flex-col items-center bg-gradient-to-tl from-from to-to', kanit.className)}>
      {children}
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" />
    </section>
  )
}

export default UserProfileLayout