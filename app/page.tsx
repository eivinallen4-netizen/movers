import HeaderClient from "@/components/HeaderClient";
import BeforeAfterClient from "@/components/BeforeAfterClient";
import FAQClient from "@/components/FAQClient";
import FinalCTAClient from "@/components/FinalCTAClient";
import FooterClient from "@/components/FooterClient";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceShowcase from "@/components/ServiceShowcase";
import Reviews from "@/components/Reviews";
import YourMoveMattersBanner from "@/components/YourMoveMattersBanner";
import content from "@/app/content.json";

export default function Home() {
  return (
    <div className="w-full">
      <FloatingQuoteButton phone={content.hero.callButtonPhone} />
      <HeaderClient />
      <Hero />
      <TrustBar />
      <Services />
      <BeforeAfterClient />
      <YourMoveMattersBanner />
      <Process />
      <WhyChooseUs />
      <ServiceShowcase />
      <Reviews />
      <FinalCTAClient />
      <FAQClient />
      <FooterClient />
    </div>
  );
}
