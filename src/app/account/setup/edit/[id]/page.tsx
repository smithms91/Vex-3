import EditSocialForm from '@/components/forms/edit-social'
import HeaderBackButton from '@/components/header-with-back-button'
import { SparklesCore } from '@/components/sparkles'
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
    <main className='max-w-[450px] min-h-screen mx-auto bg-gradient-to-tl from-from to-to'>
      <HeaderBackButton title="Edit Social" link="account" />
      <EditSocialForm social={social} />
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="max-w-[450px] mx-auto fixed w-full h-full bottom-0 top-0 left-0 right-0 z-0"
        particleColor="#FFFFFF"
      />
    </main>
  )
}

export default EditSocialPage