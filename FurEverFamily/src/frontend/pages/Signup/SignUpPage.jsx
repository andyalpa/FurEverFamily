import React from 'react';
import SignUpForm from './SignUpForm.jsx';
import BackgroundSection from './BackgroundSection';
import { useLocation } from 'react-router-dom';

function SignUpPage() {
  const location = useLocation();
  const slideDirection = location.state?.from === '/signinpage' ? 'slide-in-right' : '';

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full h-screen flex items-center justify-center">
        <div className={`w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 h-full bg-white flex items-center justify-center ${slideDirection}`}>
          <SignUpForm />
        </div>
        <BackgroundSection />
      </div>
    </div>
  );
}

export default SignUpPage;