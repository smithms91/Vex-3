import HeaderBackButton from '@/components/header-with-back-button'
import ProfileCard from '@/components/profile/profile-card'
import ProfileEditSocials from '@/components/profile/profile-edit-socials'
import { SparklesCore } from '@/components/sparkles'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const SetupPage = async (props: Props) => {
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
    <main className='max-w-[450px] mx-auto bg-gradient-to-tl from-from to-to'>
      <HeaderBackButton title="Setup" link="account" />
      {/* <h1>Enable/Disable</h1> */}
      <ProfileCard email={data.user.email!} user={user} options className='px-4 relative' />
      <div className='px-4 mt-6 relative'>
        <h1 className='text-xl mb-2 text-white/80'>Socials</h1>
        <ProfileEditSocials socials={socials} />
        <Link href='/account/setup/add'><Button className='bg-card-bg-dark text-white w-full py-6 mb-10 z-50 relative no-underline'>Add Content</Button></Link>
      </div>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="max-w-[450px] mx-auto fixed w-full h-full bottom-0 top-0 left-0 right-0 z-0"
        particleColor="#FFFFFF"
      />
    </main>
  )
}

export default SetupPage