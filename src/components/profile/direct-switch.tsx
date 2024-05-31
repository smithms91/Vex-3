"use client";

import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { updateUserDirect } from "@/queries";
import { toast } from "sonner";
import { useThemeColor } from "../context/theme-color-provider";

type Props = {
  direct: boolean;
};

const DirectSwitch = ({ direct }: Props) => {
  const [checked, setChecked] = useState(direct);
  const { color, setColor } = useThemeColor();

  const handleCheckedChange = async (e: boolean) => {
    setChecked(!checked);
    const response = await updateUserDirect(e);
    if (response) {
      toast(
        "Direct Updated! Users will be directed to the first link in your socials instead of your profile page!",
        { position: "top-center" },
      );
    } else {
      toast(
        "Direct Updated! Users will be directed to your profile page instead of the first link of your socials!",
        { position: "top-center" },
      );
    }
  };

  return color === "light" ? (
    <div className="flex items-center justify-center bg-slate-600/80 p-6 m-4 my-6 rounded-md z-50">
      <div className="text-white flex justify-between w-full z-50">
        <p>Direct Link</p>
        <Switch checked={checked} onCheckedChange={handleCheckedChange} />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center bg-slate-200/20 p-6 m-4 mt-6 rounded-md z-50">
      <div className="text-white flex justify-between w-full z-50">
        <p>Direct Link</p>
        <Switch checked={checked} onCheckedChange={handleCheckedChange} />
      </div>
    </div>
  );
};

export default DirectSwitch;
