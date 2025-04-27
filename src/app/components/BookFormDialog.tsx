import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import React from "react";
import { BookStep } from "./BookForm";

interface BookingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  adventureId?: string;
}


export default function BookFormDialog({
  open,
  onOpenChange,
  title = "Book a Spot Now",
 
}: BookingFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!open && (
        <DialogTrigger>
          <div className="bg-orange-500 rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer px-20 hover:bg-orange-600 uppercase font-barlow text-white py-6">
            {title}
          </div>
        </DialogTrigger>
      )}
      <DialogContent className="bg-orange-50">
        <DialogTitle className="text-center text-lg text-navy-blue-800 font-barlow font-semibold mt-10 mx-4">
          Book your free tours with verified locals.
        </DialogTitle>
        <BookStep />
        
      </DialogContent>
    </Dialog>
  );
}
