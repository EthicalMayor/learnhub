import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';

const SignUpPage = () => {
  const handleGoogleSignUp = () => {
    // Handle Google sign-up logic
    console.log("Sign up with Google");
  };

  const handleAppleSignUp = () => {
    // Handle Apple sign-up logic
    console.log("Sign up with Apple");
  };

  const handleSSOSignUp = () => {
    // Handle SSO sign-up logic
    console.log("Sign up with SSO");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold mb-4">Sign Up for LearnHub</h1>
      <p className="text-gray-600 mb-8">Join us and start learning today!</p>

      <div className="flex flex-col space-y-4 w-80">
        <button
          onClick={handleGoogleSignUp}
          className="flex items-center justify-center bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-200"
        >
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Sign Up with Google
        </button>

        <button
          onClick={handleAppleSignUp}
          className="flex items-center justify-center bg-black text-white font-bold py-2 rounded hover:bg-gray-800 transition duration-200"
        >
          <FontAwesomeIcon icon={faApple} className="mr-2" />
          Sign Up with Apple
        </button>

        <button
          onClick={handleSSOSignUp}
          className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Sign Up with SSO
        </button>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log In</a></p>
      </div>
    </div>
  );
};

export default SignUpPage;
