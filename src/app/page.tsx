import HeroSection from "@/app/components/home/HeroSection";


import Footer from "@/app/components/layout/footer";
import HowItWorks from "./components/home/HowItWorksSection";
import PickYourHeroSection from "./components/home/PickYourHeroSection";

export default function Home() {
  return (
    <div className="w-full bg-white">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <HeroSection />
        <HowItWorks />
        <PickYourHeroSection />
      </main>
      <Footer />
    </div>
  );
}
