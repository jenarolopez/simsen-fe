"use client"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import React from "react";

import { useAppContext } from "../context";
import { BookStep } from "./BookSteps";

interface BookingFormProps {
  title?: string;
}

export default function BookFormDialog({
}: BookingFormProps) {
  const { setStepsOpen: setOpen, stepsOpen: open } = useAppContext();
  if(!open) return null
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <DialogContent className="bg-orange-50">
        <DialogTitle className="text-center text-lg text-navy-blue-800 font-barlow font-semibold mt-10 mx-4">
          Book your free tours with verified locals.
        </DialogTitle>
        <BookStep />
      </DialogContent>
    </Dialog>
  );
}
