import HeaderBackButton from '@/components/header-with-back-button'
import RecommendedSocials from '@/components/socials/recommended-socials'
import { Input } from '@/components/ui/input'
import React from 'react'

type Props = {}

const AddSocialPage = (props: Props) => {

  return (
    <main className=''>
      <HeaderBackButton title="Add Social" link="account/setup" />
      <Input placeholder="Search for content" className='py-6 text-lg rounded-none' />
      <RecommendedSocials />
    </main>
  )
}

export default AddSocialPage