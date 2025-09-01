
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProfessionals from "@/components/FeaturedProfessionals";
import HowItWorks from "@/components/HowItWorks";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <FeaturedProfessionals />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;
