
import React from 'react'
import Image from 'next/image'
import CardSignUpForm from '@/components/forms/card-sign-up-form'

type Props = {
  searchParams: {
    id: string
  }
}

const NewAccountPage = ({ searchParams }: Props) => {
  const { id } = searchParams
  console.log('from here', id)

  return (
    <main className="bg-gradient-to-tl from-dark-from to-dark-to text-white flex flex-col max-w-[450px] min-h-screen mx-auto">
      <div className="text-center border-b-2 border-gray-500 z-50">
        <Image src="/vexwhite.png" className="mx-auto my-4" width={30} height={30} alt="Vex Card" />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-center mt-20 m-8 flex flex-col z-50">
          <h1 className='text-3xl font-bold'>Welcome to VEX.</h1>
          <p className='font-extralight'>Create your account to get started.</p>
        </div>
        <div className='p-10 flex-grow'>
          <CardSignUpForm cardId={id} />
        </div>
      </div>
      <footer>
        <div className="flex justify-center items-center p-4 border-t border-gray-700">
          <Image src="/vexwhite.png" width={20} height={20} alt="Vex Logo" />
          <span className="ml-2 text-sm text-gray-400">© 2024 Vex</span>
        </div>
      </footer>
    </main>
  )
}

export default NewAccountPage