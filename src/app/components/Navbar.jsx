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

  // Manage body class for the blur effect when modal is open
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
      <nav className="flex justify-baseline items-center px-6 py-1 bg-[#283618] shadow-md">
        {/* Left: Logo */}
        <div>
          <button
            onClick={handleLandPageClick}
            className="text-3xl font-bold text-white hover:text-gray-300 cursor-pointer hover:scale-105"
          >
            <img src="../dinero-logo.png" alt="Logo" className="w-18 h-18 rounded-full" />
          </button>
        </div>

        <div className="flex flex-1 items-end">
          <div className="flex gap-7 mt-4 pl-9">
            <button
              onClick={handleLandPageClick}
              className="text-sm font-semibold text-white hover:text-gray-300 cursor-pointer hover:scale-105"
            >
              Discover
            </button>
            <button
              onClick={handleRestaurantsClick}
              className="text-sm font-semibold text-white hover:text-gray-300 cursor-pointer hover:scale-105"
            >
              Restaurants
            </button>
          </div>
          <div className="flex justify-end w-full">
            <button
              className="flex items-center gap-2 px-4 py-2 text-[#283618] font-bold bg-white rounded-lg hover:bg-gray-300 cursor-pointer hover:scale-105"
              onClick={handleLoginClick}
            >
              <IoLogInOutline style={{ fontSize: '24px' }} />
              Log In
            </button>
          </div>
        </div>
      </nav>

      {/* Conditionally render LogInModal */}
      {isModalOpen && <LogInModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}
