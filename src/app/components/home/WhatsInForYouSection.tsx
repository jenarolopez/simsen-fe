import Image from "next/image";
import React from "react";

const whatsIn = [
  {
    image: "placeholder",
    title: "Free Access to Local Tours",
    description:
      "Enjoy exclusive access to incredible tours and activities, completely free of charge!",
  },
  {
    image: "placeholder",
    title: "Showcase Your Journey",
    description:
      "Share your experiences across your platforms—blog, YouTube, Instagram, TikTok, and more! Gain exposure and grow your following as you inspire others to explore.",
  },
  {
    image: "placeholder",
    title: "Support Local Communities",
    description:
      "Be at the forefront of highlighting local and authentic experiences to the world. Your stories can help promote local artisans, traditions, and businesses, making a positive impact on the communities you visit.",
  },
];

export default function WhatsInForYouSection() {
  return (
    <section className="w-full pt-16 bg-[#0F4C5C] bg-[url(/images/pattern.png)] relative text-black">
      <div className="max-w-8xl px-[2rem] md:px-[5rem] flex items-center flex-col">
        <span className="text-[#FB8B24] text-[45px]">
          What&apos;s in it for You?
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transform translate-y-[5rem]">
          {whatsIn.map((data, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-[22px] shadow-lg"
            >
              <div className="h-[360px] w-full relative">
                <Image
                  src={`/images/placeholder.png`}
                  alt={data.title}
                  objectFit="cover"
                  fill={true}
                  className="rounded-t-[22px]"
                />
              </div>
              <div className="p-5 flex flex-col gap-4">
                <span className="text-[24px] text-[#0F4C5C]">{data.title}</span>
                <span className="text-14px">{data.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-30 bg-white"></div>
    </section>
  );
}
