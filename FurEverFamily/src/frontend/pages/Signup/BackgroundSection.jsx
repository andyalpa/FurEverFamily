import React from 'react';

function BackgroundSection() {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 xl:w-2/3 2xl:w-3/4 h-full bg-cover"
      style={{ backgroundImage: "url('https://vojislavd.com/ta-template-demo/assets/img/auth-background.jpg')" }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-30">
        <div className="flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 xl:h-20 xl:w-20 2xl:h-24 2xl:w-24 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
          <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-gray-100 tracking-wider">Template</h1>
        </div>
        <p className="text-gray-300 mt-4 px-16 text-center">Free admin dashboard template created with Tailwind CSS and Alpine.js</p>
        <a href="#" className="mt-6 bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded text-sm uppercase text-gray-900 transition duration-150" title="Learn More">
          Learn More
        </a>
      </div>
    </div>
  );
}

export default BackgroundSection;