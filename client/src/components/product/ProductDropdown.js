import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

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
    icon: <Users className="w-5 h-5 text-gray-600" />,
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
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-black text-sm lg:text-base font-bold hover:text-gray-600 transition duration-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Products
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-[400px] bg-white shadow-lg rounded-lg border border-gray-200 p-2">
          <div className="grid grid-cols-2 gap-2">
            {PRODUCTS.map((product) => (
              <Link
                key={product.name}
                to={product.href}
                className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
              >
                <span className="text-xl mr-3">{product.icon}</span>
                <div>
                  <h3 className="font-sans font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs font-sans font-normal">
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

 