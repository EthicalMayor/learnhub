import React from 'react';
import logo from '../../assets/1726704469_646dfaf260a34b96ac947c9ac4307ca6.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => (
  <header className="flex justify-between items-center p-2 bg-white">
    <div className="flex items-center">
      <img src={logo} alt="LearnHub Logo" className="h-10 w-auto mr-0" />
      <h1 className="text-lg font-bold text-black ml-1">LearnHub</h1>
    </div>
    <nav className="flex w-full justify-between items-center">
      <div className="flex space-x-2 ml-8">
        {/* Product Dropdown */}
        <div className="relative group">
          <a href="#" className="text-black text-xs font-bold hover:bg-gray-100 flex items-center px-1 py-1">
            Product <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
          </a>
          <div className="absolute hidden group-hover:block bg-white shadow-md mt-1 rounded w-40">
            <div className="flex flex-col">
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Documents</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Resource Vault</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Video Conferencing</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Chats</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Tasks</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Calendars</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Timeline Gist</a>
            </div>
          </div>
        </div>

        {/* Colleges Dropdown */}
        <div className="relative group">
          <a href="#" className="text-black text-xs font-bold hover:bg-gray-100 flex items-center px-1 py-1">
            Colleges <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
          </a>
          <div className="absolute hidden group-hover:block bg-white shadow-md mt-1 rounded w-40">
            <div className="flex flex-col">
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>College News</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Career Hunt</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Study Groups by College</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Inter-College Collabos</a>
            </div>
          </div>
        </div>

        {/* Gengs Dropdown */}
        <div className="relative group">
          <a href="#" className="text-black text-xs font-bold hover:bg-gray-100 flex items-center px-1 py-1">
            Gengs <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
          </a>
          <div className="absolute hidden group-hover:block bg-white shadow-md mt-1 rounded w-40">
            <div className="flex flex-col">
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>The Geng</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Join the Geng</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Peer Tutors</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Collabo with The Geng</a>
            </div>
          </div>
        </div>

        {/* Pricing Dropdown */}
        <div className="relative group">
          <a href="#" className="text-black text-xs font-bold hover:bg-gray-100 flex items-center px-1 py-1">
            Pricing <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 text-xs ml-1" />
          </a>
          <div className="absolute hidden group-hover:block bg-white shadow-md mt-1 rounded w-40">
            <div className="flex flex-col">
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Basic Plan</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Pro Plan</a>
              <a href="#" className="block px-4 py-1 text-sm text-black font-normal hover:bg-gray-100 w-full" style={{ fontFamily: 'Times New Roman', fontSize: '0.75rem' }}>Premium Plan</a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 ml-auto">
        <a href="#" className="text-black text-xs font-bold hover:bg-gray-100 px-2 py-1">Request a Demo</a>
        <span className="text-gray-300 text-xs font-bold">|</span>
        <a href="#" className="text-black text-xs font-bold hover:bg-gray-100 px-2 py-1">Login</a>
        <a href="#" className="bg-black text-white rounded-md py-1 px-2 text-xs font-bold">Get LearnHub Free</a>
      </div>
    </nav>
  </header>
);

export default Header;
