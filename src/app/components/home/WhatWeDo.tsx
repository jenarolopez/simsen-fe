import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WhatWeDo() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="max-w-xs mx-auto">
              <Image
                src="/images/screenshot.png"
                alt="Simsem Mobile App"
                width={300}
                height={600}
                className="mx-auto"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#5F0F40]">What We Do</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of explorers who have unlocked the best of the
              world&apos;s cultures and communities, the Simsem way.
            </p>
            <p className="text-gray-600 mb-6">
              Simsem connects travelers with authentic local experiences. We
              help you discover hidden gems, taste local cuisine, and immerse
              yourself in the culture. Our verified local guides ensure a safe
              and memorable experience.
            </p>
            <div className="mb-6 flex flex-col items-center md:items-start">
              <h3 className="text-lg mb-2 text-[#0D2E61]">
                Download Simsem Now!
              </h3>
              <Link href="#" className="inline-block">
                <Image
                  src="/images/google-play.png"
                  alt="Download on Google Play"
                  width={180}
                  height={53}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
