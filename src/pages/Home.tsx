import Seo, { websiteJsonLd } from "../components/Seo";
import Hero from "../sections/Hero";
import FindDoctorSection from "../sections/FindDoctorSection";
import SpecialitiesSection from "../sections/SpecialitiesSection";
import JourneySection from "../sections/JourneySection";
import AiSection from "../sections/AiSection";
import WhatsAppSection from "../sections/WhatsAppSection";
import { DiagnosticsSection, PackagesSection, PatientServicesSection } from "../sections/ServicesBlocks";
import EmergencySection from "../sections/EmergencySection";
import PortalsSection from "../sections/PortalsSection";
import { AutomationSection, TechnologySection, WhyKyntriqSection } from "../sections/AutomationSection";
import { FacilitiesSection, PrivacySection, TestimonialsSection } from "../sections/TrustSection";
import KyntriqCta from "../sections/KyntriqCta";

export default function Home() {
  return (
    <>
      <Seo
        title="Advanced Care. Connected Healthcare."
        description="A demonstration multispeciality hospital platform: find doctors, book appointments, explore departments and use an AI healthcare assistant. Built as a demo by Kyntriq Solutions."
        path="/"
        jsonLd={websiteJsonLd}
      />
      <Hero />
      <FindDoctorSection />
      <SpecialitiesSection />
      <JourneySection />
      <AiSection />
      <WhatsAppSection />
      <PatientServicesSection />
      <PackagesSection />
      <DiagnosticsSection />
      <EmergencySection />
      <PortalsSection />
      <AutomationSection />
      <TechnologySection />
      <WhyKyntriqSection />
      <TestimonialsSection />
      <FacilitiesSection />
      <PrivacySection />
      <KyntriqCta />
    </>
  );
}
