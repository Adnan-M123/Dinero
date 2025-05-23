'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FoodItem from '../components/FoodItem';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { CiSearch } from 'react-icons/ci';
import { HiLocationMarker } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import { FaPhoneFlip } from 'react-icons/fa6';

export default function RestaurantPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/klopaMenu.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch klopaMenu.json');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched menu:', data);
        setMenu(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading klopaMenu:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!menu) {
    return <div>Error loading menu data.</div>;
  }

  return (
    <div className="bg-[#4A503D] text-white min-h-screen font-serif">
      <Navbar />

      <div
        className="relative w-full h-[600px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/Klopa/klopa-restaurant.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30 flex flex-col">
          <div className="flex flex-col px-40 pt-20">
            <div className="top-20 left-20 text-white">
              <h1 className="text-6xl font-serif mb-4">{menu?.restaurant?.name}</h1>
              <p className="max-w-md text-l">{menu?.restaurant?.description}</p>
            </div>
            <div className="flex gap-x-4 mt-4">
              <div className="flex flex-col gap-y-2 bg-[#9C5A25]/80 p-4 rounded-xl">
                <h2 className="text-xl font-serif font-bold">Working Hours</h2>
                <p className="text-red-500 text-sm font-bold">Closed Now</p>
                <ul className="flex flex-col text-l gap-y-1">
                  {menu?.restaurant?.workHours?.map((item, index) => (
                    <li key={index}>
                      {item.day}: {item.hours}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col max-w-[300px]">
                <div className="search-bar flex items-center relative justify-center">
                  <input
                    type="text"
                    placeholder="Search restaurant or meal"
                    className=" px-4 py-2 rounded-3xl w-80 text-white border-1 border-white"
                  />
                  <button
                    id="search-button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 "
                  >
                    <CiSearch size={20} className="text-white" />
                  </button>
                </div>

                <div className="flex flex-col bg-[#484916]/80 p-4 rounded-xl mt-2 gap-y-1">
                  <h2 className="text-xl font-serif font-bold mb-2">Contact Info</h2>
                  <div className="flex items-center gap-x-2">
                    <HiLocationMarker className="text-5xl" />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        menu?.restaurant?.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {menu?.restaurant?.address}
                    </a>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <TbWorldWww className="text-lg" />
                    <a
                      href={menu?.restaurant?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {menu?.restaurant?.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <FaPhoneFlip className="text-lg" />
                    <a href={`tel:${menu?.restaurant?.phone}`} className="hover:underline">
                      {menu?.restaurant?.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-2">
                  <button
                    className="bg-[#283618] w-[300px] text-white px-6 py-2 rounded-2xl hover:bg-white hover:text-[#4A503D] border border-transparent hover:border-[#4A503D] "
                    onClick={() => alert('Reservation functionality coming soon!')}
                  >
                    Make a Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Menu Sections */}
      <div className="flex px-40 bg-[#E7DDC4] gap-x-8">
        {/* Top Sellers Section */}
        <div className="flex flex-col w-full mt-10">
          <h2 className="text-3xl font-serif font-bold mb-4">Top Sellers</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* {menu?.topSellers?.length > 0 ? (
              menu.topSellers.map((item, index) => (
                <FoodItem
                  key={index}
                  item={{
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  }}
                />
              ))
            ) : (
              <p>No top sellers available.</p>
            )} */}

            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div> {/* Add spinner animation */}
                <p className="ml-4 text-gray-600">Loading items...</p>
              </div>
            ) : menu?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {menu.TopSellers.map((item, index) => (
                  <FoodItem key={index} name={item.name} image={item.image} price={item.price} />
                ))}
              </div>
            ) : (
              <p>No items available.</p>
            )}
          </div>
        </div>

        {/* Burgers and Wok Section */}
        <div className="flex flex-col w-full mt-10">
          {/* Burgers Section */}
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Burgers</h2>
            <div className="grid grid-cols-3 gap-4">
              {menu?.burgers?.length > 0 ? (
                menu.burgers.map((item, index) => (
                  <FoodItem
                    key={index}
                    item={{
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    }}
                  />
                ))
              ) : (
                <p>No burgers available.</p>
              )}
            </div>
          </div>

          {/* Wok Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-serif font-bold mb-4">Wok</h2>
            <div className="grid grid-cols-3 gap-4">
              {menu?.wok?.length > 0 ? (
                menu.wok.map((item, index) => (
                  <FoodItem
                    key={index}
                    item={{
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    }}
                  />
                ))
              ) : (
                <p>No wok items available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
