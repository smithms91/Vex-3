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

  const premiumOptions = [
    { title: "Annual", price: "$96 year", badge: "1 Week Free Trial", lineThrough: "$120/", month: "8" },
    { title: "Monthly", price: "Less than $0.30 per day", badge: "1 Week Free Trial", month: "10" }
  ]

  const handleActiveCard = (type: string) => {
    if (type === "annual") {
      setActive(true)
      setCard("annual")
      console.log(premiumOptions[0])
    }
    if (type === "monthly") {
      setActive(false)
      setCard("monthly")
      console.log(premiumOptions[1])
    }
  }

  const handleStripeCheckout = async () => {
    console.log('clicked')

    if (card === 'annual') {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1P6ytqKFsfIA5c2Nm5XqgXVq',
            quantity: 1,
          }
        ],
        customer_email: userEmail,
        mode: 'subscription',
        success_url: `http://localhost:3000/premium/success?success=true`,
        cancel_url: `http://localhost:3000/premium/cancel?canceled=true`,
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
        success_url: `http://localhost:3000/?success=true`,
        cancel_url: `http://localhost:3000/?canceled=true`,
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
      <div onClick={() => handleActiveCard("annual")}><PaidCard title="Annual" price=" $96 year" badge='1 Week Free Trial' lineThrough='$120/' month="8" active={active} save={true} /></div>
      <div onClick={() => handleActiveCard("monthly")}><PaidCard title="Monthly" price="Less than $0.30 per day" badge='1 Week Free Trial' month="10" active={!active} /></div>
      <div className='mt-auto'>
        <Button onClick={() => handleStripeCheckout()} className='w-full mt-4 py-7 bg-blue-500 sticky bottom-10 text-md shadow-md hover:bg-blue-400 active:bg-blue-600'>Start Free Trial</Button>
        <p className='text-center'>Cancel anytime, Plan renews automatically</p>
      </div>
    </>
  )
}

export default PaidSection