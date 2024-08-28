
import { useThemeColor } from '@/components/context/theme-color-provider';
import HeaderBackButton from '@/components/header-with-back-button';
import { SparklesCore } from '@/components/sparkles';
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import SettingsList from './_components/settings-list';
import { createClient } from '@/lib/supabase/server';
import { User } from '@/types';

type Props = {}

const AccountSettingsPage = async (props: Props) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const user = await supabase.from("profiles").select().eq("id", data.user.id);

  if (!user.data) {
    console.log("no user in profiles table");
    redirect("/login?message=Something went wrong. Try logging in again.");
  }

  if (user.data[0].onboarding == false) {
    redirect("/account/onboarding");
  }

  const userData: User = user.data[0];
  let socials = userData.socials;
  let themeColor = userData.theme_color;


  return (
    <main className='min-h-screen z-50 max-w-[450px] mx-auto flex flex-col items-center'>
      <HeaderBackButton title='Account Settings' link='account' />
      <SettingsList user={userData} themeColor={themeColor} />

      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="max-w-[450px] mx-auto h-full absolute top-0 left-0 right-0 z-0"
        particleColor={themeColor === 'light' ? '#000000' : '#FFFFFF'} />
    </main>
  )
}

export default AccountSettingsPage