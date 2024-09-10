"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/types";
import React from "react";
import { profileColors } from "@/constants";

type Props = {
  user: User;
};

const AddContactButton = ({ user }: Props) => {
  const profileColor = profileColors.find(
    (color) => color.color === user.profile_color,
  )?.singleValue;

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
      className="w-full py-7 z-50 -my-2 border-b-2 border-card-bg-light cursor-pointer text-md bg-card-bg-dark hover:bg-card-bg-light"
      style={{ backgroundColor: profileColor }}
      onClick={() => handleButtonClick()}
    >
      Add Contact
    </Button>
  );
};

export default AddContactButton;
