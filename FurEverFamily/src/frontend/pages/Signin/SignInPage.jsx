import React, { useEffect } from 'react';
import SignInForm from './SignInForm';
import BackgroundSection from './BackgroundSection';
import { useLocation } from 'react-router-dom';

function SignInPage() {
  const location = useLocation();
  const slideDirection = location.state?.from === '/signuppage' ? 'slide-in-left' : '';

  useEffect(() => {
    // Add animation classes to the document
    const style = document.createElement('style');
    style.textContent = `
      .slide-in-left {
        animation: slideInLeft 0.5s ease-out forwards;
      }
      
      .slide-in-right {
        animation: slideInRight 0.5s ease-out forwards;
      }
      
      @keyframes slideInLeft {
        from {
          transform: translateX(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <BackgroundSection />
        <div className={`w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 h-full bg-white flex items-center justify-center shadow-xl ${slideDirection}`}>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;