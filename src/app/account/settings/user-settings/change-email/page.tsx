import UpdateEmailForm from '@/components/forms/update-email'
import HeaderBackButton from '@/components/header-with-back-button'
import { createClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'
import { getThemeColor } from '@/queries'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const ChangeEmailPage = async (props: Props) => {
  const supabase = createClient()
  const themeColor = await getThemeColor();

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <section className='max-w-[450px]'>
      <HeaderBackButton title='Change Email' link='account/settings/user-settings' />
      <div className={cn('text-center space-y-4 p-6 mb-4', themeColor === 'light' ? 'text-black' : 'text-white')}>
        <h1 className='text-sm'>Your current email is:</h1>
        <p className='font-bold inline-block text-lg px-6 py-2 shadow-inner border border-gray-600'>{data.user.email}</p>
        <UpdateEmailForm />
      </div>
    </section>
  )
}

export default ChangeEmailPage