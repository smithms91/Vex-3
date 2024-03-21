import HeaderBackButton from '@/components/header-with-back-button'
import ProfileCard from '@/components/profile/profile-card'
import ProfileEditSocials from '@/components/profile/profile-edit-socials'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import { Reorder } from 'framer-motion'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { SocialIcon } from 'react-social-icons'

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
    <main className='max-w-[450px] mx-auto'>
      <HeaderBackButton title="Setup" link="account" />
      {/* <h1>Enable/Disable</h1> */}
      <ProfileCard user={user} options className='px-4' />
      <div className='px-4 mt-6'>
        <h1 className='text-xl mb-2'>Socials</h1>
        <ProfileEditSocials socials={socials} />
        <Link href='/account/setup/add'><Button variant={'link'} className='bg-card-bg-dark text-white w-full py-6 mb-10'>Add Content</Button></Link>
      </div>
    </main>
  )
}

export default SetupPage