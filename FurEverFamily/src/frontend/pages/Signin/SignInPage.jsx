import React from 'react';
import SignInForm from './SignInForm';
import BackgroundSection from './BackgroundSection';

function SignInPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full h-screen flex items-center justify-center">
        <BackgroundSection />
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 h-full bg-white flex items-center justify-center transition-transform duration-500 transform">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;