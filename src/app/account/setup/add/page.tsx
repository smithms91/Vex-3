import HeaderBackButton from '@/components/header-with-back-button'
import RecommendedSocials from '@/components/socials/recommended-socials'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/server'
import { addUserSocial } from '@/queries'
import { ArrowUpDown, Phone, Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { SocialIcon } from 'react-social-icons'

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