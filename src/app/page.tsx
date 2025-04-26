import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="w-full">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
