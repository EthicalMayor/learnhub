import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { FaGoogle, FaApple } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const SignUpPage = () => {
  const { t, i18n } = useTranslation();
  const [error, setError] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      const data = await response.json();
      console.log('Sign-up successful!', data);
    } catch (error) {
      setError(error.message);
      console.error('Sign-up failed:', error);
    }
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google sign-up successful:', response);
  };

  const handleGoogleFailure = (error) => {
    console.error('Google sign-up failed:', error);
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleFailure,
  });

  const handleAppleSignUp = () => {
    console.log('Sign up with Apple');
  };

  const handleSSOSignUp = () => {
    console.log('Sign up with SSO');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className={`flex items-center justify-between w-full p-4 max-w-4xl ${isScrolled ? 'border-b' : ''}`}>
          <div className="flex items-center">
            <img src={logo} alt="LearnHub Logo" className="h-10 w-auto" />
            <span className="mx-2 text-gray-700">|</span>
            <select
              className={`text-gray-700 capitalize rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isScrolled ? 'shadow-lg' : ''}`}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              defaultValue={i18n.language}
            >
              {/* Add all language options */}
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="es-LA">Español (Latin America)</option>
              <option value="de">Deutsch</option>
              <option value="nl">Nederlands</option>
              <option value="zh">简体中文</option>
              <option value="zh-TW">繁體中文</option>
              <option value="pt">Português</option>
              <option value="ko">한국어</option>
              <option value="ar">العربية</option>
              <option value="da">Dansk</option>
              <option value="fi">Suomi</option>
              <option value="sv">Svenska</option>
              <option value="no">Norsk</option>
              <option value="ja">日本語</option>
              <option value="yo">Yorùbá</option>
              <option value="ig">Igbo</option>
              <option value="ha">Hausa</option>
            </select>
          </div>
        </div>

        {isScrolled && <hr className="my-4 w-full border-gray-300" />}

        <h1 className="text-3xl font-bold mb-6">{t('sign_up')}</h1>
        <p className="text-gray-600 mb-8">{t('Join us and start learning today!')}</p>

        <form onSubmit={handleEmailSignUp} className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t('email_placeholder')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              {t('password')}
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
            {t('sign_up')}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>

        <div className="my-4 text-gray-600">or</div>

        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={loginWithGoogle}
            className="flex items-center justify-center bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-200 w-full"
          >
            <FaGoogle className="mr-2" />
            {t('sign_up_with_google')}
          </button>
          <button
            onClick={handleAppleSignUp}
            className="flex items-center justify-center bg-black text-white font-bold py-2 rounded hover:bg-gray-800 transition duration-200 w-full"
          >
            <FaApple className="mr-2" />
            {t('sign_up_with_apple')}
          </button>
          <button
            onClick={handleSSOSignUp}
            className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200 w-full"
          >
            {t('sign_up_with_sso')}
          </button>
        </div>

        <div className="mt-6 w-full">
          <p className="text-sm text-gray-600">
            {t('By signing up, you agree to our')}
            <button 
              onClick={() => {/* Handle navigation to terms */}} 
              className="text-blue-600 underline"
            >
              {t('Terms & Conditions')}
            </button>
            {' | '}
            <button 
              onClick={() => {/* Handle navigation to privacy policy */}} 
              className="text-blue-600 underline"
            >
              {t('Privacy Policy')}
            </button>.
          </p>
        </div>

        <footer className="mt-auto w-full bg-gray-100 p-4">
          <p className="text-center text-gray-600 text-sm">© 2024 LearnHub. All rights reserved.</p>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUpPage
