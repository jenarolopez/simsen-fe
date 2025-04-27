import React from "react";

export default function LetUsKnowSection() {
  return (
    <section
      className="relative w-full py-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/mountains.png')" }}
    >
      <div className="absolute inset-0 "></div>
      <div className="container relative z-10 mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let Us Know You&apos;ll Be Attending!
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          To ensure the success of the Simsem Cultural Exchange and create a
          bridge of understanding and appreciation among travelers and locals,
          your authentic participation is a must.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium">
          Confirm Attendance
        </button>
      </div>
    </section>
  );
}
