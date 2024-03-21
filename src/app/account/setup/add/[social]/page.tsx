import AddSocialForm from '@/components/forms/add-social'
import HeaderBackButton from '@/components/header-with-back-button'
import React from 'react'

type Props = {
  params: {
    social: string
  }
}

const AddSocial = ({ params }: Props) => {
  return (
    <main>
      <HeaderBackButton title={`Add ${params.social.charAt(0).toUpperCase() + params.social.slice(1)}`} link="account/setup/add" />
      <AddSocialForm network={params.social} />
    </main>
  )
}

export default AddSocial