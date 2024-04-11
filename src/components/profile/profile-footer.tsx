"use client";

import React from "react";
import Image from "next/image";
import { TrendingUp } from "lucide-react";
import StyleThemeModal from "../modals/style-theme-modal";
import { cn } from "@/lib/utils";
import { useThemeColor } from "../context/theme-color-provider";
import { usePreviewMode } from "../context/preview-mode-provider";
import { User } from "@/types";

type Props = {
  user: User;
};

const ProfileFooter = ({ user }: Props) => {
  const { color } = useThemeColor();
  const { preview } = usePreviewMode();

  if (preview) return null;

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 max-w-[450px] mx-auto rounded-t-[26px] h-20 p-4 flex items-center justify-around z-50 shadow-2xl",
        color === "light" ? "bg-gray-200/95" : "bg-gray-800/95",
        color === "black" && "bg-black/95",
      )}
    >
      <div className="flex flex-col items-center">
        <TrendingUp size={22} color={color === "light" ? "black" : "white"} />
        <p
          className={cn(
            "text-xs uppercase",
            color === "light" ? "text-black" : "text-white",
          )}
        >
          Insights
        </p>
      </div>
      <Image
        src={user.profile_picture || "/profile.jpg"}
        className="rounded-full border-2 border-card-bg-light p-1 box-content w-9"
        alt="Profile Picture"
        width={22}
        height={22}
      />
      <StyleThemeModal />
    </footer>
  );
};

export default ProfileFooter;
