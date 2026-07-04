import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import DirectMaterials from "@/components/DirectMaterials";
import Process from "@/components/Process";
import CommercialTeaser from "@/components/CommercialTeaser";
import Testimonials from "@/components/Testimonials";
import ServiceArea from "@/components/ServiceArea";
import Faq from "@/components/Faq";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <DirectMaterials />
      <Process />
      <CommercialTeaser />
      <Testimonials />
      <ServiceArea />
      <Faq />
      <ContactSection />
    </main>
  );
}
