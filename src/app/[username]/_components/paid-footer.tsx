import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const PaidFooter = (props: Props) => {
  return (
    <footer className='z-50 border-t-2 border-slate-600/25 bg-black/10 text-white max-w-[450px] w-full absolute bottom-0 left-0 right-0 p-4 text-center opacity-50 mx-auto'>
      <h1 className='text-2xl'>VEX</h1>
      <p className='text-xs mb-1'>The Future of Business Cards</p>
      <Link className='text-xs flex items-center justify-center underline' href="/">Learn More <ArrowRight size={12} className='mt-[.15rem]' /></Link>
    </footer>
  )
}

export default PaidFooter