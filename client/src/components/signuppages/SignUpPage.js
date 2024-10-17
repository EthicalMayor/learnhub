import React, { useState } from 'react';
import { 
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup ,
  updateProfile,
  GoogleAuthProvider
 } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;


      // Extract name parts from Google Display name

      const nameParts = user.displayName?.split(' ') || ['', ''];
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];

      // send user data to backend
      await fetch('http://localhost:8080/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: user.email,
        }),
      });
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email,
        formData.password
      );
      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Send additional user data to your server


      await fetch('http://localhost:8080/api/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await userCredential.user.getIdToken()}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          dob: {
            month: parseInt(formData.dobMonth, 10),
            day: parseInt(formData.dobDay, 10),
            year: parseInt(formData.dobYear, 10),
          },
        }),
      });

      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Join LearnHub.</h1>
        <h2 className="text-3xl font-bold text-center mb-6 text-black">Learn. Connect. Collaborate.</h2>

        <div className="space-y-4 mb-6">
          <button
            onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <FontAwesomeIcon icon={faGoogle} style={{ color: '#DB4437' }} className="h-5 w-5 mr-2" />
                Continue with Google
              </button>    
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input 
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input 
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <div className="flex space-x-2">
              <select
                name="dobMonth"
                value={formData.dobMonth}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                ))}
              </select>

              <select
                name="dobDay"
                value={formData.dobDay}
                onChange={handleChange}
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
                name="dobYear"
                value={formData.dobYear}
                onChange={handleChange}
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
          </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Sign Up
            </button>
          </form>
        

        <p className="mt-4 text-xs text-gray-500 text-center">
          Your name and photo are displayed to users who invite you to a workspace using your email.
        </p>
        <p className="mt-4 text-xs text-gray-500 text-center">
          By signing up, you agree to out Terms of Service and Privacy Policy.
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
