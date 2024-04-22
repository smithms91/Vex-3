import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  title: string
  price: string
  badge: string
  lineThrough?: string
  month: string
  active: boolean
  save?: boolean
}

const PaidCard = ({ title, price, badge, lineThrough, month, active, save }: Props) => {
  return (
    <section className={cn('w-full bg-slate-600/50 rounded-md flex justify-between px-6 py-4 border-2 border-transparent relative', active && 'border-2 border-blue-500')}>
      {active && save && <span className='absolute bg-blue-500 rounded-lg px-4 py-1 text-xs -top-[.85rem] left-4'>Save 20%</span>}
      <div className='flex flex-col items-start'>
        <h1 className='text-lg'>{title}</h1>
        <p className='text-sm opacity-80'>{lineThrough && <span className='line-through'>{lineThrough}</span>}{price}</p>
        <Badge className='mt-2'>{badge}</Badge>
      </div>
      <div>
        <p className='text-lg font-bold'>${month} <small>/month</small></p>
      </div>
    </section>
  )
}

export default PaidCard