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

const RouteIdentifier = "premium";

// This is a modal that is wrapped with the Dialog that opens on param in route
const Premium = () => {
  return (
    <ParamModal routeName={RouteIdentifier}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Important Information?</DialogTitle>
          <DialogDescription>
            Data
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </ParamModal>
  )
}

export default Premium