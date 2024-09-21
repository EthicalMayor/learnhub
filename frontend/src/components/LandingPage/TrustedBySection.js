import React from 'react';

const TrustedBySection = () => (
  <section className="bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="text-left ml-12 sm:ml-8"> {/* Same left margin as HeroSection */}
        <h2 className="text-lg font-bold text-black mb-4" style={{ fontFamily: 'Times New Roman' }}>
          Trusted by teams at:
        </h2>
        <div className="flex space-x-8">
          <span>Toyota</span>
          <span>Figma</span>
          <span>Spotify</span>
          <span>Discord</span>
        </div>
      </div>
    </div>
  </section>
);

export default TrustedBySection;
