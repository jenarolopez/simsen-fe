"use client";
import Image from "next/image";

import BookForm from "./BookForm";

export default function HeroSection() {

  return (
    <section
      id="booking-section"
      className="relative w-full flex items-center py-10"
    >
      <Image
        aria-hidden
        src="/images/hero.png"
        alt="Travel Background"
        fill={true}
        objectFit="cover"
        className="absolute"
      />

      <div className="max-w-[1800px] px-10 md:px-[5rem] ">
        <h1 className="text-3xl font-cursive text-white z-20 relative">
          Simsem
        </h1>

        <div className="relative z-20 items-center justify-center h-full grid grid-cols-1 md:grid-cols-2">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Book your <span className="text-yellow-400 font-bold">FREE</span>{" "}
              <br />
              authentic experiences with <br /> verified locals!
            </h1>
            <p className="text-lg mb-6">
              Are you a passionate{" "}
              <span className="text-yellow-400">travel creator</span> looking to
              explore the captivating culture, rich history, and stunning
              landscapes of the Middle East?
            </p>
          </div>
          <div className="flex items-center flex-row justify-center">
            <div className="bg-white w-full md:w-[420px] rounded-[15px] flex">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full">
                <h3 className="text-[24px] text-[#0D2E61] font-semibold mb-4">
                  Book your free tours with verified locals.
                </h3>
                <BookForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo */}
    </section>
  );
}
