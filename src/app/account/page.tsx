import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SparklesCore } from "@/components/sparkles";
import EditProfileButton from "@/components/edit-profile-button";
import AccountHeader from "@/components/account-header";
import ProfileFooter from "@/components/profile/profile-footer";
import ProfileCard from "@/components/profile/profile-card";
import ProfileSocials from "@/components/profile/profile-socials";
import PreviewModeProvider from "@/components/context/preview-mode-provider";
import PaidFooter from "../[cardId]/_components/paid-footer";
import { User } from "@/types";

const AccountPage = async () => {
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
  let socials = userData.socials;
  let themeColor = userData.theme_color;

  return (
    <section className="z-50 min-h-screen max-w-[450px]">
      <PreviewModeProvider>
        <div className="p-2 xs:p-4 sm:p-6 max-w-[450px] mx-auto flex flex-col items-center">
          <AccountHeader />
          <ProfileCard email={data.user.email!} user={userData} />
          <EditProfileButton user={userData} />
          <ProfileSocials socials={socials} />
          <ProfileFooter user={userData} />
        </div>
        <PaidFooter darkText={themeColor == "light"} user={userData} />
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="max-w-[450px] mx-auto h-full absolute top-0 left-0 right-0 z-0"
          particleColor={themeColor === "light" ? "#000000" : "#FFFFFF"}
        />
      </PreviewModeProvider>
    </section>
  );
};

export default AccountPage;
