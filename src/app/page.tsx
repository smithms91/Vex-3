import CtaBanner from "@/components/cta-banner";
import { SparklesCore } from "@/components/sparkles";
import Link from "next/link";

export default async function Home() {

  return (
    <main className="min-h-screen max-w-[450px] mx-auto flex flex-col items-center justify-center bg-gradient-to-tl from-from to-to ">
      <CtaBanner title="Get your card today!" />
      <div className="h-full">
        <div className="text-center">
          <h2 className="text-sm uppercase z-10 text-white drop-shadow-md tracking-widest">Welcome to</h2>
          <div className="relative">
            <h1 className="absolute text-6xl uppercase z-10 text-white drop-shadow-md blur-md opacity-50">Vex</h1>
            <h1 className="text-6xl uppercase z-10 text-white drop-shadow-md">Vex</h1>
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
