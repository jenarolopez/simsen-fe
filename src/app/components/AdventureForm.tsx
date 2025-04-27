"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Adventures } from "./PickYourHeroSection";
import { useAppContext } from "../context";

const adventureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Must be a valid URL"),
  tag: z.string().min(1, "Tag is required"),
  isCompleted: z.boolean().default(false).optional(),
});

type AdventureFormData = z.infer<typeof adventureSchema>;

interface AdventureFormProps {
  onClose: () => void;
  adventure: Adventures;
}

export default function AdventureForm({
  onClose,
  adventure,
}: AdventureFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setAdventures } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdventureFormData>({
    resolver: zodResolver(adventureSchema),
    defaultValues: {
      title: adventure.title,
      image_url: adventure.image_url,
      tag: adventure.tag,
      isCompleted: adventure.isCompleted,
      description: adventure.description,
    },
  });

  const onSubmit = async (data: AdventureFormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/cms/adventure/${adventure.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create adventure");
      }
      setAdventures(prev => prev.map(pr => {
        if(pr.id === adventure.id) {
          return {
            ...pr,
            ...data
          }
        }
        return pr
      }))
      toast.success("CMS update successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to create adventure");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <Input
          id="title"
          {...register("title")}
          className={`${errors.title ? "border-red-500" : "border-gray-300"}`}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={`w-full rounded-md border ${
            errors.description ? "border-red-500" : "border-gray-300"
          } p-2`}
          rows={3}
        />
      </div>

      <div>
        <label
          htmlFor="image_url"
          className="block text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <Input
          id="image_url"
          type="url"
          {...register("image_url")}
          className={`${
            errors.image_url ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      <div>
        <label
          htmlFor="tag"
          className="block text-sm font-medium text-gray-700"
        >
          Tag
        </label>
        <Input
          id="tag"
          {...register("tag")}
          className={`${errors.tag ? "border-red-500" : "border-gray-300"}`}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isCompleted"
          {...register("isCompleted")}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600"
        />
        <label
          htmlFor="isCompleted"
          className="ml-2 block text-sm text-gray-700"
        >
          Mark as Completed
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Adventure"}
        </Button>
      </div>
    </form>
  );
}
