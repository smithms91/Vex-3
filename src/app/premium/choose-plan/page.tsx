import { Button } from '@/components/ui/button'
import React from 'react'
import { features } from '@/constants'

type Props = {}

const ChoosePlanPage = (props: Props) => {

  return (
    <section className='flex flex-col items-center mx-auto py-6 px-6'>
      <h1 className='mb-4'>Unlock premium features with <strong>Vex Premium</strong></h1>
      <div className='flex flex-col gap-3 mb-6'>

      </div>
      <Button className='w-full mt-4 py-7 bg-blue-500 sticky bottom-10 text-md shadow-md'>Continue</Button>
    </section>
  )
}

export default ChoosePlanPage