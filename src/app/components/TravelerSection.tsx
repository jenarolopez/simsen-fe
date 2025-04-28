"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Testimonial {
  image_url: string;
  description: string;
  name: string;
  rating: string;
}

export default function TravelerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data: Testimonial[] = await res.json();

        setTestimonials(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [setTestimonials]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="w-full pt-16 bg-[#9A031E0F] relative text-black">
      <div className="max-w-8xl px-[2rem] md:px-[5rem] flex items-center flex-col">
        <span className="text-[#FB8B24] text-[45px] mb-8">
          What travelers says about us?
        </span>

        <div className="w-full overflow-hidden relative">
          {loading ? (
            // Skeleton loader
            <div className="flex transition-transform duration-500 ease-in-out">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full flex-shrink-0 p-6"
                >
                  <div className="m-1 bg-gray-200 w-full h-full rounded-[22px] flex flex-col py-10 items-center shadow-lg animate-pulse">
                    <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>
                    <div className="bg-gray-300 w-16 h-16 rounded-full mb-4"></div>
                    <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error message
            <div className="text-red-500 text-center py-10">
              <p>Failed to load testimonials. Please try again later.</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col w-full flex-shrink-0 p-6"
                >
                  <div className="m-1 bg-white w-full h-full rounded-[22px] flex flex-col py-10 items-center shadow-lg">
                    <div
                      className="text-gray-700 mb-4 text-center px-5"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></div>
                    <Image
                      src={
                        data.image_url
                          ? data.image_url
                          : "/images/placeholder.png"
                      }
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
          )}
        </div>

        {!loading && !error && (
          <div className="flex flex-row items-center justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <Button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-[#FB8B24]" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pb-30 bg-white mt-16"></div>
    </section>
  );
}
