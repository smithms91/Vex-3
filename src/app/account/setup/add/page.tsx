'use client';

import HeaderBackButton from '@/components/header-with-back-button'
import RecommendedSocials from '@/components/socials/recommended-socials'
import SearchResults from '@/components/socials/search-results';
import SocialMedia from '@/components/socials/social-media'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

type Props = {}

const AddSocialPage = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value)
  }

  return (
    <main className=''>
      <HeaderBackButton title="Add Social" link="account/setup" />
      <Input placeholder="Search for content" className='py-6 text-lg rounded-none' value={searchTerm} onChange={handleSearch} />
      {searchTerm ? (
        <SearchResults searchTerm={searchTerm} />
      ) : (
        <>
          <RecommendedSocials />
          <SocialMedia type="contact" title="Contact Info" />
          <SocialMedia type="social" title="Social Links" />
          <SocialMedia type="productivity" title="Productivity Links" />
          <SocialMedia type="payment" title="Payment Links" />
          <SocialMedia type="music" title="Music Links" />
        </>
      )}
    </main>
  )
}

export default AddSocialPage