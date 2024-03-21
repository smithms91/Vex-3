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
      <HeaderBackButton title={`Add ${params.social}`} link="account/setup/add" />
    </main>
  )
}

export default AddSocial