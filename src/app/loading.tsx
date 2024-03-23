// import { SparklesCore } from '@/components/sparkles'
import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <section className="min-h-screen max-w-[450px] mx-auto flex flex-col items-center justify-center bg-gradient-to-tl from-from to-to ">
      <div className="relative">
        <h1 className="text-4xl mb-10 text-white font-bold tracking-widest">VEX</h1>
        <h1 className="absolute top-0 left-0 right-0 text-4xl mb-10 text-white font-bold tracking-widest blur-md opacity-50">VEX</h1>
      </div>
      {/* <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" /> */}
    </section>
  )
}

export default Loading