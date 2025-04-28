"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Offer {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
}

export default function WhatsInForYouSection() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/offers");
        if (!response.ok) {
          throw new Error("Failed to fetch offers");
        }
        const data: Offer[] = await response.json();
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <section className="w-full pt-16 bg-[#0F4C5C] bg-[url(/images/pattern.png)] relative text-black">
      <div className="max-w-8xl px-[2rem] md:px-[5rem] flex items-center flex-col">
        <span className="text-[#FB8B24] text-[45px]">
          What&apos;s in it for You?
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transform translate-y-[5rem]">
          {loading
            ? // Skeleton loading
              [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-200 rounded-[22px] shadow-lg animate-pulse min-w-[80vw] md:min-w-[30vw]"
                >
                  <div className="h-[360px] w-full bg-gray-300 rounded-t-[22px]"></div>
                  <div className="p-5 flex flex-col gap-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              ))
            : // Render offers
              offers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex flex-col bg-white rounded-[22px] shadow-lg"
                >
                  <div className="h-[360px] w-full relative">
                    <Image
                      src={offer.image_url || `/images/placeholder.png`}
                      alt={offer.title}
                      objectFit="cover"
                      fill={true}
                      className="rounded-t-[22px]"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-4">
                    <span className="text-[24px] text-[#0F4C5C]">
                      {offer.title}
                    </span>
                    <span className="text-14px">{offer.subtitle}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className="pb-30 bg-white"></div>
    </section>
  );
}
