"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { useAppContext } from "../context";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AdventureForm from "./AdventureForm";
import { PencilIcon } from "lucide-react";

export type Adventures = {
  id: string;
  title: string;
  description: string;
  tag: string;
  image_url: string;
  isCompleted: boolean;
  referenceId: string;
};

const AdventureCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse min-w-[300px]">
    <div className="relative">
      <div className="w-full h-[400px] bg-gray-200 rounded-[22px]" />
      <div className="absolute top-3 left-3 bg-gray-200 w-16 h-6 rounded" />
      <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full" />
      <div className="absolute bottom-0 bg-white h-10 rounded-t-2xl w-full" />
    </div>
    <div className="px-6 pt-0 pb-10 rounded-t-2xl flex flex-col justify-between">
      <div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mx-auto mb-4" />
      </div>
      <div className="h-10 bg-gray-200 rounded-tl-2xl rounded-br-2xl w-full" />
    </div>
  </div>
);

export default function PickYourHeroSection() {
  const { setAdventures, adventures, setAdventureId, adventureId } =
    useAppContext();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const res = await fetch("/api/adventures");
        if (!res.ok) throw new Error("Failed to fetch adventures");
        const data: Adventures[] = await res.json();

        setAdventures(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdventures();
  }, [setAdventures]);

  // Add useEffect to fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites?userId=userId");
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        console.log(data, "data");
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []); // Run once on mount

  // Add toggle favorite function
  const toggleFavorite = async (adventureId: string) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adventureId }),
      });

      if (!response.ok) throw new Error("Failed to toggle favorite");

      const { favorited } = await response.json();

      setFavorites((prev) =>
        favorited
          ? [...prev, adventureId]
          : prev.filter((id) => id !== adventureId)
      );
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <section className="w-full py-16 bg-[#DCB59733]">
      <div className="max-w-8xl px-[2rem] md:px-[5rem] flex items-center flex-col">
        <h3 className="text-[20px] text-[#FB8B24] text-center">
          Pickup your Experience
        </h3>
        <h2 className="text-[45px] text-[#0D2E61] text-center">
          Exclusive Travel Adventures - For Free!
        </h2>
        <p className="text-[20px] text-center text-[#3D3D3D] mb-12 max-w-3xl mx-auto">
          As a Travel Citizen, you have the chance to engage, explore, and
          enrich with verified through authentic travel experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Show 3 skeleton cards while loading
            [...Array(3)].map((_, index) => (
              <AdventureCardSkeleton key={index} />
            ))
          ) : error ? (
            <div className="col-span-3 text-center text-red-500">{error}</div>
          ) : (
            adventures.map((adventure, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden relative"
              >
                <div className="relative">
                  <Button className="absolute z-10 right-[20px] top-[100px] rounded-full bg-white w-[50px] h-[50px]" onClick={()=>{
                    setAdventureId(adventure.id)
                    setIsOpen(true)
                   
                  }}>
                    <PencilIcon className=" " width={40} height={40}/>
                  </Button>
                  <Image
                    src={
                      adventure.image_url
                        ? adventure.image_url
                        : "/images/placeholder.png"
                    }
                    alt={adventure.title}
                    width={400}
                    height={250}
                    className="w-full h-[400px] object-cover rounded-[22px]"
                  />
                  <div className="absolute top-3 left-3 bg-[#FEC540] text-[#5F0F40] text-xs font-bold px-2 py-1 rounded">
                    {adventure.tag}
                  </div>
                  <Button
                    onClick={() => toggleFavorite(adventure.id)}
                    className="absolute top-3 right-3 z-10 cursor-pointer"
                  >
                    <Image
                      src={
                        favorites.includes(adventure.id)
                          ? "/icons/heart-filled.png"
                          : "/icons/heart.png"
                      }
                      alt={
                        favorites.includes(adventure.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      width={35}
                      height={31}
                    />
                  </Button>
                  <div className="absolute bottom-0 bg-white h-10 rounded-t-2xl w-full "></div>
                </div>
                <div className="px-6 pt-0 pb-10 rounded-t-2xl flex flex-col justify-between ">
                  <div>
                    <h3 className="text-center text-[#0D2E61] text-xl font-semibold mb-1">
                      {adventure.title}
                    </h3>
                    <p className="text-center text-gray-600 mb-4 text-sm font-barlow">
                      {adventure.description}
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      document
                        .getElementById("booking-section")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      setAdventureId(adventure.id);
                    }}
                    disabled={adventure.isCompleted}
                    className="w-full font-barlow rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer px-20 bg-[#F28E33] text-white"
                  >
                    Book Your Spot
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
     

      {adventureId && adventures && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Update adventure</DialogTitle>
            </DialogHeader>
            <AdventureForm
              onClose={() => setIsOpen(false)}
              adventure={
                adventures.find((adv) => adv.id === adventureId) ||
                adventures[0]
              }
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}
