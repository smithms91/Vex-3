import React from 'react'
import UserCard from './_components/user-card'
import { getUserId, getUserProfile, lookupCardIdReturnUser, lookupUserOrCard } from '@/queries'
import { redirect } from 'next/navigation'
import UserSocials from './_components/user-socials'
import AddContactButton from './_components/user-add-contact'
import PaidFooter from './_components/paid-footer'
import { cn } from '@/lib/utils'

const UserProfile = async ({ params }: { params: { cardId: string } }) => {
  const user = await lookupUserOrCard(params.cardId)
  const authId = await getUserId()
  let darkText: boolean = false;

  if (!user) {
    redirect('/')
  }

  if (user.id === authId) {
    redirect('/account')
  }

  // Eventually have to check to see if user is created if this matches a card ID.
  if (params.cardId.includes('-')) {
    redirect(`/${user.username}`)
  }

  if (user.direct) redirect(`${user.socials[0].url}${user.socials[0].value}`)

  if (user && user.theme_color === 'light') {
    darkText = true;
  }

  return (
    <section className='flex flex-col min-h-screen z-50 w-full'>
      <section className='p-4 sm:p-8'>
        <div className="relative flex items-center justify-center mb-3">
          <h1 className={cn(`absolute text-sm uppercase z-10 drop-shadow-md blur-sm`, user.theme_color === 'light' ? 'text-black' : 'text-white')}>Vex</h1>
          <h1 className={cn(`text-sm uppercase z-10 drop-shadow-md`, user.theme_color === 'light' ? 'text-black' : 'text-white')}>Vex</h1>
        </div>
        <UserCard user={user} />
        <AddContactButton user={user} />
        <UserSocials user={user} darkText={darkText} />
      </section>
      <PaidFooter darkText={darkText} user={user} />
    </section>
  )
}

export default UserProfile
