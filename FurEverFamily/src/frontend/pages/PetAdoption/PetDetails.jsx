import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPetDetails } from '../../Mock API/mockData';
import { useTheme } from '../../features/ThemeContext';

const PetDetails = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const [activeImage, setActiveImage] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const pet = mockPetDetails.find((p) => p.pet_id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!pet) {
    return (
      <div 
        className="container mx-auto px-4 py-16 text-center"
        data-aos="fade-up"
      >
        <h2 className={`text-2xl font-heading font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-text'
        }`}>
          Pet not found
        </h2>
        <Link to="/adopt" className="btn-primary">
          Browse Other Pets
        </Link>
      </div>
    );
  }

  const handleInquiry = (e) => {
    e.preventDefault();
    // TODO: Implement inquiry submission
    setIsInquiryOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4" data-aos="fade-right">
            <div className="relative aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
              <img
                src={pet.images[activeImage].thumbnail_url}
                alt={`${pet.pet_name} - Photo ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
              {pet.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === 0 ? pet.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === pet.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/75 transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {pet.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {pet.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-lg overflow-hidden aspect-w-1 aspect-h-1 ${
                      activeImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    <img
                      src={image.thumbnail_url}
                      alt={`${pet.pet_name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pet Info */}
          <div data-aos="fade-left">
            <h1 className={`text-3xl md:text-4xl font-heading font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-text'
            }`}>
              {pet.pet_name}
            </h1>

            <div className="flex flex-wrap gap-4 mb-6">
              {pet.characteristics.map((trait, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-200'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="prose max-w-none mb-8">
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {pet.description}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {/* Quick Facts */}
              <div className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <h2 className={`text-xl font-heading font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-text'
                }`}>
                  Quick Facts
                </h2>
                <dl className="grid grid-cols-2 gap-4">
                  {Object.entries(pet.details || {}).map(([key, value]) => (
                    <div key={key}>
                      <dt className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {key}
                      </dt>
                      <dd className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-text'
                      }`}>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="btn-primary flex-1"
              >
                Inquire About {pet.pet_name}
              </button>
              <a
                href={pet.pet_details_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex-1"
              >
                View on Shelter Site
              </a>
            </div>
          </div>
        </div>

        {/* Inquiry Form Modal */}
        {isInquiryOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <div 
                className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    onClick={() => setIsInquiryOpen(false)}
                    className={`rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleInquiry} className="space-y-4">
                  <h3 className={`text-lg font-heading font-semibold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-text'
                  }`}>
                    Inquire About {pet.pet_name}
                  </h3>
                  
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary`}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary`}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className={`w-full px-3 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-primary`}
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setIsInquiryOpen(false)}
                      className="btn-ghost"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetails;