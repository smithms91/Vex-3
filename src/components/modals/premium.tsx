"use client";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import ParamModal from "../param-modal";
import Link from "next/link";
import Image from "next/image";

const RouteIdentifier = "premium";

// This is a modal that is wrapped with the Dialog that opens on param in route
const Premium = () => {
  return (
    <ParamModal routeName={RouteIdentifier}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <Image src="/vexblack.png" width="90" height="50" alt="Vex Logo" className="mx-auto my-4" />
          <DialogTitle className="text-2xl text-center">Upgrade to Vex Premium!</DialogTitle>
          <DialogDescription>
            Unlock endless customization and powerful insights with Vex Premium—your digital business card, elevated.
          </DialogDescription>
        </DialogHeader>
        <h4 className="text-[3rem]">$9.99/m</h4>
        <ul>
          <li>Analytics Page</li>
          <li>More Customization</li>
          <li>More Contacts</li>
        </ul>
        <DialogFooter>
          <Link className="bg-black text-white px-8 py-2 rounded-md" href="/premium/features">
            Upgrade
          </Link>
        </DialogFooter>
      </DialogContent>
    </ParamModal>
  )
}

export default Premium