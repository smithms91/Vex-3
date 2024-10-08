import ThemeProvider from '@/components/context/theme-provider'
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils';
import { getProfileColor, getThemeColor } from '@/queries';
import { Kanit } from 'next/font/google';
import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';
import { SpeedInsights } from "@vercel/speed-insights/next"

import React from 'react'
import IconBorderProvider from '@/components/context/icon-border-provider';
import ThemeColorProvider from '@/components/context/theme-color-provider';
import Container from '@/components/container';
import Premium from '@/components/modals/premium';
import UserProvider from '@/components/context/user-provider';
import { User } from '@/types';

type Props = {}

const kanit = Kanit({ weight: ['400', '500', '600'], subsets: ["latin"] });
// const openSans = Open_Sans({ weight: ['400', '500', '600'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vex 3.0 | The Future of Business Cards",
  description: "The Future of Business Cards",
};

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  const user = await supabase.from('profiles').select().eq('id', data.user.id)

  if (!user.data) {
    console.log('no user in profiles table')
    redirect('/login?message=Something went wrong. Try logging in again.')
  }

  const [color, themeColor] = await Promise.all([
    await getProfileColor(),
    await getThemeColor()
  ])

  let bgColor: string = '';
  if (user.data[0].theme_color === 'light') bgColor = 'bg-gradient-to-tl from-light-from to-light-to'
  if (user.data[0].theme_color === 'dark') bgColor = 'bg-gradient-to-tl from-dark-from to-dark-to'
  if (user.data[0].theme_color === 'black') bgColor = 'bg-gradient-to-tl from-black-from to-black-to'

  return (
    <main className={cn('max-w-[450px] min-h-screen mx-auto', kanit.className)}>
      <ThemeProvider
        defaultTheme={color}
        enableSystem
      >
        <IconBorderProvider roundedProp={user.data[0].border}>
          <ThemeColorProvider colorProp={themeColor || 'dark'}>
            <UserProvider user={user.data[0] as User}>
              <Container>
                {children}
                <Premium />
              </Container>
            </UserProvider>
          </ThemeColorProvider>
        </IconBorderProvider>
      </ThemeProvider>
      <SpeedInsights />
    </main>
  );
}