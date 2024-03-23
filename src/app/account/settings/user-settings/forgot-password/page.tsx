import ForgotPasswordForm from '@/components/forms/forgot-password'
import HeaderBackButton from '@/components/header-with-back-button'
import { SparklesCore } from '@/components/sparkles'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  searchParams: {
    code?: string
    error?: string
    error_code?: string
    error_description?: string
  }
}

const ForgotPasswordPage = ({ searchParams }: Props) => {

  if (!searchParams.code && !searchParams.error) {
    redirect('/');
  };

  if (searchParams.code) {
    return (
      <section className=''>
        <HeaderBackButton title='Update Password' link='account/settings/user-settings' />
        <ForgotPasswordForm />
      </section>
    )
  }

  if (searchParams.error) {
    return (
      <section className='min-h-screen max-w-[450px] p-6 flex flex-col items-center justify-center gap-y-6 bg-gradient-to-tl from-from to-to text-white'>
        <h1 className='text-center text-2xl font-bold'>Error: {searchParams.error_description}</h1>
        <Link href='/' className='bg-black/80 px-6 py-2 z-50 text-white'>Go Home</Link>
        <SparklesCore id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full absolute top-0 left-0 z-0"
          particleColor="#FFFFFF" />
      </section>
    )
  }
}

export default ForgotPasswordPage