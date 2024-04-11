"use client";

import { usePreviewMode } from "@/components/context/preview-mode-provider";
import { useThemeColor } from "@/components/context/theme-color-provider";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  darkText?: boolean;
};

const PaidFooter = ({ darkText }: Props) => {
  const { preview, setPreview } = usePreviewMode();
  const { color, setColor } = useThemeColor();

  if (!preview) return null;

  return (
    <footer className="z-50 mt-auto border-t-2 border-slate-600/25 bg-[#12223f]/20 text-white max-w-[450px] w-full p-4 text-center mx-auto">
      <h1
        className={cn(
          "text-2xl",
          color == "light" ? "text-black" : "text-white",
        )}
      >
        VEX
      </h1>
      <p
        className={cn(
          "text-xs mb-1 text-black",
          color == "light" ? "text-black" : "text-white",
        )}
      >
        The Future of Business Cards
      </p>
      <Link
        className={cn(
          "text-xs flex items-center justify-center underline",
          color == "light" ? "text-black" : "text-white",
        )}
        href="/"
      >
        Learn More <ArrowRight size={12} className="mt-[.15rem]" />
      </Link>
    </footer>
  );
};

export default PaidFooter;
