import DeleteAccountForm from '@/components/forms/delete-account-form'
import HeaderBackButton from '@/components/header-with-back-button'
import React from 'react'

type Props = {}

const DeleteAccountPage = (props: Props) => {
  return (
    <section>
      <HeaderBackButton title='Delete Account' link='account/settings/user-settings' />
      <DeleteAccountForm />
    </section>
  )
}

export default DeleteAccountPage