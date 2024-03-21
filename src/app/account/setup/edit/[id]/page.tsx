import EditSocialForm from '@/components/forms/edit-social'
import HeaderBackButton from '@/components/header-with-back-button'
import { getUserSocial } from '@/queries'

import React from 'react'

type Props = {
  params: {
    id: string
  }
}



const EditSocialPage = async ({ params }: Props) => {
  const social = await getUserSocial(params.id)

  if (!social) return null

  return (
    <main className=''>
      <HeaderBackButton title="Edit Social" link="account" />
      <EditSocialForm social={social} />
    </main>
  )
}

export default EditSocialPage