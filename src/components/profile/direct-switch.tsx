"use client";

import React from "react";
import { Switch } from "../ui/switch";

type Props = {};

const handleCheckedChange = () => {
  console.log("test");
};

const DirectSwitch = (props: Props) => {
  return (
    <div className="flex items-center justify-center bg-red-500 p-6 m-4 rounded-md">
      <div className="text-white flex justify-between w-full">
        <Switch />
      </div>
    </div>
  );
};

export default DirectSwitch;
