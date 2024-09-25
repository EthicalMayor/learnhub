import React from 'react';
import { GoogleLogo, AppleLogo, MicrosoftLogo } from './logos'; // Import logos as needed

const LoginPage = () => {
  const handleGoogleLogin = () => {
    console.log('Google login initiated');
  };

  const handleAppleLogin = () => {
    console.log('Apple login initiated');
  };

  const handleMicrosoftLogin = () => {
    console.log('Microsoft login initiated');
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img src="/path/to/openai-logo.png" alt="OpenAI Logo" className="mb-4" /> {/* Replace with your logo path */}
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      <form onSubmit={handleEmailLogin} className="bg-white p-6 rounded shadow-md w-96">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-200 text-black font-bold py-2 rounded hover:bg-gray-300 transition duration-200 w-full"
        >
          Continue
        </button>
      </form>

      <div className="my-4 text-gray-600">or</div>

      <div className="flex flex-col gap-2 w-96">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center bg-gray-200 text-black font-bold py-2 rounded hover:bg-gray-300 transition duration-200 w-full"
        >
          <img src={GoogleLogo} alt="Google Logo" className="w-5 h-5 mr-2" /> {/* Google logo */}
          Continue with Google
        </button>

        <button
          onClick={handleMicrosoftLogin}
          className="flex items-center justify-center bg-gray-200 text-black font-bold py-2 rounded hover:bg-gray-300 transition duration-200 w-full"
        >
          <img src={MicrosoftLogo} alt="Microsoft Logo" className="w-5 h-5 mr-2" /> {/* Microsoft logo */}
          Continue with Microsoft Account
        </button>

        <button
          onClick={handleAppleLogin}
          className="flex items-center justify-center bg-gray-200 text-black font-bold py-2 rounded hover:bg-gray-300 transition duration-200 w-full"
        >
          <img src={AppleLogo} alt="Apple Logo" className="w-5 h-5 mr-2" /> {/* Apple logo */}
          Continue with Apple
        </button>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 underline">Sign Up</a>
        </p>
        <p className="text-sm text-gray-600">
          <a href="/terms" className="text-blue-600 underline">Terms of Use</a> | <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
