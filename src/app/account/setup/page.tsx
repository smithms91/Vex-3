import React from "react";
import HeaderBackButton from "@/components/header-with-back-button";
import ProfileCard from "@/components/profile/profile-card";
import ProfileEditSocials from "@/components/profile/profile-edit-socials";
import Link from "next/link";
import { SparklesCore } from "@/components/sparkles";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DirectSwitch from "@/components/profile/direct-switch";
import PremiumSection from "@/components/profile/premium-section";
import { Eye } from "lucide-react";

const SetupPage = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  const user = await supabase.from("profiles").select().eq("id", data.user.id);

  if (!user.data) {
    console.log("no user in profiles table");
    redirect("/login?message=Something went wrong. Try logging in again.");
  }

  if (user.data[0].onboarding == false) {
    redirect("/account/onboarding");
  }


  const userData: User = user.data[0];

  return (
    <main className="max-w-[450px] mx-auto min-h-screen">
      <HeaderBackButton title="Setup" link="account" />
      <ProfileCard
        email={data.user.email!}
        options
        className="px-4 relative"
      />
      <DirectSwitch direct={user.data[0].direct} />
      <div className="px-4 relative">
        <ProfileEditSocials socials={userData.socials} />
        <Link href="/account/setup/add">
          <Button className="bg-card-bg-dark text-white w-full py-6 z-50 relative no-underline">
            Add Content
          </Button>
        </Link>
      </div>
      <PremiumSection />
      <div className="px-4 relative pb-6 z-50">
        <Link href="/account">
          <Button className="bg-card-bg-dark w-full relative py-6">Preview Profile <Eye size={18} className="ml-2" /></Button>
        </Link>
      </div>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="max-w-[450px] mx-auto fixed w-full h-full bottom-0 top-0 left-0 right-0 z-0"
        particleColor="#FFFFFF"
      />
    </main>
  );
};

export default SetupPage;
