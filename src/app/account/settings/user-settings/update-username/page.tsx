import HeaderBackButton from '@/components/header-with-back-button'
import UpdateUsernameForm from '@/components/forms/update-username'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const UpdateUsernamePage = async (props: Props) => {
  const supabase = createClient()

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
      <UpdateUsernameForm username={userData.username} />
    </section>
  )
}

export default UpdateUsernamePage