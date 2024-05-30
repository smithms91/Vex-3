import { SparklesCore } from '@/components/sparkles';
import { cn } from '@/lib/utils'
import { getUserProfile } from '@/queries';
import { User } from '@/types';
import React from 'react'

type Props = {
  children: React.ReactNode
  params: {
    username: string
  }
}

const UserProfileLayout = async ({ children, params }: Props) => {
  const user = await getUserProfile(params.username)

  let userColor: string;
  let darkText: boolean = false;

  if (user && user.theme_color === 'black') {
    userColor = 'bg-gradient-to-tl from-black-from to-black-to';
  } else if (user && user.theme_color === 'dark') {
    userColor = 'bg-gradient-to-tl from-dark-from to-dark-to';
  } else {
    userColor = 'bg-gradient-to-tl from-light-from to-light-to';
    darkText = true;
  }

  return (
    <main className={cn('min-h-screen max-w-[450px] mx-auto flex flex-col items-center', userColor)}>
      {children}
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor={darkText ? '#000000' : '#FFFFFF'} />
    </main>
  )
}

export default UserProfileLayout