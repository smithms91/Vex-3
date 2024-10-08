"use client";

import { QrCode, UserRoundCog, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import QRCode from "react-qr-code";
import { getProfilePicture, getUserId } from "@/queries";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useThemeColor } from "./context/theme-color-provider";
import { cn } from "@/lib/utils";
import { usePreviewMode } from "./context/preview-mode-provider";


const AccountHeader = ({ cardId }: { cardId: string | null }) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [userID, setUserID] = useState("");
  const themeColor = useThemeColor();
  const { preview, } = usePreviewMode();

  useEffect(() => {
    async function fetchPicture() {
      const pic = await getProfilePicture();
      setProfilePicture(pic);
      const id = await getUserId();
      setUserID(id);
    }
    fetchPicture();
  }, []);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(`https://vex.cards/${cardId}`);
      toast("Copied to clipboard!", { position: "top-center" });
    } catch (error) {
      toast("Error copying to clipboard! " + error, { position: "top-center" });
    }
  };

  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vex Cards",
          text: "Check out this Vex Card!",
          url: `https://vex.cards/${cardId}`,
        });
        toast("Content shared!", { position: "top-center" });
      } catch (error) {
        toast("Error sharing content! " + error, { position: "top-center" });
      }
    } else {
      toast("Web Share API not supported in your browser.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-between w-full z-10">
      {!preview && (
        <div
          onClick={() => router.push("/account/settings")}
          className={cn(
            `z-50 flex items-center justify-center shadow-md drop-shadow-sm rounded-full p-2 box-content cursor-pointer`,
            themeColor["color"] === "light"
              ? "bg-slate-200/15"
              : "bg-gray-200/10",
          )}
        >
          <UserRoundCog
            className="cursor-pointer"
            size={20}
            color={themeColor["color"] === "light" ? "black" : "white"}
          />
        </div>
      )}

      <div
        className={cn(
          `relative`,
          themeColor["color"] === "light" ? "text-black" : "text-white",
          preview && "text-center mx-auto -my-2 -mb-4",
        )}
      >
        <h1 className="absolute text-2xl uppercase z-10 drop-shadow-md blur-md opacity-50">
          Vex
        </h1>
        <h1 className="text-2xl uppercase z-10 drop-shadow-md">Vex</h1>
      </div>
      <Drawer>
        {!preview && (
          <div
            onClick={() => setModalOpen(!modalOpen)}
            className={cn(
              "flex items-center justify-center shadow-md drop-shadow-sm rounded-full p-2 box-content cursor-pointer",
              themeColor["color"] === "light"
                ? "bg-slate-200/15"
                : "bg-gray-200/10",
            )}
          >
            <DrawerTrigger>
              <QrCode
                size={20}
                color={themeColor["color"] === "light" ? "black" : "white"}
              />
            </DrawerTrigger>
          </div>
        )}
        <DrawerContent className={cn(
          "px-10 max-w-[450px] mx-auto h-auto border-0",
          themeColor.color === "light" ? "bg-white" :
            themeColor.color === "dark" ? "bg-gray-800 text-white" :
              themeColor.color === "black" ? "bg-black text-white" : ""
        )}>
          <DrawerClose className={cn("ml-auto shadow-lg p-1 box-content rounded-full", themeColor.color === "light" ? "border border-black" : "border border-white")}>
            <X />
          </DrawerClose>
          <h1 className="mb-2 text-center text-2xl">Copy or Share</h1>
          <div className="relative px-4 pt-4 max-w-[300px] mx-auto w-[250px] bg-gray-100 border-2 shadow-inner">
            <QRCode
              style={{ height: "auto", width: "200px", margin: "0 auto" }}
              value={`https://vex.cards/${userID}`}
              viewBox={`0 0 256 256`}
            />
            <Image
              src={profilePicture || "/profile.jpg"}
              className="rounded-lg absolute top-[36%] left-[40%] border-4 border-black"
              alt="Profile Picture"
              width={52}
              height={52}
            />
            <div className="relative mx-auto my-2 tracking-widest text-center opacity-75">
              <h1 className="absolute text-xs uppercase z-10 text-black drop-shadow-md blur-md opacity-25">
                Vex
              </h1>
              <h1 className="text-xs uppercase z-10 text-black/75 drop-shadow-md  opacity-75">
                Vex
              </h1>
            </div>
          </div>
          <div className="w-full flex items-center justify-between my-8">
            <Button
              onClick={() => handleCopyClick()}
              className={cn(
                "text-white py-6 px-10",
                themeColor.color === "light" ? "bg-black/10 text-black" :
                  themeColor.color === "dark" ? "bg-black/50" :
                    themeColor.color === "black" ? "bg-white/10 border" : ""
              )}
            >
              Copy Code
            </Button>
            <Button
              onClick={() => handleShareClick()}
              className={cn(
                "text-white py-6 px-10",
                themeColor.color === "light" ? "bg-black/10 text-black" :
                  themeColor.color === "dark" ? "bg-black/50" :
                    themeColor.color === "black" ? "bg-white/10 border" : ""
              )}
            >
              Share
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AccountHeader;
