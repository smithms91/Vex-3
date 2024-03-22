import UpdatePasswordForm from '@/components/forms/update-password'
import HeaderBackButton from '@/components/header-with-back-button'
import React from 'react'

type Props = {}

const UpdatePasswordPage = (props: Props) => {
  return (
    <section className=''>
      <HeaderBackButton title='Update Password' link='account/settings/user-settings' />
      <UpdatePasswordForm />
    </section>
  )
}

export default UpdatePasswordPage