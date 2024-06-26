import HeaderBackButton from '@/components/header-with-back-button'
import UpdateUsernameForm from '@/components/forms/update-username'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'
import { getThemeColor } from '@/queries'
import { cn } from '@/lib/utils'

type Props = {}

const UpdateUsernamePage = async (props: Props) => {
  const supabase = createClient()
  const themeColor = await getThemeColor();

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  let { data: userData } = await supabase.from('profiles').select('username').eq('id', data.user.id).single();
  console.log('username', userData)

  if (!userData) userData = { username: '' }

  return (
    <section>
      <HeaderBackButton title='Update Username' link='account/settings/user-settings' />
      <div className={cn('text-center space-y-4 p-6 mb-4', themeColor === 'light' ? 'text-black' : 'text-white')}>
        <h1 className='text-sm'>Your current username is:</h1>
        <p className='font-bold inline-block text-lg px-6 py-2 shadow-inner border border-gray-600'>{userData.username}</p>
        <UpdateUsernameForm />
      </div>
    </section>
  )
}

export default UpdateUsernamePage