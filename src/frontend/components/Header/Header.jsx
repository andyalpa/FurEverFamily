import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../features/ThemeContext';

const Header = () => {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Dynamic text content for hero section
  const heroContent = {
    title: "Find Your Perfect Furry Friend",
    subtitle: "Every pet deserves a loving home. Start your journey to find your perfect companion today.",
    stats: [
      { number: "1000+", label: "Pets Available" },
      { number: "500+", label: "Happy Families" },
      { number: "50+", label: "Partner Shelters" }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`relative w-full ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Background Image Container with Responsive Height */}
      <div className="relative h-[100vh] md:h-[80vh] lg:h-[90vh] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/Banner.jpeg"
            alt="Happy pets"
            className="w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gray-900/70'
              : 'bg-gradient-to-r from-white/80 to-white/50'
          }`} />
        </div>

        {/* Content Container with Responsive Padding */}
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
          <div className="max-w-4xl mt-16 md:mt-0">
            {/* Main Title */}
            <h1 
              className={`text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-text'
              }`}
              data-aos="fade-up"
            >
              {heroContent.title}
            </h1>

            {/* Subtitle */}
            <p 
              className={`text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {heroContent.subtitle}
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 mb-12 md:mb-16"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link
                to="/adopt"
                className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 flex items-center gap-2 group"
              >
                Find a Pet
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                to="/blog"
                className="btn-ghost text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {heroContent.stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 md:p-6 rounded-2xl backdrop-blur-sm ${
                    theme === 'dark'
                      ? 'bg-gray-800/50'
                      : 'bg-white/50'
                  }`}
                >
                  <div className={`text-2xl md:text-3xl font-bold mb-1 md:mb-2 ${
                    theme === 'dark' ? 'text-primary' : 'text-primary'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-[30px] md:h-[50px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={theme === 'dark' ? 'fill-gray-900' : 'fill-white'}
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header; 