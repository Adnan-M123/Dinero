'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const router = useRouter();

  // Check login state on mount and when storage changes
  useEffect(() => {
    const checkLogin = () => {
      if (typeof window !== 'undefined') {
        setIsLoggedIn(
          !!(localStorage.getItem('token') || sessionStorage.getItem('token'))
        );
        // Try to get profile picture from storage or API
        const pic =
          localStorage.getItem('profile_picture') ||
          sessionStorage.getItem('profile_picture');
        setProfilePicture(pic || '/placeholder.svg?height=40&width=40');
      }
    };
    checkLogin();

    // Listen for login/logout events from other tabs
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
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

  const handleProfileClick = () => {
    router.push('/profiles/commonUserProfile');
  };

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

        {/* Conditional Rendering for Authentication */}
        <div className="flex gap-2 items-center">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleSignUpClick}
                className="bg-[#CDC1A5] text-black px-4 py-1 rounded-full text-sm hover:bg-[#b1a68e]"
              >
                Sign up
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-[#CDC1A5] text-black px-4 py-1 rounded-full text-sm hover:bg-[#b1a68e]"
              >
                Log in
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="bg-[#CDC1A5] text-black px-4 py-1 rounded-full text-sm hover:bg-[#b1a68e]"
              >
                Log out
              </button>
              <button
                onClick={handleProfileClick}
                className="ml-2 focus:outline-none"
                style={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: 40,
                  height: 40,
                  padding: 0,
                  border: '2px solid #b1a68e',
                  background: '#fff',
                }}
              >
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}