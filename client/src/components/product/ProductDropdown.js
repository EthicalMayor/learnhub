import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const PRODUCTS = [
  {
    name: 'Documents',
    description: 'Collaborative document creation and sharing',
    icon: '📄',
    href: '/products/documents',
  },
  {
    name: 'Video Conferencing',
    description: 'Seamless virtual meetings and collaboration',
    icon: '🎥',
    href: '/products/video-conferencing',
  },
  {
    name: 'Resource Hub',
    description: 'Centralized knowledge management',
    icon: '📚',
    href: '/products/resource-hub',
  },
  {
    name: 'Gengs',
    description: 'Creative collaboration and brainstorming',
    icon: '💡',
    href: '/products/gengs',
  },
  {
    name: 'Tasks',
    description: 'Project management and workflow tracking',
    icon: '✅',
    href: '/products/tasks',
  },
  {
    name: 'Calendars',
    description: 'Scheduling and time arrangement',
    icon: '📅',
    href: '/products/calendars',
  },
];

const ProductDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center text-gray-700 hover:text-black transition-colors duration-200 font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Products
        <ChevronDown className="ml-2" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-4 w-screen max-w-4xl bg-white shadow-2xl rounded-lg border border-gray-100 overflow-hidden"
          role="menu"
        >
          <div className="grid grid-cols-3 gap-4 p-6">
            {PRODUCTS.map((product) => (
              <Link
                key={product.name}
                to={product.href}
                className="group p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-start"
              >
                <div className="text-3xl mr-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {product.icon}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDropdown;
