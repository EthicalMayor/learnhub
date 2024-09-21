import React from 'react';

const HeroSection = () => (
  <section className="bg-white py-8"> {/* Reduced padding on the y-axis */}
    <div className="container mx-auto px-4">
      <div className="text-left ml-12 sm:ml-8"> 
        <h1 className="text-6xl sm:text-7xl font-extrabold text-black mb-2 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.2' }}>
          Learn. Connect
        </h1>
        <h1 className="text-6xl sm:text-7xl font-extrabold text-black mb-4 leading-tight" style={{ fontFamily: 'Montserrat, sans-serif', lineHeight: '1.2' }}>
          Collaborate.
        </h1>
        <p className="text-lg sm:text-xl text-black font-bold mb-6" style={{ fontFamily: 'Times New Roman' }}> {/* Reduced margin-bottom */}
          Learn with ease, connect with peers, and collaborate beyond limits.
        </p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"> {/* Reduced space-y */}
          <a href="#" className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}> {/* Reduced padding */}
            Get LearnHub Free
          </a>
          <a href="#" style={{ backgroundColor: '#E1F5FE', color: '#0D47A1', padding: '0.5rem 1.5rem', borderRadius: '0.375rem', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>
            Request a Demo
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
