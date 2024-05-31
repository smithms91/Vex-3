"use client";

import { AddSocialSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addUserSocial } from "@/queries";
import { ClipboardPaste, Info, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomSocialIcon from "../custom-social-icon";
import { allSocials } from "@/constants";
import { useThemeColor } from "../context/theme-color-provider";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  network: string;
};

const AddSocialForm = ({ network }: Props) => {
  const [showTitle, setShowTitle] = useState(false);
  const { color } = useThemeColor();
  const router = useRouter();

  const url = allSocials.find((constant) => constant.network === network)?.href;
  const social = allSocials.find((constant) => constant.network === network);
  const name = allSocials.find((constant) => constant.network === network)?.title;
  const tooltip = allSocials.find((constant) => constant.network === social?.network)?.tooltip;

  const form = useForm<z.infer<typeof AddSocialSchema>>({
    resolver: zodResolver(AddSocialSchema),
    defaultValues: {
      value: "",
      name: name,
      title: "",
      network: network,
      url: url,
    },
  });

  async function onSubmit(values: z.infer<typeof AddSocialSchema>) {
    try {
      values = { ...values, url: url! };
      await addUserSocial(values);
      toast("Social updated!", { position: "top-center" });
    } catch (error) {
      console.log("error", error);
    }
    router.push("/account/setup");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 z-10 max-w-[450px] p-6"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  "text-lg flex items-center justify-between",
                  color === "light" ? "text-black" : "text-white",
                )}
              >
                <div className="flex items-center">
                  <CustomSocialIcon edit="true" size="16" network={network} />
                  <p className="ml-2">
                    {network.charAt(0).toUpperCase() + network.slice(1)}
                  </p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        fill={color === "light" ? "white" : "black"}
                        size={20}
                        className="cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent align="end" className="text-xs whitespace-pre-wrap overflow-hidden w-80">
                      {tooltip}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormLabel>
              <FormControl>
                <Input
                  className="placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6"
                  placeholder="VexTheBest"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button
            type="button"
            className={cn("w-[45%] py-6 text-md active:bg-black hover:bg-card-bg-dark", color === "black" ? "drop-shadow-glow bg-black" : "bg-black")}>
            Paste
            <ClipboardPaste size={14} className="ml-2" />
          </Button>
          <Button
            className="bg-card-bg-dark w-[45%] py-6 text-md">
            Test
          </Button>
        </div>
        {!showTitle && (
          <Button
            className={cn("w-full text-white text-md py-6", color === "black" ? "drop-shadow-glow bg-black" : "bg-black")}
            onClick={() => setShowTitle(true)}
          >
            <Plus size={14} className="mt-[.15rem] mr-1" />
            Add Title
          </Button>
        )}
        {showTitle && (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn("text-lg shadow-sm", color == "light" ? "text-black" : "text-white")}>
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-black placeholder:text-black/50 bg-[#e8f0fe] border border-white/50 py-6"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-black drop-shadow-glow text-md"
              onClick={() => setShowTitle(false)}
            >
              Close Title
            </Button>
          </>
        )}
        <Button
          type="submit"
          className="bg-card-bg-dark hover:bg-black/50 fixed max-w-[400px] py-6 bottom-20 left-6 right-6 mx-auto text-md"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AddSocialForm;
