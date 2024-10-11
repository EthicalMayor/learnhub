import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../../services/authService';
import { Globe } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Log in with email:', email);
    console.log('Password:', password);
    navigate('/dashboard');
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const result = await googleAuth(token);
      alert(result.msg);
      navigate('/dashboard');
    } catch (error) {
      setError(error.msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Think it. Make it.</h1>
        <h2 className="text-xl text-center mb-6">Log in to your LearnHub account</h2>
        
        <div className="space-y-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onFailure={(error) => setError('Login failed: ' + error)}
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Continue with Google
              </button>
            )}
          />
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password..."
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

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your name and photo are displayed to users who invite you to a workspace using your email
        </p>
      </div>
      <div className="mt-4 relative">
        <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <select
          value={language}
          onChange={handleLanguageChange}
          className="text-sm text-gray-500 bg-transparent pl-8 pr-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option>English</option>
          <option>Español</option>
          <option>Français</option>
          <option>Deutsch</option>
          <option>日本語</option>
        </select>
      </div>
    </div>
  );
};

export default LoginPage;