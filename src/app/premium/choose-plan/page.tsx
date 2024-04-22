import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import PaidCarousel from './_components/paid-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import PaidCard from './_components/paid-card'
import Stripe from 'stripe';
import { getAuthUserEmail, getUserId } from '@/queries';
import PaidSection from './_components/paid-section'

type Props = {}

const ChoosePlanPage = async (props: Props) => {
  const userId = await getUserId()
  const email = await getAuthUserEmail()

  return (
    <section className='max-w-[450px] px-6 py-6'>
      <PaidCarousel />
      <div className='flex flex-col gap-4 mt-6'>
        <PaidSection userId={userId} userEmail={email!} />
      </div>
    </section>
  )
}

export default ChoosePlanPage