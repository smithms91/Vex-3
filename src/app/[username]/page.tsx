import React from 'react'
import UserCard from './_components/user-card'
import { getUserId, getUserProfile } from '@/queries'
import { User } from '@/types'
import { redirect } from 'next/navigation'
import UserSocials from './_components/user-socials'
import AddContactButton from './_components/user-add-contact'
import PaidFooter from './_components/paid-footer'
import { cn } from '@/lib/utils'

type Props = {
  searchParams: {
    username: string
  }
}

const UserProfile = async ({ params }: { params: { username: string } }) => {
  const user: User = await getUserProfile(params.username)
  const authId = await getUserId()
  let userColor: string;
  let darkText: boolean = false;

  if (!user) {
    redirect('/')
  }

  if (user.id === authId) {
    redirect('/account')
  }

  if (params.username.includes('-')) {
    redirect(`/${user.username}`)
  }

  if (user && user.theme_color === 'black') {
    userColor = 'bg-gradient-to-tl from-black-from to-black-to';
  } else if (user && user.theme_color === 'dark') {
    userColor = 'bg-gradient-to-tl from-dark-from to-dark-to';
  } else {
    userColor = 'bg-gradient-to-tl from-light-from to-light-to';
    darkText = true;
  }

  return (
    <section className='flex flex-col min-h-screen z-50 w-full'>
      <section className='p-4 sm:p-8'>
        <div className="relative flex items-center justify-center mb-3">
          <h1 className={cn(`absolute text-sm uppercase z-10 drop-shadow-md blur-sm`, darkText ? 'text-black' : 'text-white')}>Vex</h1>
          <h1 className={cn(`text-sm uppercase z-10 drop-shadow-md`, darkText ? 'text-black' : 'text-white')}>Vex</h1>
        </div>
        <UserCard user={user} />
        <AddContactButton user={user} />
        <UserSocials user={user} darkText={darkText} />
      </section>
      <PaidFooter darkText={darkText} />
    </section>
  )
}

export default UserProfile