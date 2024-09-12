"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/types";
import React from "react";
import { profileColors } from "@/constants";
import { useUser } from "@/components/context/user-provider";
import { cn } from "@/lib/utils";

type Props = {
};

const AddContactButton = ({ }: Props) => {
  const user = useUser();
  const profileColor = profileColors.find(
    (color) => color.color === user.profile_color,
  )?.single;

  const borderColor = profileColors.find(
    (color) => color.color === user.profile_color,
  )?.lightValue;

  const handleButtonClick = () => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:;${user.first_name} ${user.last_name};;;`,
      `TEL;TYPE=CELL:${user.phone_number}`,
      `EMAIL:${user.email}`,
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${user.first_name}.vcf`;
    link.click();
  };
  return (
    <Button
      className={"w-full py-7 z-50 -my-2 cursor-pointer text-md border-b-2"}
      style={{ backgroundColor: profileColor, borderColor: borderColor }}
      onClick={() => handleButtonClick()}
    >
      Add Contact
    </Button>
  );
};

export default AddContactButton;
