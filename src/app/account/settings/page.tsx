import HeaderBackButton from '@/components/header-with-back-button';
import { Button } from '@/components/ui/button'
import { signOut } from '@/queries'
import { ArrowLeft } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const AccountSettingsPage = (props: Props) => {
  return (
    <main className='max-w-[450px] mx-auto'>
      <HeaderBackButton title='Account Settings' link='account' />
      <form className='z-10'>
        <Button formAction={signOut} variant="destructive" >Sign Out</Button>
      </form>
    </main>
  )
}

export default AccountSettingsPage