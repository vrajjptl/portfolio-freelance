// src/components/HomePage.tsx
import React from 'react';
import Hero from './Hero';
import Services from './Services';
import SampleWork from './SampleWork';
import HowItWorks from './HowItWorks';
import PricingPackages from './PricingPackages';
import AboutCompany from './AboutCompany';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';
import MobileBottomDock from './MobileBottomDock';

function HomePage() {
  return (
    <div className="flex-1">
      {/* 1. Hero: DeliverNow Value Proposition, Honest Numbers, 3D Core */}
      <Hero />

      {/* 2. Services: Core Digital Offerings with Built-in Industry Tags */}
      <Services />

      {/* 3. Sample Work: Interactive Live Concept Demos */}
      <SampleWork />

      {/* 4. How It Works: Simple 4-Step Transparent Milestone Process */}
      <HowItWorks />

      {/* 5. Pricing: 3 Tailored Packages (Starter, Business, Custom POS/App) */}
      <PricingPackages />

      {/* 6. About DeliverNow: Dedicated Technology Partner */}
      <AboutCompany />

      {/* 7. FAQ: Plain-Language Answers */}
      <FAQ />

      {/* 8. Contact Hub: Direct WhatsApp, Call & Quick Inquiry */}
      <Contact />

      {/* 9. Footer: Clean DeliverNow Info */}
      <Footer />

      {/* 10. Mobile Bottom Dock: Quick Access for Handheld Devices */}
      <MobileBottomDock />
    </div>
  );
}

export default HomePage;
