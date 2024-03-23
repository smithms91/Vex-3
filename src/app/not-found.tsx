import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { SparklesCore } from '@/components/sparkles';

type Props = {}

const ErrorPage = (props: Props) => {
  return (
    <main className='min-h-screen max-w-[450px] p-10 gap-y-10 mx-auto flex flex-col items-center justify-center bg-gradient-to-tl from-from to-to text-white'>
      <div className="relative">
        <h1 className="absolute text-xl uppercase z-10 text-white drop-shadow-md blur-md">Vex</h1>
        <h1 className="text-xl uppercase z-10 text-white drop-shadow-md">Vex</h1>
      </div>
      <div className='text-center'>
        <h1 className='text-4xl'>&#x3a;&#x28;</h1>
        <p>Sorry, something went wrong.</p>
      </div>
      <Image src='/baby.jpg' alt='baby' width={500} height={500} />
      <Link href="/" className='bg-white/80 text-black py-4 rounded-lg z-50 cursor-pointer w-full text-center'>
        Go Home
      </Link>
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" />
    </main>
  )
}

export default ErrorPage