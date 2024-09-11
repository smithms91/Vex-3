import React from 'react'
import UserCard from './_components/user-card'
import UserSocials from './_components/user-socials'
import AddContactButton from './_components/user-add-contact'
import PaidFooter from './_components/paid-footer'
import VexLogo from './_components/vex-logo'

const UserProfile = async ({ params }: { params: { cardId: string } }) => {

  return (
    <section className='flex flex-col min-h-screen w-full'>
      <section className='p-4 sm:p-8 z-50 mb-[100px]'>
        <VexLogo />
        <UserCard />
        <AddContactButton />
        <UserSocials />
      </section>
      <PaidFooter />
    </section>
  )
}

export default UserProfile
