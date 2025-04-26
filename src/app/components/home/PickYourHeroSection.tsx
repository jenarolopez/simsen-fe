"use client";

import Image from "next/image";
import React from "react";

const adventures = [
  {
    title: "Dashur",
    description:
      "Experience the tranquil beauty of Dashur through a guided exploration led by Sameh. Enjoy traditional Egyptian cuisine, participate in hands- on workshops, and capture memories",
    tag: "5 Available Spots",
    image: "placeholder",
    isAvailable: true,
  },
  {
    title: "Amman Walking Tour",
    description:
      "Join Ibrahim for a unique 2 hour walking tour of Amman’s vibrant markets. Explore local customs, taste traditional Arabic delicacies like baklava and falafel and learn about navigating the markets.",
    tag: "5 Available Spots",
    image: "placeholder",
    isAvailable: true,
  },
  {
    title: "Petra At Night Jordan ",
    description:
      "Nestled in the heart of Jordan, the ancient city of Petra stands as a breathtaking testment to the ingenuity and artistry of its past inhabitants. As Jordan iconic landmark",
    tag: "Completed",
    image: "placeholder",
    isAvailable: false,
  },
];

export default function PickYourHeroSection() {
  return (
    <section className="w-full py-16 bg-[#DCB59733]">
      <div className="max-w-8xl px-[5rem] flex items-center flex-col">
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
          {adventures.map((adventure, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={`/images/${adventure.image}.png`}
                  alt={adventure.title}
                  width={400}
                  height={250}
                  className="w-full h-[400px] object-cover rounded-[22px]"
                />
                <div className="absolute top-3 left-3 bg-[#FEC540] text-[#5F0F40] text-xs font-bold px-2 py-1 rounded">
                  {adventure.tag}
                </div>
                <button
                  onClick={() => {}}
                  className="absolute top-3 right-3 z-10 cursor-pointer"
                >
                  <Image
                    src={`/icons/heart.png`}
                    alt={adventure.title}
                    width={35}
                    height={31}
                  />
                </button>
                <div className="absolute bottom-0 bg-white h-10 rounded-t-2xl w-full "></div>
              </div>
              <div className="px-6 pt-0 pb-10 rounded-t-2xl flex flex-col justify-between ">
                <div>
                  <h3 className="text-center text-navy-blue-800 text-xl font-semibold mb-1">
                    {adventure.title}
                  </h3>
                  <p className="text-center text-gray-600 mb-4 text-sm font-barlow">
                    {adventure.description}
                  </p>
                </div>
                <button
                  onClick={() => {}}
                  className="w-full font-barlow rounded-tl-2xl rounded-br-2xl rounded-tr-none rounded-bl-none cursor-pointer px-20 bg-[#F28E33] text-white"
                >
                  Book Your Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
