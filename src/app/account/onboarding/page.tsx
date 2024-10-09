import React from 'react'
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { SparklesCore } from '@/components/sparkles';
import OnboardingForm from '@/components/forms/onboarding-form';

type Props = {}

const OnboardingPage = async (props: Props) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  const user = await supabase.from('profiles').select().eq('id', data.user.id)

  if (!user.data) {
    redirect('/login?message=Please login.')
  }

  if (user.data && user.data[0].onboarding == true) {
    redirect('/account')
  }

  // if (user.data && user.data[0].username !== null) {
  //   redirect('/account/onboarding/profile-card')
  // }

  return (
    <main className='min-h-screen text-white max-w-[450px] px-6 text-center flex flex-col items-start justify-center bg-gradient-to-tl from-dark-from to-dark-to'>
      <div className='mb-10 space-y-4 mx-auto'>
        <h1 className='text-start z-10'>Hey, {user.data[0].email}</h1>
        <p className='z-10'>Tell us more about you!</p>
      </div>
      <OnboardingForm user={user.data[0]} />
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" />
    </main>
  )
}

export default OnboardingPage