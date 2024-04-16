"use client";

import React, { useState } from "react";
import { Reorder } from "framer-motion";
import { useRouter } from "next/navigation";
import { updateUserSocials } from "@/queries";
import { Social } from "@/types";
import { useThemeColor } from "../context/theme-color-provider";
import EditItem from "../edit-item";

type Props = {
  socials: Social[];
};

const ProfileEditSocials = ({ socials }: Props) => {
  const [items, setItems] = useState<Social[]>(socials);
  const { color, setColor } = useThemeColor();

  const handleUpdateItems = async (order: typeof items) => {
    setItems(order);
    try {
      await updateUserSocials(order);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <section className="w-full z-50 mb-4 relative">
      {color != "light" ? (
        <h1 className="text-xl mb-2 text-white/80">Socials</h1>
      ) : (
        <h1 className="text-xl mb-2 text-black">Socials</h1>
      )}
      {items && items.length > 0 && (
        <div className="bg-gradient-to-br from-card-bg-light to-card-bg-dark py-4 px-2">
          <Reorder.Group
            className="flex flex-col gap-y-4 z-50"
            axis="y"
            values={items}
            onReorder={handleUpdateItems}
            layoutScroll
            style={{ overflowY: "scroll" }}
          >
            {items && items.map((item, index) => <EditItem item={item} key={item.id} />)}
          </Reorder.Group>
        </div>
      )}
    </section>
  );
};

export default ProfileEditSocials;
