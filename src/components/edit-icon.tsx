'use client';

import { DragControls } from "framer-motion";
import { ArrowUpDown, Grip } from "lucide-react";
import { useThemeColor } from "./context/theme-color-provider";

interface Props {
  dragControls: DragControls;
}

export function EditReorderIcon({ dragControls }: Props) {
  const { color, setColor } = useThemeColor();

  return (
    <Grip size={18} className="cursor-grab active:cursor-grabbing touch-none mr-4" onPointerDown={(event) => dragControls.start(event)} />
  );
}
