import ProfileCard from '@/components/profile/profile-card'
import { SparklesCore } from '@/components/sparkles'
import { createClient } from '@/lib/supabase/server'
import { User } from '@/types'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const ProfileCardPage = async (props: Props) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  const user = await supabase.from('profiles').select().eq('id', data.user.id)

  if (!user.data) {
    redirect('/login?message=Please login.')
  }

  if (user.data && user.data[0].username == '' || user.data[0].username == null) {
    redirect('/account/onboarding')
  }

  if (user.data && user.data[0].onboarding == true) {
    redirect('/account')
  }

  const userData: User = user.data[0]

  return (
    <div className='min-h-screen max-w-[450px] p-6 flex flex-col items-start justify-center bg-gradient-to-tl from-dark-from to-dark-to'>
      <h1 className='mb-4 text-xl text-card-foreground'>Lets build your profile card, {userData.username}</h1>
      <ProfileCard email={userData.email!} user={userData} options />
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" />
    </div>
  )
}

export default ProfileCardPage