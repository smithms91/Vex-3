'use client';

import React, { useState } from 'react'
import Stripe from 'stripe';
import PaidCard from './paid-card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

type Props = {
  userId: string
  userEmail: string
}

const PaidSection = ({ userId, userEmail }: Props) => {
  const router = useRouter();
  const stripe = new Stripe('sk_test_51P6yjqKFsfIA5c2NDwBErKUmPjGIVJ7oNGS260fcAEPgzDVDuWYSvO3CGZbWXT7HsPhReGe4aYdo0Uxtb03Gbbbz00EX9wASe1');

  const [active, setActive] = useState(true)
  const [card, setCard] = useState<"annual" | "monthly">('monthly')

  const handleActiveCard = (type: string) => {
    if (type === "annual") {
      setActive(true)
      setCard("annual")
    }
    if (type === "monthly") {
      setActive(false)
      setCard("monthly")
    }
  }

  const handleStripeCheckout = async () => {
    console.log('clicked')

    if (card === 'annual') {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1PuPQLKFsfIA5c2NKUxh593Q',
            quantity: 1,
          }
        ],
        customer_email: userEmail,
        mode: 'subscription',
        success_url: `https://vex.cards/account?success=true`,
        cancel_url: `https://vex.cards/account?cancelled=true`,
        subscription_data: {
          metadata: {
            "user_id": userId
          }
        }
      });
      console.log(session)
      router.push(session.url!)
    } else {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1P6ytqKFsfIA5c2Nm5XqgXVq',
            quantity: 1,
          }
        ],
        mode: 'subscription',
        customer_email: userEmail,
        success_url: `https://vex.cards/account?success=true`,
        cancel_url: `https://vex.cards/account?cancelled=true`,
        subscription_data: {
          metadata: {
            "user_id": userId
          }
        }
      });
      console.log(session)
      router.push(session.url!)
    }
  }

  return (
    <>
      <div onClick={() => handleActiveCard("annual")}><PaidCard title="Annual" price="$80 year" badge='Save 20% a year' lineThrough='$99/' month="6.67" active={active} save={true} /></div>
      <div onClick={() => handleActiveCard("monthly")}><PaidCard title="Monthly" price="Less than $0.30 per day" badge='Cancel anytime' month="9.99" active={!active} /></div>
      <div className='mt-auto'>
        <Button onClick={() => handleStripeCheckout()} className='w-full mt-4 py-7 bg-blue-500 sticky bottom-10 text-md shadow-md hover:bg-blue-400 active:bg-blue-600'>Upgrade Now</Button>
        <p className='text-center'>Cancel anytime, Plan renews automatically</p>
      </div>
    </>
  )
}

export default PaidSection