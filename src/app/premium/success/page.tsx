import { createClient } from '@/lib/supabase/server'
import { getUserId } from '@/queries'
import { redirect, useSearchParams } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe'

type Props = {
  searchParams: {
    success: string
  }
}

const SuccessPage = async ({ searchParams }: Props) => {

  return (
    <div>{searchParams.success}</div>
  )
}

export default SuccessPage