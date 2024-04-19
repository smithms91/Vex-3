import HeaderBackButton from '@/components/header-with-back-button'
import React from 'react'

type Props = {}

const PremiumFeaturesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='bg-gradient-to-tl from-dark-from to-dark-to text-white flex flex-col max-w-[450px] min-h-screen mx-auto'>
      <header>
        <HeaderBackButton title='Premium Features' link='account/setup' />
      </header>
      {children}
    </main>
  )
}

export default PremiumFeaturesLayout