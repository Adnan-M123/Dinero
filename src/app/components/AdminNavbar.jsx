'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AdminNavbar({ profilePicture }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.push('/login');
  };

  const handleProfileClick = () => {
    router.push('/profiles/restaurantAdminProfile');
  };

  return (
    <header className="bg-[#283618] text-white p-4 flex items-center justify-between">
      <div>
        <img
          src="/dinero-logo.png"
          alt="Dinero Logo"
          className="w-12 h-12 rounded-full"
        />
      </div>
      <div className="flex items-center gap-4 ml-auto">
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
            background: '#fff'
          }}
        >
          <img
            src={profilePicture || '/placeholder.svg?height=40&width=40'}
            alt="Profile"
            style={{
              width: 36,
              height: 36,
              objectFit: 'cover',
              borderRadius: '50%'
            }}
          />
        </button>
      </div>
    </header>
  );
}