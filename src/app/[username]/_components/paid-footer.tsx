import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  darkText: boolean
}

const PaidFooter = ({ darkText }: Props) => {
  return (
    <footer className='z-50 mt-auto border-t-2 border-slate-600/25 bg-[#12223f]/20 text-white max-w-[450px] w-full p-4 text-center mx-auto'>
      <h1 className='text-2xl'>VEX</h1>
      <p className='text-xs mb-1'>The Future of Business Cards</p>
      <Link className='text-xs flex items-center justify-center underline' href="/">Learn More <ArrowRight size={12} className='mt-[.15rem]' /></Link>
    </footer>
  )
}

export default PaidFooter