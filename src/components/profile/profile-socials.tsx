"use client";

import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { ArrowRight, Eye, Pencil } from "lucide-react";
import { updateUserSocials } from "@/queries";
import { toast } from "sonner";
import { Social } from "@/types";
import { useThemeColor } from "../context/theme-color-provider";
import { cn } from "@/lib/utils";
import { usePreviewMode } from "../context/preview-mode-provider";
import Link from "next/link";
import Item from "../item";
import CustomSocialIcon from "../custom-social-icon";

type Props = { socials: Social[]; };

const ProfileSocials = ({ socials }: Props) => {
  const [items, setItems] = useState<Social[]>(socials);
  const { preview, setPreview } = usePreviewMode();
  const { color, setColor } = useThemeColor();

  const handleUpdateItems = async (order: typeof items) => {
    if (JSON.stringify(order) !== JSON.stringify(items)) { setItems(order); }
    try { await updateUserSocials(order); } catch (error) { console.log("error", error); }
    console.log("order", order);
  };

  if (preview) {
    return (
      <section className="w-full mt-6 z-50 mb-24">
        {items && items.length > 0 && (
          <div className="flex flex-col gap-y-2 z-50">
            <div className="flex items-center gap-y-0 relative">
              <h1 className={cn(`text-xl`, color === "light" ? "text-black" : "text-white")}>Socials</h1>
              <p onClick={() => { console.log("test"); toast("You are in edit mode! Click again to go back to preview mode.", { position: "top-center" }); setPreview(!preview); }} className={cn("flex items-center cursor-pointer gap-x-1 text-white text-xs bottom-0 right-0 underline opacity-80 hover:text-card-bg-light absolute", color === "light" ? "text-black" : "text-white")}><Pencil size="14" className="mt-[.08rem]" />Edit Mode</p>
            </div>
            {items && items.map((social, index) => (
              <Link key={social.id} className={cn("flex items-center bg-slate-600/50 text-white w-full p-2 z-50 cursor-pointer rounded-md", color === "light" || color === "dark" ? "bg-slate-600/50" : "bg-gray-200/20")} href={`${social.url}${social.value}`}>
                <CustomSocialIcon network={social.network} />
                <div className="ml-4">
                  <p className={cn("text-lg", color === "light" ? "text-black" : "text-white")}>{social.title !== "" ? social.title : social.network.charAt(0).toUpperCase() + social.network.slice(1)}</p>
                  <p className={cn("text-sm", color === "light" ? "text-black" : "text-white")}>{social.value}</p>
                </div>
                <ArrowRight size={16} color={color == "light" ? "#000000" : "#FFFFFF"} className="ml-auto mr-4 cursor-grab active:cursor-grabbing" />
              </Link>
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="w-full mt-6 z-50 mb-20">
      {items && items.length > 0 && (
        <Reorder.Group as="div" className="flex flex-col gap-y-2 z-50" axis="y" values={items} layoutScroll onReorder={handleUpdateItems} style={{ overflowY: "scroll" }}>
          <div className="flex items-center gap-y-0 relative">
            <h1 className={cn(`text-xl`, color === "light" ? "text-black" : "text-white")}>Socials</h1>
            <p onClick={() => { console.log("test"); toast("You are in preview mode! Click again to go back to edit mode.", { position: "top-center" }); setPreview(!preview); }} className={cn("flex items-center gap-x-1 text-white text-xs bottom-0 right-0 underline opacity-80 hover:text-card-bg-light absolute cursor-pointer", color === "light" ? "text-black" : "text-white")}><Eye size={16} className="mt-[.12rem]" />Preview Profile</p>
          </div>
          {items.map((item, index) => (<Item item={item} key={item.id} />))}
        </Reorder.Group>
      )}
    </section>
  );
};

export default ProfileSocials;