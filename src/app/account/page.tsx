import React from 'react'
import { redirect, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { Globe, MailIcon, PhoneIcon, Send, UserRoundCog } from 'lucide-react';
import { SparklesCore } from '@/components/sparkles';
import EditProfileButton from '@/components/edit-profile-button';
import AccountHeader from '@/components/account-header';
import ProfileFooter from '@/components/profile/profile-footer';
import ProfileCard from '@/components/profile/profile-card';
import ProfileSocials from '@/components/profile/profile-socials';

type Props = {}

const AccountPage = async (props: Props) => {
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

  const socials = user.data[0].socials

  return (
    <main className='min-h-screen max-w-[450px] p-6 mx-auto flex flex-col items-center bg-gradient-to-tl from-from to-to '>
      <AccountHeader />
      <ProfileCard user={user} />
      <EditProfileButton />
      <ProfileSocials socials={socials} />
      <ProfileFooter />
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

export default AccountPage