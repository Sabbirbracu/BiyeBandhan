import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import FeaturesSection from "@/components/ui/pages/home/FeaturesSection";
import HeroSection from "@/components/ui/pages/home/HeroSection";
import PricingSection from "@/components/ui/pages/home/PricingSection";
import ProcessSection from "@/components/ui/pages/home/ProcessSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
