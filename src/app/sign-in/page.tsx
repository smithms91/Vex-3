import SignInForm from "@/components/forms/sign-in-form";
import { SparklesCore } from "@/components/sparkles";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { message: string, error: string };
}) {
  const supabase = createClient()
  console.log('supabase', searchParams)
  const { data, error } = await supabase.auth.getUser()

  if (data?.user) {
    const user = await supabase.from('profiles').select().eq('id', data.user.id)
    if (user.data && user.data[0].username == null) {
      redirect('/account/onboarding')
    } else if (user.data && user.data[0].username !== null) {
      redirect('/account')
    }
  }

  return (
    <section className="min-h-screen max-w-[450px] mx-auto flex flex-col items-center justify-center bg-gradient-to-tl from-from to-to ">
      <div className="relative">
        <h1 className="text-4xl mb-10 text-white font-bold tracking-widest">VEX</h1>
        <h1 className="absolute top-0 left-0 right-0 text-4xl mb-10 text-white font-bold tracking-widest blur-md opacity-50">VEX</h1>
      </div>
      <SignInForm />
      <p className="text-white z-10 mt-4">{searchParams.message}</p>
      <Link href='/sign-up' className="absolute bottom-10 text-white z-10">Sign Up</Link>
      <SparklesCore id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute top-0 left-0 z-0"
        particleColor="#FFFFFF" />
    </section>
  );
}