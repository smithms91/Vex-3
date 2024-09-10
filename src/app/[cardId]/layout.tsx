import IconBorderProvider, { IconBorderProviderProps } from '@/components/context/icon-border-provider';
import ThemeProvider from '@/components/context/theme-provider';
import { SparklesCore } from '@/components/sparkles';
import { cn } from '@/lib/utils'
import { getUserProfile, lookupCardIdReturnUser, lookupUserOrCard } from '@/queries';
import { User } from '@/types';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  children: React.ReactNode
  params: {
    cardId: string
  }
}

const UserProfileLayout = async ({ children, params }: Props) => {
  const user = await lookupUserOrCard(params.cardId);
  if (!user) {
    redirect('/')
  }

  let userColor: string;
  let darkText: boolean = false;
  let profileColor: string = user.profile_color;

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
      <ThemeProvider
        attribute="data-theme"
        defaultTheme={user.profile_color}
        enableSystem
      >
        <IconBorderProvider roundedProp={user.border as IconBorderProviderProps['roundedProp']}>
          {children}
        </IconBorderProvider>
      </ThemeProvider>
      {/* <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor={darkText ? '#000000' : '#FFFFFF'} /> */}
    </main>
  )
}

export default UserProfileLayout