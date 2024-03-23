import ThemeProvider from '@/components/context/theme-provider'
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils';
import { getProfileColor } from '@/queries';
import { Kanit } from 'next/font/google';
import { redirect } from 'next/navigation';
import { Metadata } from 'next/types';
import { SpeedInsights } from "@vercel/speed-insights/next"

import React from 'react'
import IconBorderProvider from '@/components/context/icon-border-provider';

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
  const color = await getProfileColor();
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

  if (user.data[0].onboarding == false) {
    redirect('/account/onboarding')
  }
  return (
    <main className={cn('max-w-[450px] mx-auto', kanit.className)}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme={color}
        enableSystem
        disableTransitionOnChange>
        <IconBorderProvider roundedProp={user.data[0].border}>
          {children}
        </IconBorderProvider>
        <SpeedInsights />
      </ThemeProvider>
    </main>
  );
}