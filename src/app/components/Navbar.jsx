'use client';

import React, { useState, useEffect } from 'react';
import LogInModal from './LogInModal';
import { IoLogInOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Handle the button click to open the modal
  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  // Navigate to Restaurants page
  const handleRestaurantsClick = () => {
    router.push('/restaurants');
  };

  const handleLandPageClick = () => {
    router.push('../');
  };

  // Manage body class for the blur effect when modal is se
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  return (
    <>
      <header className="bg-[#283618] text-white p-4 flex items-center justify-between">
        {/* Left Section: Logo and Title */}
        <div className="flex items-center gap-4">
          <img
            src="../dinero-logo.png"
            alt="Dinero Logo"
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-xl font-semibold">HOME</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={handleLandPageClick}
            className="hover:underline text-sm font-semibold text-white"
          >
            Discover
          </button>
          <button
            onClick={handleRestaurantsClick}
            className="hover:underline text-sm font-semibold text-white"
          >
            Restaurants
          </button>
          
        </nav>

        {/* Right Section: Sign Up and Log In Buttons */}
        <div className="flex gap-2">
          <button className="bg-[#CDC1A5] text-black px-4 py-1 rounded-full text-sm hover:bg-[#b1a68e]">
            Sign up
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-[#CDC1A5] text-black px-4 py-1 rounded-full text-sm hover:bg-[#b1a68e]"
          >
            Log in
          </button>
        </div>
      </header>

      {/* Conditionally render LogInModal */}
      {isModalOpen && <LogInModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}
