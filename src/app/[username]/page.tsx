import React from 'react'
import UserCard from './_components/user-card'
import { getUserId, getUserProfile } from '@/queries'
import { User } from '@/types'
import { redirect } from 'next/navigation'
import UserSocials from './_components/user-socials'
import AddContactButton from './_components/user-add-contact'
import PaidFooter from './_components/paid-footer'

type Props = {
  searchParams: {
    username: string
  }
}

const UserProfile = async ({ params }: { params: { username: string } }) => {
  const user: User = await getUserProfile(params.username)
  const authId = await getUserId()

  if (!user) {
    redirect('/')
  }

  if (user.id === authId) {
    redirect('/account')
  }

  if (params.username.includes('-')) {
    redirect(`/${user.username}`)
  }

  return (
    <section className='flex flex-col min-h-screen z-50 w-full'>
      <section className='p-4 sm:p-8'>
        <div className="relative flex items-center justify-center mb-3">
          <h1 className="absolute text-sm uppercase z-10 text-white drop-shadow-md blur-sm">Vex</h1>
          <h1 className="text-sm uppercase z-10 text-white drop-shadow-md">Vex</h1>
        </div>
        <UserCard user={user} />
        <AddContactButton user={user} />
        <UserSocials user={user} />
      </section>
      <PaidFooter />
    </section>
  )
}

export default UserProfile