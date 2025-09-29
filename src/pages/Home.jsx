import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ComponentName = () => {
  return (
    <>
    <Navbar/>
      <div className="relative pb-12 bg-black -mt-16 xl:pt-60 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg"
            alt="Smart Grid Background"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative">
          <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
            <div className="w-full lg:w-2/3 xl:w-1/2">
              <p className="mt-6 tracking-tighter text-white">
                <span className="font-sans font-normal text-6xl sm:text-7xl">
                  Powering Smarter
                </span>
                <br />
                <span className="font-serif italic font-normal text-7xl sm:text-8xl text-blue-400">
                  Energy Futures
                </span>
              </p>
              <p className="mt-12 font-sans text-base font-normal leading-7 text-gray-200">
                Upload your electricity consumption data and unlock insights into
                usage trends, costs, and optimization strategies.  
                Maximize efficiency ⚡, save costs 💸, and build a sustainable 🌍 future.
              </p>
              <p className="mt-8 font-sans text-xl font-medium text-white">
                Start optimizing today — free & easy 🚀
              </p>

              <div className="flex items-center mt-5 space-x-3 sm:space-x-4">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 rounded-full sm:leading-8 sm:text-lg bg-white text-black hover:bg-opacity-90"
                  role="button"
                >
                  Get Started
                </a>

                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-2 font-sans text-base font-semibold transition-all duration-200 bg-transparent border-2 rounded-full sm:leading-8 sm:text-lg text-white border-blue-400 hover:bg-white hover:text-black"
                  role="button"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z"
                    />
                  </svg>
                  View Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ComponentName;
