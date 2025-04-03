'use client';

import React, { useState, useEffect } from 'react';
import LogInModal from './LogInModal';
import { GrRestaurant } from 'react-icons/gr';
import { IoLogInOutline } from 'react-icons/io5';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle the button click to open the modal
  const handleLoginClick = () => {
    setIsModalOpen(true);
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
        {/* Left Icon */}
        <div className="text-2xl font-bold text-white flex flex-col items-center space-y-2">
          <GrRestaurant style={{ color: 'white', fontSize: '24px' }} />
          <span>DINERO</span>
        </div>

        {/* Login Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 text-[#283618] font-bold bg-white rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={handleLoginClick}
        >
          <IoLogInOutline style={{ fontSize: '24px' }} />
          Log In
        </button>
      </nav>

      {/* Conditionally render LogInModal when isModalOpen is true */}
      {isModalOpen && <LogInModal closeModal={() => setIsModalOpen(false)} />}
    </>
  );
}
