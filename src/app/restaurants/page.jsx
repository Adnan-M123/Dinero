"use client";

import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CiSearch } from 'react-icons/ci';

export default function Restaurants() {
  const categories = [
    "Burgers", "Steak", "Pizza", "Chicken", "Fast food", "Sandwich", "Pasta",
    "Dinner", "Breakfast", "Asian", "Arabic", "American", "Desserts", "Cooked meals",
    "Cereals", "Bowls", "Vegan"
  ];

  const restaurants = [
    {
      name: "Klopa",
      description: "Lorem ipsum dolor sit amet, consectetur",
      image: "/images/restaurants/klopa.jpg"
    },
    {
      name: "Careva Ćuprija",
      description: "Lorem ipsum dolor sit amet, consectetur",
      image: "/images/restaurants/careva-cuprija.jpg"
    },
    {
      name: "Casa di Pasta",
      description: "Lorem ipsum dolor sit amet, consectetur",
      image: "/images/restaurants/casa-di-pasta.jpg"
    },
    {
      name: "Avlija Restoran",
      description: "Lorem ipsum dolor sit amet, consectetur",
      image: "/images/restaurants/avlija-restoran.jpg"
    },
    {
      name: "Kibe Mahala",
      description: "Lorem ipsum dolor sit amet, consectetur",
      image: "/images/restaurants/kibe-mahala.jpg"
    },
    {
      name: "Željo Čevabdžinica",
      description: "Lorem ipsum dolor sit amet, consectetur",
      image: "/images/restaurants/zeljo-cevabdzinica.jpg"
    },
    {
      name: "Careva Ćuprija",
      description: "Lorem ipsum dolor sit amet, consectetur",
      image: "/images/restaurants/careva-cuprija.jpg"
    }
  ];

  const allRestaurants = [...restaurants, ...restaurants, ...restaurants, ...restaurants];

  const scrollRef = useRef(null);
  const scrollAmount = 160 * 2; // adjust how far it scrolls per click (2 items)

  const smoothScrollBy = (distance, duration = 500) => {
    const element = scrollRef.current;
    const start = element.scrollLeft;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress; // easeInOut

      element.scrollLeft = start + distance * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleLeftClick = () => {
    smoothScrollBy(-scrollAmount, 100); // scroll left slowly
  };

  const handleRightClick = () => {
    smoothScrollBy(scrollAmount, 100); // scroll right slowly
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
          <h1 className="text-5xl font-bold">RESTAURANTS</h1>
          <p className="mt-2">Find your next meal. Book the right place in time.</p>
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
        <div className="w-full px-4">
          <div className="flex items-center w-full overflow-hidden">
            {/* Left Arrow */}
            <button
              onClick={handleLeftClick}
              className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-700"
            >
              &lt;
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-x-2 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-[#4A503D] text-white font-serif font-semibold hover:scale-105 transition-transform duration-100 px-2 py-2 rounded-lg shadow-md min-w-[150px] text-center whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Right Arrow */}
            <button
              onClick={handleRightClick}
              className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-700"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* Restaurant Grid */}
      <section className="bg-[#fbf4e6] py-8 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allRestaurants.map((restaurant, index) => {
              let buttonColor;
              if (index % 7 === 0) buttonColor = "bg-[#5c644f]";
              else if (index % 7 === 1) buttonColor = "bg-[#b3894d]";
              else if (index % 7 === 2) buttonColor = "bg-[#424d31]";
              else if (index % 7 === 3) buttonColor = "bg-[#9c5a25]";
              else if (index % 7 === 4) buttonColor = "bg-[#5c644f]";
              else if (index % 7 === 5) buttonColor = "bg-[#d4ab80]";
              else buttonColor = "bg-[#cb9d69]";

              return (
                <div key={index} className="bg-white rounded-lg overflow-hidden flex flex-col transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
                  <div className="h-48 relative">
                    <img 
                      src={restaurant.image || "/placeholder.svg"} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center flex-grow flex flex-col">
                    <h3 className="font-serif text-lg mb-2">{restaurant.name}</h3>
                    <p className="text-xs text-[#717171] mb-4">{restaurant.description}</p>
                    <div className="mt-auto">
                      <button className={`${buttonColor} text-white text-xs uppercase py-2 px-6 rounded-full transform transition-transform duration-300 active:scale-95`}>
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
