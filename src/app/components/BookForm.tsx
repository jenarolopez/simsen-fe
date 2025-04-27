"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { getUserCountry } from "../../../lib/getCountry";
import { countryCode } from "../../../lib/contryCodes";
import { useAppContext } from "../context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bookFormSchema, type BookFormValues } from "../lib/schemas/bookForm";
import { toast } from "sonner";

export default function BookForm() {
  const { adventures, adventureId, setAdventureId, setBookDetails } = useAppContext();
  const [userCountry, setUserCountry] = useState("US");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      experience: adventureId || "",
    },
  });

  useEffect(() => {
    const getCountry = async () => {
      const country = await getUserCountry();
      setUserCountry(country);
    };
    getCountry();
  }, []);

  useEffect(() => {
    if (adventureId) {
      setValue("experience", adventureId);
    }
  }, [adventureId, setValue]);

  const onSubmit = async (data: BookFormValues) => {
    setIsSubmitting(true);
    try {
      setBookDetails(prev=>({
        ...prev,
        fullName: data.fullName,
        phoneNumber: data.phone,
        experienceId: adventureId ? adventureId : "",
        referral:data.referral,
      }))
      // Replace with your API endpoint
      // const response = await fetch("/api/book", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (!response.ok) throw new Error("Submission failed");

      // toast.success("Booking submitted successfully!");
      // // Optional: Reset form or redirect
      
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fullName">Full Name</label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...register("fullName")}
          className={`${
            errors.fullName ? "border-red-500 focus:border-red-500" : "border-[#5F0F4026]"
          }`}
        />
      </div>

      <div>
        <label htmlFor="email">Email Address</label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className={`${
            errors.email ? "border-red-500 focus:border-red-500" : "border-[#5F0F4026]"
          }`}
        />
      </div>

      <div>
        <label htmlFor="phone">Phone Number</label>
        <div className="flex">
          <select
            value={userCountry}
            onChange={(e) => setUserCountry(e.target.value)}
            className="bg-gray-50 border border-[#5F0F4026] text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            {countryCode.map((code) => (
              <option key={code.code} value={code.code}>
                {code.code} {code.dial_code}
              </option>
            ))}
          </select>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 555-5555"
            className={`rounded-l-none ${
              errors.phone ? "border-red-500 focus:border-red-500" : "border-[#5F0F4026]"
            }`}
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="referral">How did you hear about us?</label>
        <select
          id="referral"
          {...register("referral")}
          className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
            errors.referral ? "border-red-500 focus:border-red-500" : "border-[#5F0F4026]"
          }`}
        >
          <option value="">Select an option</option>
          <option value="social">Social Media</option>
          <option value="friend">Friend</option>
          <option value="search">Search Engine</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience">Select Experience</label>
        <select
          id="experience"
          {...register("experience")}
          onChange={(e) => {
            setAdventureId(e.target.value);
            setValue("experience", e.target.value);
          }}
          className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
            errors.experience ? "border-red-500 focus:border-red-500" : "border-[#5F0F4026]"
          }`}
        >
          <option value="">Select Experience</option>
          {adventures.map((adv) => (
            <option key={adv.id} value={adv.id} disabled={adv.isCompleted}>
              {adv.title}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        className="w-full bg-amber-500 hover:bg-amber-600 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}


export const BookStep = () => {
  return <div>

  </div>
}