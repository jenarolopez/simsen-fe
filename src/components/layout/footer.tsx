import React from "react";
import Image from "next/image";


const icons = [
  "ig",
  "fb",
  "indeed",
  "tiktok",
  "yt",
  "mail",
]

export default function Footer() {
  return (
    <footer className="bg-[#0b306c] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-8 md:mb-0">
          <Image
            aria-hidden
            src="/images/logo.png"
            alt="Simsen Logo"
            width={212}
            height={88}
          />
        </div>

        <div className="flex flex-wrap gap-8">
          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:underline">
              About Us
            </a>
            <a href="#" className="hover:underline">
              Blog: Vibes of the Middle East
            </a>
            <a href="#" className="hover:underline">
              Experiences
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>

          <div className="flex flex-col space-y-2">
            <a href="#" className="hover:underline">
              Become a Local Host
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4 mt-8 md:mt-0">
          {
            icons.map((icon) => (
              <a
                key={icon}
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                <Image
                  src={`/icons/${icon}.png`}
                  alt={`${icon} icon`}
                  width={24}
                  height={24}
                />
              </a>
            ))

          }
        </div>
      </div>

      <hr className="border-gray-400 my-6 mx-4" />

      <div className="text-center text-sm text-gray-300">
        Copyright © 2025 | Simsem
      </div>
    </footer>
  );
}
