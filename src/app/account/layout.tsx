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

type Props = {}

const kanit = Kanit({ weight: ['400', '500', '600'], subsets: ["latin"] });

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

  return (
    <main className={cn('max-w-[450px] min-h-screen mx-auto', kanit.className)}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme={color}
        enableSystem
        disableTransitionOnChange>
        <IconBorderProvider roundedProp={user.data[0].border}>
          <ThemeColorProvider colorProp={themeColor}>
            <Container>
              {children}
            </Container>
          </ThemeColorProvider>
        </IconBorderProvider>
      </ThemeProvider>
      <SpeedInsights />
    </main>
  );
}