'use client';

import React, { useState, useEffect } from 'react';
import LogInModal from './LogInModal';
import { GrRestaurant } from 'react-icons/gr';
import { IoLogInOutline, IoRestaurantOutline } from 'react-icons/io5';
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
      <nav className="flex items-center justify-between px-6 py-4 bg-[#283618] shadow-md flex-wrap">
        {/* Left Icon and Restaurants Button */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleLandPageClick}
            className="text-2xl font-bold text-white flex flex-col items-center space-y-2 hover:text-gray-300 cursor-pointer hover:scale-105"
          >
            <GrRestaurant style={{ color: 'white', fontSize: '24px' }} />
            <span>DINERO</span>
          </button>

          <div className="text-2xl font-bold text-white flex flex-col items-center space-y-2">
            <button
              onClick={handleRestaurantsClick}
              className="flex flex-col items-center space-y-2 text-white hover:text-gray-300 cursor-pointer hover:scale-105"
            >
              <IoRestaurantOutline style={{ color: 'white', fontSize: '24px' }} />
              <span>RESTAURANTS</span>
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 text-[#283618] font-bold bg-white rounded-lg hover:bg-gray-300 cursor-pointer hover:scale-105"
          onClick={handleLoginClick}
        >
          <IoLogInOutline style={{ fontSize: '24px' }} />
          Log In
        </button>
      </nav>

      {/* Conditionally render LogInModal */}
      {isModalOpen && <LogInModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}
