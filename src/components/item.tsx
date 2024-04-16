import { Social } from '@/types';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import React from 'react'
import CustomSocialIcon from './custom-social-icon';
import { cn } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useThemeColor } from './context/theme-color-provider';
import { useRouter } from 'next/navigation';
import { useRaisedShadow } from '@/lib/use-raised-shadow';
import { ReorderIcon } from './icon';

type Props = {
  item: Social;
}

const Item = ({ item }: Props) => {
  const { color, setColor } = useThemeColor();
  const router = useRouter();
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="div"
      key={item.id}
      value={item}
      className={cn(
        "flex items-center text-white w-full p-2 z-50 cursor-pointer rounded-md touch-none",
        color === "light" || color === "dark"
          ? "bg-slate-600/50"
          : "bg-gray-200/20",
      )}
      dragListener={false}
      dragControls={dragControls}
    >

      <div className="flex items-center mr-auto" onClick={() => router.push(`/account/setup/edit/${item.id}`)}>
        <CustomSocialIcon network={item.network} />
        <div className="ml-4">
          <p
            className={cn(
              "text-lg",
              color === "light" ? "text-black" : "text-white",
            )}
          >
            {item.title !== ""
              ? item.title
              : item.network.charAt(0).toUpperCase() +
              item.network.slice(1)}
          </p>
          <p
            className={cn(
              "text-sm",
              color === "light" ? "text-black" : "text-white",
            )}
          >
            {item.value}
          </p>
        </div>
      </div>
      <ReorderIcon dragControls={dragControls} />
      {/* <ArrowUpDown
        size={16}
        color={color === "light" ? "black" : "white"}
        className="ml-auto mr-4 cursor-grab active:cursor-grabbing"
      /> */}
    </Reorder.Item>
  )
}

export default Item