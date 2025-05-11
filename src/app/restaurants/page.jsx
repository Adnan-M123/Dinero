'use client';

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { CiSearch } from 'react-icons/ci';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const scrollAmount = 250 * 2; 

  useEffect(() => {
    axios.get('/restaurants.json')
      .then(response => {
        const repeatedData = Array.from({ length: 20 }, (_, i) => response.data[i % response.data.length]);
        setRestaurants(repeatedData); // Ensures 20 items are set
      })
      .catch(error => {
        console.error("Error fetching restaurants:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); //ensures its loaded only once if state remains the same
  

  const categories = [
    'Burgers',
    'Steak',
    'Pizza',
    'Chicken',
    'Fast food',
    'Sandwich',
    'Pasta',
    'Dinner',
    'Breakfast',
    'Asian',
    'Arabic',
    'American',
    'Desserts',
    'Cooked meals',
    'Cereals',
    'Bowls',
    'Vegan',
  ];

  const handleLeftClick = () => {
    scrollRef.current.scrollLeft -= scrollAmount;
  };

  const handleRightClick = () => {
    scrollRef.current.scrollLeft += scrollAmount;
  };

  return (
    <main className="min-h-screen flex flex-col font-serif">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('../cover-restaurant-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-40 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-white">RESTAURANTS</h1>
          <p className="mt-2 text-white">Find your next meal. Book the right place in time.</p>
          <div className="search-bar flex items-center relative justify-center">
            <input
              type="text"
              placeholder="Search restaurant or meal"
              className="mt-4 px-4 py-2 rounded-3xl w-80 text-white border-1 border-white"
            />
            <button
              id="search-button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-2"
            >
              <CiSearch size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="bg-[#CDC1A5] py-2">
        <div className="flex justify-center gap-4 bg-[#CDC1A5] py-4 px-20">
          <div className="flex items-center w-full overflow-hidden">
            {/* Left Arrow */}
            <div>
              <button
                onClick={handleLeftClick}
                className="w-9 h-9 mr-1 flex items-center justify-center text-lg font-bold text-white bg-[#b1a68e] rounded-full hover:bg-[#938975] p-2"
              >
                <SlArrowLeft size={16} />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-x-2 px-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {categories.map((category, index) => (
                <button
                  key={index}
                  // className="px-6 py-2 rounded-lg bg-[#4A503D] text-white shadow-lg hover:scale-105 duration-200"
                  className="bg-[#4A503D] text-white hover:scale-105 transition-transform duration-100 px-6 py-2  rounded-lg shadow-md min-w-[150px] text-center whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Right Arrow */}
            <div>
              <button
                onClick={handleRightClick}
                className="w-9 h-9 ml-1 flex items-center justify-center text-lg font-bold text-white bg-[#b1a68e] rounded-full hover:bg-[#938975] p-2"
              >
                <SlArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="bg-[#fbf4e6] py-8 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader"></div> {/* Add spinner animation */}
              <p className="ml-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={index}
                  name={restaurant.name}
                  description={restaurant.description}
                  image={restaurant.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
