import React from 'react';

function App() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gray-50 shadow-md">
        <h1 className="text-4x1 font-bold">LearnHub</h1>
        <nav>
          <a href="#" className="text-gray-700 px-4">Product</a>    
          <a href="#" className="text-gray-700 px-4">Colleges</a>    
          <a href="#" className="text-gray-700 px-4">Gengs</a>    
          <a href="#" className="text-gray-700 px-4">Tech Cohorts</a>    
          <a href="#" className="text-gray-700 px-4">Download</a>    
          <a href="#" className="text-gray-700 px-4">Pricing</a>    
        </nav>
      </header>
    </div>
  )
}

export default App;