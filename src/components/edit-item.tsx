import { Social } from "@/types";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React from "react";
import MySocialIcon from "./custom-social-icon";
import { cn } from "@/lib/utils";
import { ArrowUpDown, Grip, Pencil } from "lucide-react";
import { useThemeColor } from "./context/theme-color-provider";
import { useRouter } from "next/navigation";
import { useRaisedShadow } from "@/lib/use-raised-shadow";
import { ReorderIcon } from "./icon";
import { EditReorderIcon } from "./edit-icon";

type Props = {
  item: Social;
};

const EditItem = ({ item }: Props) => {
  const { color, setColor } = useThemeColor();
  const router = useRouter();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={item.id}
      value={item}
      className="flex items-center bg-white/80 inset-4 text-black w-full p-2 z-50"
      dragListener={false}
      dragControls={dragControls}
      style={{ boxShadow, y }}
    >
      <EditReorderIcon dragControls={dragControls} />
      <MySocialIcon network={item.network} />
      <div className="ml-4">
        <p className="text-lg">
          {item.title !== ""
            ? item.title
            : item.network.charAt(0).toUpperCase() + item.network.slice(1)}
        </p>
        <p className="text-xs">{item.value}</p>
      </div>
      <Pencil
        onClick={() => router.push(`/account/setup/edit/${item.id}`)}
        size={16}
        color="black"
        className="ml-auto mr-4 cursor-pointer"
      />
    </Reorder.Item>
  );
};

export default EditItem;
