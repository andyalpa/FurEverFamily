import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../features/firebase';
import { useNavigate } from 'react-router-dom';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full px-12 transition-opacity duration-500 opacity-100">
      {/* Header */}
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Sign In</h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don’t have an account?{' '}
        <a href="/signuppage" className="text-blue-600 hover:text-blue-700 hover:underline" title="Sign Up">
          Sign up here
        </a>
      </p>

      {/* Form */}
      <form onSubmit={handleLogin} className="my-8 text-sm">
        {/* Email Field */}
        <div className="flex flex-col my-4">
          <label htmlFor="email" className="text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col my-4">
          <label htmlFor="password" className="text-gray-700">Password</label>
          <div className="relative flex items-center mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                </svg>
              )}
            </button>
          </div>
          <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline text-sm mt-2">
            Forgot password?
          </a>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember_me"
            id="remember_me"
            className="mr-2 focus:ring-0 rounded"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember_me" className="text-gray-700">Remember me</label>
        </div>

        {/* Sign In Button */}
        <div className="my-4 flex items-center justify-end space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">
            Sign In
          </button>
        </div>
      </form>

      {/* Separator */}
      <div className="flex items-center justify-between">
        <div className="w-full h-[1px] bg-gray-300"></div>
        <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>

      {/* Social Media Buttons */}
      <div className="text-sm">
        <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            {/* Replace with actual Google SVG paths */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L17.42 12h-3.17v2h2.58l-.59 2H12v-2H9v-2h3V9.58c0-1.42 1.16-2.58 2.58-2.58h1.41v2.58z" />
          </svg>
          <span>Sign in with Google</span>
        </a>
        <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            {/* Replace with actual Facebook SVG paths */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 9.27h-2.54v6.73H11.5v-6.73H10V8.73h1.5V7.27c0-1.48 1.02-2.77 2.5-2.77h1.54v2.54h-1.04c-.58 0-1 .42-1 1v1.19h2l-.33 2.54z" />
          </svg>
          <span>Sign in with Facebook</span>
        </a>
        <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            {/* Replace with actual LinkedIn SVG paths */}
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15.5H8v-6h2v6zm-1-6.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm7 6.75h-2v-3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v3h-2v-6h2v1.09c.33-.51.83-.84 1.5-.84 1.1 0 2 .9 2 2v3.75z" />
          </svg>
          <span>Sign in with LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export default SignInForm;