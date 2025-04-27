import HeroSection from "@/app/components/HeroSection";

import Footer from "@/components/layout/footer";
import HowItWorks from "./components/HowItWorksSection";
import PickYourHeroSection from "./components/PickYourHeroSection";
import WhatsInForYouSection from "./components/WhatsInForYouSection";
import WhatWeDo from "./components/WhatWeDo";
import Traveler from "./components/TravelerSection";
import LetUsKnowSection from "./components/LetUsKnowSection";
import { AppContextProvider } from "./context";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <AppContextProvider>
        <main className="flex flex-col row-start-2 items-center sm:items-start">
          <HeroSection />
          <HowItWorks />
          <PickYourHeroSection />
          <WhatsInForYouSection />
          <WhatWeDo />
          <Traveler />
          <LetUsKnowSection />
        </main>
      </AppContextProvider>
      <Footer />
    </div>
  );
}
