'use client';

import { Dialog } from "./ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ParamModalProps = React.PropsWithChildren<{
  routeName: string;
}>;


// This is the wrapper for the modal that opens on param in route
const ParamModal = ({ children, routeName }: ParamModalProps) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = searchParams.has(routeName);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  function onOpenChanged(open: boolean) {
    if (!open) {
      router.replace(pathname, { scroll: false });
    } else {
      router.replace(`${pathname}?${routeName}`, { scroll: false });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChanged}>
      {children}
    </Dialog>
  )
}

export default ParamModal