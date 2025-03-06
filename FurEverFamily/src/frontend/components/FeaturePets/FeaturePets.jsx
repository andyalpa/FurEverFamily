import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { mockPetDetails } from '../../Mock API/mockData';
import { useTheme } from '../../features/ThemeContext';

const FeaturePets = () => {
  const { theme } = useTheme();
  const [featuredPets, setFeaturedPets] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    // Select pets with high-quality photos and complete profiles
    const featured = mockPetDetails
      .filter(pet => pet.status === 'available')
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setFeaturedPets(featured);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex(current => (current + 1) % featuredPets.length);
  }, [featuredPets.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex(current => 
      current === 0 ? featuredPets.length - 1 : current - 1
    );
  }, [featuredPets.length]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && featuredPets.length > 0) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, featuredPets.length]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  if (featuredPets.length === 0) {
    return null;
  }

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className={`text-3xl font-heading font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-text'
              }`}>
                Featured Pets
              </h2>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Meet our adorable pets looking for their forever homes
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`p-2 rounded-full transition-colors ${
                  theme === 'dark'
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-100'
                }`}
                aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlaying ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                width: `${featuredPets.length * 100}%`,
              }}
            >
              {featuredPets.map((pet, index) => (
                <div
                  key={pet.pet_id}
                  className="relative w-full"
                  style={{ flexBasis: `${100 / featuredPets.length}%` }}
                >
                  <div className="relative aspect-w-21 aspect-h-9">
                    <img
                      src={pet.large_results_photo_url}
                      alt={pet.pet_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            theme === 'dark' ? 'bg-primary/20 text-primary' : 'bg-primary text-white'
                          }`}>
                            {pet.breed}
                          </span>
                          <span className="text-white text-sm">
                            {pet.age} • {pet.addr_city}, {pet.addr_state_code}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-heading font-bold text-white mb-4">
                          {pet.pet_name}
                        </h3>
                        
                        <p className="text-gray-200 mb-6 line-clamp-2">
                          {pet.description}
                        </p>

                        <div className="flex items-center gap-6">
                          <Link
                            to={`/pet/${pet.pet_id}`}
                            className="btn-primary"
                          >
                            Meet {pet.pet_name}
                          </Link>
                          <div className="flex items-center gap-4">
                            {pet.traits.slice(0, 3).map((trait, idx) => (
                              <span
                                key={idx}
                                className="text-gray-300 text-sm"
                              >
                                • {trait}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {featuredPets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-primary w-8'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturePets;