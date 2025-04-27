"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const testimony = [
  {
    image: "placeholder",
    desctiption: "asdasdasdasd",
    name: "asdasdasdasd",
    rating: 5,
  },
  {
    image: "placeholder",
    desctiption: "asdasdasdasd",
    name: "asdasdasdasd",
    rating: 5,
  },
  {
    image: "placeholder",
    desctiption: "asdasdasdasd",
    name: "asdasdasdasd",
    rating: 5,
  },
];

export default function TravelerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimony.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full pt-16 bg-[#9A031E0F] relative text-black">
      <div className="max-w-8xl px-[2rem] md:px-[5rem] flex items-center flex-col">
        <span className="text-[#FB8B24] text-[45px] mb-8">
          What travelers says about us?
        </span>

        <div className="w-full overflow-hidden relative ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimony.map((data, index) => (
              <div
                key={index}
                className="flex flex-col w-full flex-shrink-0 p-6"
              >
                <div className="m-1 bg-white w-full h-full rounded-[22px] flex flex-col py-10 items-center shadow-lg">
                  <p className="text-gray-700 mb-4">{data.desctiption}</p>
                  <Image
                    src={`/images/${data.image}.png`}
                    width={74}
                    height={74}
                    alt={`Testimonial by ${data.name}`}
                    className="w-16 h-16 rounded-full object-cover mb-4"
                  />
                  <div className="flex items-center justify-between flex-col">
                    <span className="font-semibold">{data.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-3 mt-6">
          {testimony.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-[#FB8B24]" : "bg-gray-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="pb-30 bg-white mt-16"></div>
    </section>
  );
}
