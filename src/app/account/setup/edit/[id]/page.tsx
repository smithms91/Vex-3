import EditSocialForm from '@/components/forms/edit-social'
import HeaderBackButton from '@/components/header-with-back-button'

import React from 'react'

type Props = {
  params: {
    id: string
  }
}



const EditSocialPage = async ({ params }: Props) => {

  return (
    <main className=''>
      <HeaderBackButton title="Edit Social" link="account" />
      <EditSocialForm id={params.id} />
    </main>
  )
}

export default EditSocialPage