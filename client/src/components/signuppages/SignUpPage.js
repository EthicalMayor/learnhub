import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';

import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobYear, setDobYear] = useState('');
  const navigate = useNavigate();

  // Event handlers for input changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleDobMonthChange = (e) => {
    setDobMonth(e.target.value);
  };

  const handleDobDayChange = (e) => {
    setDobDay(e.target.value);
  };

  const handleDobYearChange = (e) => {
    setDobYear(e.target.value);
  };

    // Submit handler for email signup
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Sign up with email:', email);
  
      try {
        const response = await fetch('/api/signup', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            firstName, 
            lastName, 
            email, 
            password, 
            dob: { month: dobMonth, day: dobDay, year: dobYear }
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log(data.msg);
          // Store the access token in localStorage
          localStorage.setItem('accessToken', data.access_token);
          navigate('/dashboard');
        } else {
          console.error(data.msg);
          alert(data.msg); 
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error occurred during signup. Please try again.'); 
      }
    };

  // Google login handler
  const handleGoogleLogin = async (credentialResponse) => {
    console.log('Google token:', credentialResponse.credential);

    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.msg);
        // Store the access token in localStorage
        localStorage.setItem('accessToken', data.access_token);
        navigate('/dashboard');
      } else {
        console.error(data.msg);
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred during Google login. Please try again.'); 
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Learn. Connect. Collaborate.</h1>
        <div className="space-y-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onFailure={(error) => console.error('Login failed:', error)}
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} className="h-5 w-5 mr-2" />
                Continue with Google
              </button>
            )}
          />
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <FontAwesomeIcon icon={faApple} className="h-5 w-5 mr-2" />
            Continue with Apple
          </button>
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Single sign-on (SSO)
          </button>
        </div>

        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="Enter your first name..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />

            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mt-4">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Enter your last name..."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Date of Birth
            </label>
            <div className="flex space-x-2">
              <select
                value={dobMonth}
                onChange={handleDobMonthChange}
                className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Month</option>
                {/* Month options */}
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>

              <select
                value={dobDay}
                onChange={handleDobDayChange}
                className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Day</option>
                {/* Day options */}
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>

              <select
                value={dobYear}
                onChange={handleDobYearChange}
                className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Year</option>
                {/* Year options */}
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={2023 - i}>{2023 - i}</option>
                ))}
              </select>
            </div>

            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">
              Work Email
            </label>
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

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your name and photo are displayed to users who invite you to a workspace using your email.
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

export default SignUpPage;
