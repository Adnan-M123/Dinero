'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

export default function LogInModal({ closeModal }) {
  const modalRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    // Prevent scrolling when LogIn is displayed
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [closeModal]);

  // For submission, prevent default so it doesnt redirect
  const handleSubmit = e => {
    e.preventDefault();
    // ZASAD NISTA DOK NEMAMOP BAZU KAKVU
    console.log('Login submitted');
    closeModal();
  };

  // Use createPortal to render LogIn form in the center, respective to document body
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Blur effect */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Modal container */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto my-8 overflow-hidden"
        style={{ minHeight: 'min-content' }}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors p-2 cursor-pointer"
          aria-label="Close modal"
        >
          <IoClose size={24} />
        </button>

        {/* Modal content */}
        <div className="p-4 sm:p-6 pt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#283618] mb-4 sm:mb-6 text-center">
            Log In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                className="w-full px-3 py-2 border border-[#283618] text-[#283618] rounded-md focus:outline-none focus:ring-2 focus:ring-[#283618] focus:border-transparent"
                placeholder="Please enter your username"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 text-[#283618] border border-[#283618] rounded-md focus:outline-none focus:ring-2 focus:ring-[#283618] focus:border-transparent"
                placeholder="Please enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#283618] text-white font-bold rounded-md hover:bg-[#2a750e] transition-colors mt-6 cursor-pointer text-base"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
