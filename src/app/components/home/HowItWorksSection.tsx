import Image from "next/image";
import React from "react";

const steps = [
  {
    icon: "assign",
    title: "Sign Up",
    description:
      "Fill out our quick application form to get started as a Simsem Travel Creator well confirm your spot via email.",
  },
  {
    icon: "tour-guide",
    title: "Choose Your Adventure",
    description: "Browse our available selection of authentic local tours.",
  },
  {
    icon: "dance",
    title: "Experience & Share",
    description:
      " Enjoy your tour, capture the magic, and create content that inspires others to travel.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0D2E61] w-full color-white py-10 ">
      <div className="max-w-8xl px-[5rem] flex flex-col items-center">
        <h1 className="text-[45px] text-[#FB8B24] py-6"> How It Works</h1>
        <div className="max-w-[980px] px-5">
          <div className="flex flex-col  md:flex-row items-between gap-10 relative ">
            <div className="hidden md:block absolute top-5 left-42 h-0.5">
              <Image
                src="/images/line1.png"
                alt="Connecting Line"
                width={200}
                height={20}
              />
            </div>
            <div className="hidden md:block absolute top-5 right-42 h-0.5">
              <Image
                src="/images/line2.png"
                alt="Connecting Line"
                width={200}
                height={20}
              />
            </div>
            {steps.map((steps, index) => (
              <div
                key={index}
                className="flex flex-col items-center w-[254px] gap-2"
              >
                <Image
                  alt={steps.title}
                  src={`/images/${steps.icon}.png`}
                  width={73}
                  height={73}
                />
                <span className="text-[#FB8B24] text-[11px]">
                  Step {index + 1}
                </span>
                <span className="text-[18px]">{steps.title}</span>
                <span className="text-center text-[14px]">
                  {steps.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
