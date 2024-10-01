import React, { useState } from 'react';
import { BookOpen, Camera, Laptop } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoo.png';
import logo1 from '../../assets/mit.jpg';
import logo2 from '../../assets/Harvard.jpg';
import logo3 from '../../assets/stanford.jpg';
import logo4 from '../../assets/yale.jpg';
import logo5 from '../../assets/ALX.jpg';
import backgroundImage from '../../assets/background.jpg';

const LearnHubLandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
    
  const logos = [
    { src: logo1, name: 'MIT' },
    { src: logo2, name: 'Harvard' },
    { src: logo3, name: 'Stanford' },
    { src: logo4, name: 'Yale' },
    { src: logo5, name: 'ALX' },
  ];
  
  

  return (
    <div className="relative font-sans text-white" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      {/* Overlay for text readability */}
      <div className="absolute inset-0  z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-0">
        {/* Header Section */}
        <header className="">
          <div className="container mx-auto flex justify-between items-center py-4 px-4">
            <div className="flex items-center">
              <Link to="/">
                <img src={logo} alt="LearnHub Logo" className="h-11 w-16 mr-2 filter brightness-100" />
              </Link>
              <h1 className="text-lg font-bold text-white ml-1">LearnHub</h1>
            </div>

            {/* Hamburger Menu Icon for mobile */}
            <div className="block md:hidden">
              <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
              </button>
            </div>

            {/* Full Navigation for larger screens */}
            <nav className="hidden md:flex w-full justify-between items-center">
              <div className="flex space-x-4 ml-8">
                <NavDropdown title="Product" items={['Documents', 'Resource Vault', 'Video Conferencing', 'Chats' , 'Tasks', 'Calendars']} />
                <NavDropdown title="Colleges" items={['College News', 'Career Hunt']} />
                <NavDropdown title="Gengs" items={['The Geng', 'Join the Geng']} />
              </div>

              <NavDropdown
                  title="Product"
                  items={[
                    { title: 'Documents', path: '/documents' },
                    { title: 'Resource Vault', path: '/resource-vault' },
                    { title: 'Video Conferencing', path: '/video-conferencing' },
                    { title: 'Chats', path: '/chats' },
                    { title: 'Tasks', path: '/tasks' },
                    { title: 'Calendars', path: '/calendars' },
                  ]}
                />

              <div className="flex items-center space-x-4 ml-auto">
                <Link to="/request-demo" className="text-white text-xs font-bold hover:text-gray-300 transition duration-300">Request a Demo</Link>
                <span className="text-gray-500 text-xs font-bold">|</span>
                <Link to="/login" className="text-white text-xs font-bold hover:text-gray-300 transition duration-300">Login</Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full py-2 px-4 text-xs font-bold transition duration-300">Get LearnHub Free</Link>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation for smaller screens */}
          {isMobileMenuOpen && (
            <nav className="md:hidden">
              <div className="container mx-auto px-4 py-2">
                <MobileNavItem title="Product" items={['Documents', 'Resource Vault', 'Video Conferencing', 'Chats', 'Tasks', 'Calendars']} />
                <MobileNavItem title="Colleges" items={['College News', 'Career Hunt']} />
                <MobileNavItem title="Gengs" items={['The Geng', 'Join the Geng']} />
                <Link to="/login" className="block py-2 text-white hover:bg-gray-800">Login</Link>
                <Link to="/signup" className="block py-2 bg-blue-600 text-white hover:bg-blue-700 rounded mt-2">Get LearnHub Free</Link>
              </div>
            </nav>
          )}
        </header>

        {/* Hero Section */}
        <section className="text-center py-24 px-4">
          <h1 className="text-6xl font-bold mb-6 text-white">Learn. Connect. Dream.</h1>
          <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
            Learning only gets better with LearnHub. With help from friends.
          </p>
          <div className="space-x-4">
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-bold transition duration-300">Get LearnHub free</Link>
            <button className="border border-white hover:bg-white hover:text-black px-8 py-3 rounded-full text-lg font-bold transition duration-300">Request a demo</button>
          </div>
          
      {/* Trusted by Section */}
      <p className="mt-16 text-lg text-gray-400 font-bold">Trusted by teams at</p>
<div className="flex justify-center space-x-8 mt-8">
  {logos.map((logo, index) => (
    <div key={index} className="flex items-center">
      <div className="w-24 h-8 rounded flex items-center justify-center">
        <img src={logo.src} alt={`Logo of ${logo.name}`} className="h-full object-contain" />
      </div>
      <span className="ml-0 font-bold text-sm text-white">{logo.name}</span> {/* Updated color to white and margin to left */}
    </div>
  ))}
</div>

        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-white">Study, organize, and grow alongside your peers.</h2>
            <p className="text-xl mb-16 text-center text-gray-300">
              Collaborate in a geng and unleash your creativity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard title="Video Conferencing" description="Engage with friends and enjoy reading sessions via conferencing." icon={<Camera size={32} />} />
              <FeatureCard title="Collaborative tools" description="Built for teams and gengs to share, suggest, and comment." icon={<Laptop size={32} />} />
              <FeatureCard title="Tasks" description="Achieve your goals and update friends on your progress." icon={<BookOpen size={32} />} />
            </div>
            <button className="mt-16 block mx-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-bold transition duration-300">Explore more exciting features →</button>
          </div>
        </section>
      </div>
    </div>
  );
};

// NavDropdown Component
const NavDropdown = ({ title, items }) => (
  <div className="relative group">
    <button className="text-white text-xs font-bold hover:text-gray-300 flex items-center px-2 py-1 transition duration-300">
      {title} <FontAwesomeIcon icon={faCaretDown} className="text-gray-400 text-xs ml-1" />
    </button>
    <div className="absolute hidden group-hover:block bg-black bg-opacity-90 shadow-lg mt-1 rounded w-48">
      <div className="py-1">
        {items.map((item, index) => (
          <Link key={index} to={`/${item.toLowerCase().replace(' ', '-')}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white w-full transition duration-300">
            {item}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

// MobileNavItem Component
const MobileNavItem = ({ title, items }) => (
  <div className="py-2">
    <button className="flex justify-between items-center w-full py-2 text-white hover:bg-gray-800">
      {title}
      <FontAwesomeIcon icon={faCaretDown} />
    </button>
    <div className="pl-4">
      {items.map((item, index) => (
        <Link key={index} to={`/${item.toLowerCase().replace(' ', '-')}`} className="block py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
          {item}
        </Link>
      ))}
    </div>
  </div>
);

// FeatureCard Component
const FeatureCard = ({ title, description, icon }) => (
  <div className="text-center bg-gray-800 bg-opacity-50 p-6 rounded-lg transform hover:scale-105 transition duration-300">
    <div className="text-blue-400 mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default LearnHubLandingPage;