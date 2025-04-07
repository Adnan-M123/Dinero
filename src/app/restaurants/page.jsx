"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CiSearch } from 'react-icons/ci';

export default function Restaurants() {
  const categories = [
    "Burgers", "Steak", "Pizza", "Chicken", "Fast food", "Sandwich", "Pasta", 
    "Dinner", "Breakfast", "Asian", "Arabic", "American", "Desserts", "Cooked meals", 
    "Breakfast", "Cereals", "Bowls", "Vegan"
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

  // Repeat restaurants to fill the grid
  const allRestaurants = [...restaurants, ...restaurants, ...restaurants, ...restaurants];

  // State to track the current displayed categories
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to handle left button click (move 3 items to the left)
  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + categories.length) % categories.length);
  };

  // Function to handle right button click (move 3 items to the right)
  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % categories.length);
  };

  // Calculate which categories to display (responsively)
  const displayedCategories = [
    ...categories.slice(currentIndex, currentIndex + 10),
    ...(currentIndex + 10 > categories.length ? categories.slice(0, (currentIndex + 10) % categories.length) : [])
  ];

  return (
    <main className="min-h-screen flex flex-col">
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-6 px-4">
            {/* Left Button */}
            <button
              onClick={handleLeftClick}
              className="text-lg text-gray-700 font-bold p-2 transition-all duration-500 ease-in-out"
            >
              &lt;
            </button>

            {/* Categories */}
            <div className="flex gap-6 min-w-max transition-all duration-500 ease-in-out">
              {displayedCategories.map((category, index) => (
                <button 
                  key={index} 
                  className={`text-sm text-[#717171] hover:scale-105 duration-200 border border-solid rounded-lg p-3 min-w-[150px] text-center`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right Button */}
            <button
              onClick={handleRightClick}
              className="text-lg text-gray-700 font-bold p-2 transition-all duration-500 ease-in-out"
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
              // Alternate button colors based on index
              let buttonColor;
              if (index % 7 === 0) buttonColor = "bg-[#5c644f]";
              else if (index % 7 === 1) buttonColor = "bg-[#b3894d]";
              else if (index % 7 === 2) buttonColor = "bg-[#424d31]";
              else if (index % 7 === 3) buttonColor = "bg-[#9c5a25]";
              else if (index % 7 === 4) buttonColor = "bg-[#5c644f]";
              else if (index % 7 === 5) buttonColor = "bg-[#d4ab80]";
              else buttonColor = "bg-[#cb9d69]";

              return (
                <div key={index} className="bg-white rounded-lg overflow-hidden flex flex-col">
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
                      <button className={`${buttonColor} text-white text-xs uppercase py-2 px-6 rounded-full`}>
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
