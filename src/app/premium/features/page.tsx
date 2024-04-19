'use client';

import { Button } from '@/components/ui/button'
import React from 'react'
import PremiumFeature from './_components/premium-feature'
import { features } from '@/constants'
import { useRouter } from 'next/navigation';

type Props = {}

const PremiumFeaturesPage = (props: Props) => {
  const router = useRouter();
  return (
    <section className='flex flex-col items-center mx-auto py-6 px-6'>
      <h1 className='mb-4'>Unlock premium features with <strong>Vex Premium</strong></h1>
      <div className='flex flex-col gap-3 mb-6'>
        {features.map((feature, index) => (
          <PremiumFeature key={index} title={feature.title} subTitle={feature.subTitle} icon={feature.icon} image={feature.image} />
        ))}
      </div>
      <Button onClick={() => router.push('/premium/choose-plan')} className='w-full mt-4 py-7 bg-blue-500 hover:bg-blue-500/90 hover:shadow-md active:bg-blue-600 sticky bottom-10 text-md shadow-md'>Continue</Button>
    </section>
  )
}

export default PremiumFeaturesPage