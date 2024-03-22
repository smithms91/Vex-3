import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

const ChangeEmailPage = async (props: Props) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  console.log('test', data)
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <div>ChangeEmailPage</div>
  )
}

export default ChangeEmailPage