"use client";

import { usePreviewMode } from "@/components/context/preview-mode-provider";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'
import Image from "next/image";
import { useUser } from "@/components/context/user-provider";

type Props = {
};

const PaidFooter = ({ }: Props) => {
  const user = useUser();

  let darkText: boolean = false;

  if (user && user.theme_color === 'light') {
    darkText = true;
  }

  const { preview } = usePreviewMode();
  const pathName = usePathname();

  if (!user) {
    return null;
  }

  let bgColor: string = '';
  if (user.theme_color === 'light') bgColor = 'bg-gradient-to-tl from-light-from to-light-to'
  if (user.theme_color === 'dark') bgColor = 'bg-gradient-to-tl from-dark-from to-dark-to'
  if (user.theme_color === 'black') bgColor = 'bg-gradient-to-tl from-black-from to-black-to'

  if (preview && pathName === "/account") {
    if (user.vex_branding) {
      return (
        <footer className={cn("z-50 border-t-2 border-slate-600/25 text-white max-w-[450px] w-full p-4 text-center mx-auto fixed bottom-0 opacity-95", bgColor)}>
          <h1 className={cn("text-2xl", darkText ? "text-black" : "text-white")}>VEX</h1>
          <p className={cn("text-xs mb-1 text-white", darkText ? "text-black" : "text-white",)}>The Future of Business Cards</p>
          <Link className={cn("text-xs flex items-center justify-center underline", darkText ? "text-black" : "text-white")} href="/">Learn More <ArrowRight size={12} className="mt-[.15rem]" /></Link>
        </footer>
      );
    } else {
      if (user.profile_picture) {
        return (
          <footer className={cn("z-50 border-t-2 border-slate-600/25 bg-black/10 text-white max-w-[450px] w-full p-4 text-center mx-auto fixed bottom-0")}>
            <Image src={user.profile_picture} width="50" height="50" alt="Branding Logo" className="rounded-md mx-auto" />
          </footer>
        );
      } else {
        return null;
      }
    }
  }

  if (user.vex_branding && pathName !== "/account") {
    return (
      <footer className={cn("z-50 border-t-2 border-slate-600/25 text-white max-w-[450px] w-full p-4 text-center mx-auto fixed bottom-0 opacity-95", bgColor)}>
        <h1 className={cn("text-2xl", darkText ? "text-black" : "text-white")}>VEX</h1>
        <p className={cn("text-xs mb-1 text-white", darkText ? "text-black" : "text-white",)}>The Future of Business Cards</p>
        <Link className={cn("text-xs underline inline", darkText ? "text-black" : "text-white")} href="/">Learn More <ArrowRight size={12} className="inline" /></Link>
      </footer>
    );
  } else {
    if (user.branding_logo) {
      return (
        <footer className={cn("z-50 border-t-2 border-slate-600/25 bg-black/10 text-white max-w-[450px] w-full p-4 text-center mx-auto fixed bottom-0")}>
          <Image src={user.profile_picture} width="50" height="50" alt="Branding Logo" className="rounded-md" />
        </footer>
      );
    } else {
      return null;
    }
  }
};

export default PaidFooter;
