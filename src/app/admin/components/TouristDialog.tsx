"use client";

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { User } from "@/app/admin/page";

interface TouristDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function TouristDialog({ isOpen, onClose, user }: TouristDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-lg p-6">
        <DialogTitle className="text-xl font-bold text-gray-800">Tourist Details</DialogTitle>
        <DialogDescription className="text-sm text-gray-600 mb-4">
          Below are the details of the tourist associated with this booking.
        </DialogDescription>
        {user ? (
          <div className="space-y-4">
            <div className="text-sm">
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phoneNumber}
              </p>
              <p>
                <strong>Experience ID:</strong> {user.experienceId}
              </p>
              <p>
                <strong>Booking Date:</strong> {user.bookDate}
              </p>
              <p>
                <strong>Number of Tourists:</strong> {user.numberOfTourist}
              </p>
              <p>
                <strong>Referral:</strong> {user.referral}
              </p>
              <p>
                <strong>Status:</strong> {user.status}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Tourist List:</h3>
              <ul className="list-disc list-inside space-y-2">
                {user.tourist.map((tourist, index) => (
                  <li key={index} className="text-sm">
                    <strong>Name:</strong> {tourist.name}, <strong>Email:</strong> {tourist.email}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-red-500">No user data available.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}