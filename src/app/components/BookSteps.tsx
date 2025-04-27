"use client";
import { useState } from "react";
import { defaultBooking, useAppContext } from "../context";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingStep1Schema, bookingStep2Schema } from "../lib/schemas/bookStepForm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const BookStep = () => {
  const [step, setStep] = useState(1);
  const { setStepsOpen: setOpen, setBookDetails, bookDetails, setResetForm } = useAppContext();



  // Step 1 form
  const {
    register: registerStep1,
    handleSubmit: handleSubmitStep1,
    formState: { errors: errorsStep1 },
    getValues: getValuesStep1,
  } = useForm({
    resolver: zodResolver(bookingStep1Schema),
    defaultValues: {
      pickupDate: "",
      tourists: "1",
    },
  });

  // Step 2 form
  const {
    register: registerStep2,
    handleSubmit: handleSubmitStep2,
    formState: { errors: errorsStep2 },
    setValue: setValueStep2,
  } = useForm({
    resolver: zodResolver(bookingStep2Schema),
    defaultValues: {
      touristDetails: [{ name: "", email: "" }],
    },
  });

  const handleNext = handleSubmitStep1((data) => {
    // Update tourist details array length based on number of tourists
    const numTourists = parseInt(data.tourists);
    const newTouristDetails = Array(numTourists)
      .fill(null)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_, i) => ({ name: "", email: "" }));
    setValueStep2("touristDetails", newTouristDetails);
    setStep(2);
  });

  const handleSubmit = handleSubmitStep2(async (data) => {
    try {
      const step1Data = getValuesStep1();
      const finalData = {
        ...step1Data,
        ...data,
      };
      const bookingPayload = {
        ...bookDetails,
        numberOfTourist: finalData.tourists,
        tourist: finalData.touristDetails,
        bookDate: finalData.pickupDate,
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      setResetForm(true)
      toast.success("Booking submitted successfully!");
      setBookDetails(defaultBooking)
      setStep(1);
      setOpen(false);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to submit booking. Please try again.");
    }
  });

  return (
    <div className="max-h-[80vh] flex flex-col">
      <div className="px-6 pb-4 sticky top-0 z-10">
        <p className="text-sm text-gray-600">Step {step+1}/3</p>
      </div>

      <div className="px-6 pb-6 overflow-y-auto flex-1">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Date
              </label>
              <Input
                type="date"
                {...registerStep1("pickupDate")}
                className={`w-full ${errorsStep1.pickupDate ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            <div>
              <label htmlFor="tourists" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Tourists
              </label>
              <Input
                type="number"
                min="1"
                max="10"
                {...registerStep1("tourists")}
                className={`w-full ${errorsStep1.tourists ? "border-red-500" : "border-gray-300"}`}
              />
            </div>

            <Button
              onClick={handleNext}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium"
            >
              NEXT
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="max-h-[40vh] overflow-auto space-y-6 pb-5">
              {Array.from({ length: parseInt(getValuesStep1().tourists) }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="font-medium">
                    {index + 1}
                    {getOrdinalSuffix(index + 1)} Tourist
                  </h3>
                  <div>
                    <Input
                      type="text"
                      placeholder="Tourist Name"
                      {...registerStep2(`touristDetails.${index}.name`)}
                      className={`w-full ${
                        errorsStep2.touristDetails?.[index]?.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Tourist Email"
                      {...registerStep2(`touristDetails.${index}.email`)}
                      className={`w-full ${
                        errorsStep2.touristDetails?.[index]?.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium"
            >
              BOOK NOW
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};
