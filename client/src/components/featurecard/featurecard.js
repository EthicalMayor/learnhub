import React from 'react';

const FeatureCard = ({ title, description, icon: Icon }) => (
  <div className="text-center bg-gray-800 bg-opacity-50 p-6 rounded-lg transform hover:scale-105 transition duration-300">
    <div className="text-blue-400 mb-4">
      <Icon /> {/* Render the icon as a component */}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default FeatureCard;
