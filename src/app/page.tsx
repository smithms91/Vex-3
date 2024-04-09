import CtaBanner from "@/components/cta-banner";
import { SparklesCore } from "@/components/sparkles";
import { createClient } from "@/lib/supabase/server";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  let user = await supabase.from('profiles').select().eq('id', data.user && data.user.id)
  console.log('user', user)
  if (data) return (
    <div className="bg-gradient-to-tl from-dark-from to-dark-to text-white flex flex-col max-w-[450px] min-h-screen mx-auto">
      <div className="text-center border-b-2 border-gray-500 z-50">
        <Image src="/vexwhite.png" className="mx-auto my-4" width={30} height={30} alt="Vex Card" />
      </div>
      <div className="text-center mt-20 m-8 flex flex-col h-full z-50">
        <h1 className="text-3xl mb-2 font-bold">Welcome Back!</h1>
        <p className="font-thin">Continue to your profile to start networking.</p>
        <div className="mt-10 mb-4">
          <p className="text-left mb-2 font-semibold text-xl">Continue to profile</p>
          <Link href="/account" className="bg-slate-200/20 rounded-md flex p-4 items-center">
            <Image className="rounded-full" src={user.data![0].profile_picture || '/profile.jpg'} alt="Profile Picture" width={50} height={50} />
            <div className="text-left ml-4">
              <h1>{user.data && user.data[0].first_name} {user.data && user.data[0].last_name}</h1>
              <p>{data.user && data.user.email}</p>
            </div>
          </Link>
        </div>
        <Link href="/sign-in"><p className="text-left flex items-center font-extralight text-sm">Log In With Different Account <ArrowRight className="ml-2" size={16} /></p></Link>
        <Link href="/sign-up" className="max-w-[400px] mx-auto bg-dark-to block py-4 rounded-md mt-auto absolute bottom-10 left-8 right-8">Sign Up</Link>
      </div>
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" />
    </div>
  )

  return (
    <main className="min-h-screen max-w-[450px] mx-auto flex flex-col items-center justify-center bg-gradient-to-tl from-dark-from to-dark-to">
      <CtaBanner title="Get your card today!" />
      <div className="h-full">
        <div className="text-center">
          <h2 className="text-sm uppercase z-10 text-white drop-shadow-md tracking-widest">Welcome to</h2>
          <div className="relative">
            {/* <h1 className="absolute text-6xl uppercase z-10 text-white drop-shadow-md blur-md opacity-50">Vex</h1> */}
            {/* <h1 className="text-6xl uppercase z-10 text-white drop-shadow-md">Vex</h1> */}
            <Image src="/vexwhite.png" className="mx-auto my-4" width={100} height={100} alt="Vex Card" />
          </div>
        </div>
        <div className="flex flex-col gap-10 mt-20 z-10">
          <Link href='/sign-in' className="px-10 py-2 rounded-md text-center bg-black text-white drop-shadow-xl cursor-pointer z-10">Sign In</Link>
          <Link href='/sign-up' className="px-10 py-2 rounded-md text-center bg-black text-white drop-shadow-xl cursor-pointer z-10">Sign Up</Link>
        </div>
      </div>
      <p className="absolute bottom-10 left-0 right-0 text-center text-white text-xs"> &copy; Copyright Vex Cards 2024.</p>
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" />
    </main>
  );
}
