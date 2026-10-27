// src/components/HomePage.tsx
import React from 'react';
import Hero from './Hero';
import ProblemSection from './ProblemSection';
import IndustriesSection from './IndustriesSection';
import Services from './Services';
import SampleWork from './SampleWork';
import HowItWorks from './HowItWorks';
import PricingPackages from './PricingPackages';
import AboutMe from './AboutMe';
import Comparison from './Comparison';
import TrustPolicies from './TrustPolicies';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';
import MobileBottomDock from './MobileBottomDock';

function HomePage() {
  return (
    <div className="flex-1">
      {/* 1. Hero: Honest Numbers, Clean 2 CTAs, 3D Core */}
      <Hero />

      {/* 2. Problem: 3 Relatable Real-world Pain Points */}
      <ProblemSection />

      {/* 3. Industries: Kirana, Clinic, Dairy, Tailor, Agro, School */}
      <IndustriesSection />

      {/* 4. Services: 1 Line + 2 High-impact Bullets, High Contrast */}
      <Services />

      {/* 5. Sample Work: Labeled "Concept / Demo Project" with Interactive Live Preview Modal */}
      <SampleWork />

      {/* 6. How It Works: Simple 4-Step Process */}
      <HowItWorks />

      {/* 7. Pricing: 3 Simple Packages + Transparent Domain/Hosting + Payment Terms + GST Note */}
      <PricingPackages />

      {/* 8. About Viraj Patil: Personal Story & Maharashtra Roots */}
      <AboutMe />

      {/* 9. Comparison: Big Agency vs Working Directly With Viraj */}
      <Comparison />

      {/* 10. Trust Basics: Delivery Timelines, Refund/Satisfaction Terms, Privacy */}
      <TrustPolicies />

      {/* 11. FAQ: Plain-language answers (works on simple phone? non-technical owner?) */}
      <FAQ />

      {/* 12. Contact Hub: Direct WhatsApp, Call, Location & Quick Inquiry */}
      <Contact />

      {/* 13. Footer */}
      <Footer />

      {/* 14. Mobile Bottom Conversion Dock */}
      <MobileBottomDock />
    </div>
  );
}

export default HomePage;
