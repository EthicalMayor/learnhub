import React from 'react';
import Header from './Header.js';
import HeroSection from './HeroSection.js';
import TrustedBySection from './TrustedBySection.js';


function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <HeroSection />
      <TrustedBySection />

    
    </div>
  );
}

export default LandingPage;
