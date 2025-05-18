'use client';

import React, { useState, useEffect } from 'react';
import LogInModal from './LogInModal';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const router = useRouter();

  // Open login modal
  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  // Function that sets user as logged in
  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false); // Close modal after login
  };

  const handleRestaurantsClick = () => {
    router.push('/restaurants');
  };

  const handleLandPageClick = () => {
    router.push('../');
  };

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  // Manage body class for the blur effect when modal is se
  useEffect(() => {
    document.body.classList.toggle('modal-open', isModalOpen);
    return () => document.body.classList.remove('modal-open');
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
          <button onClick={() => {router.push('/profiles/commonUserProfile')}}>
            Allah1
          </button>
          <button onClick={() => {router.push('/profiles/restaurantAdminProfile')}}>
            Allah2
          </button>
        </nav>

        {/* Conditional Rendering for Authentication */}
        <div className="flex gap-2">
          <button onClick={handleSignUpClick} className="bg-[#CDC1A5] text-black px-4 py-1 rounded-full text-sm hover:bg-[#b1a68e]">
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

      {/* LogInModal - Ensuring handleSuccessfulLogin updates state */}
      {isModalOpen && <LogInModal closeModal={() => setIsModalOpen(false)} onLogin={handleSuccessfulLogin} />}
    </>
  );
}