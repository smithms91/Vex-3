import HeaderBackButton from '@/components/header-with-back-button'
import RecommendedSocials from '@/components/socials/recommended-socials'
import SocialMedia from '@/components/socials/social-media'
import Payments from '@/components/socials/payments'
import Productivity from '@/components/socials/productivity'
import Music from '@/components/socials/music'
import { Input } from '@/components/ui/input'
import React from 'react'
import Contacts from '@/components/socials/contacts'

type Props = {}

const AddSocialPage = (props: Props) => {

  return (
    <main className=''>
      <HeaderBackButton title="Add Social" link="account/setup" />
      <Input placeholder="Search for content" className='py-6 text-lg rounded-none' />
      <RecommendedSocials />
      <SocialMedia />
      <Contacts />
      <Payments />
      <Productivity />
      <Music />
    </main>
  )
}

export default AddSocialPage