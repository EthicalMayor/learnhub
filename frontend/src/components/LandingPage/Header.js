import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Header = () => {
  // State to control mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="flex justify-between items-center bg-white py-2 px-4">
      <div className="flex items-center">
        <Link to="/"> {/* Make logo clickable to return to landing page */}
          <img src={logo} alt="LearnHub Logo" className="h-10 w-auto mr-0" />
        </Link>
        <h1 className="text-lg font-bold text-black ml-1">LearnHub</h1>
      </div>

      {/* Hamburger Menu Icon for mobile */}
      <div className="block md:hidden">
        <button onClick={toggleMobileMenu} className="text-black focus:outline-none">
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
        </button>
      </div>

      {/* Full Navigation for larger screens */}
      <nav className="hidden md:flex w-full justify-between items-center">
        <div className="flex space-x-2 ml-8">
          {/* Product Dropdown */}
          <div className="relative group">
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 flex items-center px-1 py-1">
              Product <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-1 rounded w-40">
              <div className="flex flex-col">
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Documents</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Resource Vault</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Video Conferencing</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Chats</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Tasks</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Calendars</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Timeline Gist</Link>
              </div>
            </div>
          </div>

          {/* Colleges Dropdown */}
          <div className="relative group">
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 flex items-center px-1 py-1">
              Colleges <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-1 rounded w-40">
              <div className="flex flex-col">
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>College News</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Career Hunt</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Study Groups by College</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Inter-College Collabos</Link>
              </div>
            </div>
          </div>

          {/* Gengs Dropdown */}
          <div className="relative group">
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 flex items-center px-1 py-1">
              Gengs <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-1 rounded w-40">
              <div className="flex flex-col">
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>The Geng</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Join the Geng</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Peer Tutors</Link>
                <Link to="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Collabo with The Geng</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 px-2 py-1">Request a Demo</Link>
          <span className="text-gray-300 text-xs font-bold">|</span>
          {/* Update Login link to use Link component */}
          <Link to="/login" className="text-black text-xs font-bold hover:bg-gray-100 px-2 py-1">
            Login
          </Link>
          <Link to="/signup" className="bg-black text-white rounded-md py-1 px-2 text-xs font-bold">Get LearnHub Free</Link> {/* Link to Sign Up page */}
        </div>
      </nav>

      {/* Mobile Navigation for smaller screens */}
      {isMobileMenuOpen && (
        <nav className="absolute top-14 left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col space-y-1 p-4">
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 px-1 py-1">Product</Link>
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 px-1 py-1">Colleges</Link>
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 px-1 py-1">Gengs</Link>
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 px-1 py-1">Pricing</Link>
            <Link to="#" className="text-black text-xs font-bold hover:bg-gray-100 px-1 py-1">Request a Demo</Link>
            <Link to="/login" className="text-black text-xs font-bold hover:bg-gray-100 px-1 py-1">Login</Link>
            <Link to="/signup" className="bg-black text-white rounded-md py-1 px-2 text-xs font-bold">Get LearnHub Free</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
