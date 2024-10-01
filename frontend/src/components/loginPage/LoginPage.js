import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Log in with email:', email);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Think it. Make it.</h1>
        <h2 className="text-xl text-center mb-6">Log in to your LearnHub account</h2>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Camera className="h-5 w-5 mr-2" /> {/* Replace with Google icon */}
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Camera className="h-5 w-5 mr-2" /> {/* Replace with Apple icon */}
            Continue with Apple
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Single sign-on (SSO)
          </button>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Use an organization email to easily collaborate with teammates
            </p>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue
            </button>
          </form>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your name and photo are displayed to users who invite you to a workspace using your email
        </p>
      </div>
      <div className="mt-4">
        <select className="text-sm text-gray-500 bg-transparent">
          <option>English</option>
          {/* Add other language options here */}
        </select>
      </div>
    </div>
  );
};

export default LoginPage;