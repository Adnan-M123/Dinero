'use client';

import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RestaurantCard from './components/RestaurantCard';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Link from 'next/link';

export default function Main() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/restaurants')
      .then(response => {
        setRestaurants(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading restaurants:', error);
        setLoading(false);
      });

    // Fetch only featured categories from the backend
    axios
      .get('http://localhost:5001/api/restaurants/featured-categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error loading categories:', error));
  }, []);

  return (
    <div className="bg-[#4A503D] text-white min-h-screen font-serif">
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
      <div className="flex justify-center gap-4 bg-[#CDC1A5] py-4">
        {categories.map(category => (
          <Link href={`/restaurants?category=${category.id}`} key={category.id}>
            <button className="px-6 py-2 rounded-lg bg-[#4A503D] text-white shadow-lg hover:scale-105 duration-200">
              {category.name}
            </button>
          </Link>
        ))}
      </div>

      {/* Featured Places */}
      <section className="py-12 bg-[#E7DDC4] text-black">
        <h2 className="text-3xl text-center mb-6">Featured places:</h2>
        <div className="flex justify-center gap-6 px-10">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="loader"></div>
              <p className="mt-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : restaurants.length > 0 ? (
            restaurants.slice(0, 5).map((place, i) => (
              <RestaurantCard
                key={place.id || i}
                id={place.id}
                name={place.name}
                description={place.description}
                image={place.image}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No restaurants available.</p>
          )}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-10 flex justify-around bg-[#E7DDC4] text-black">
        {[
          {
            text: 'Select your restaurant, pick a date & time, and send your reservation request!',
            image: '/woman-placing-order.png',
          },
          {
            text: 'The restaurant reviews and confirms your booking in real time!',
            image: '/waiter-processing-order.png',
          },
          {
            text: 'Arrive, get seated instantly, and enjoy your meal—no waiting!',
            image: '/people-having-dinner.png',
          },
        ].map((step, i) => (
          <div key={i} className="w-1/3 text-center max-w-70">
            <img src={step.image} alt="Step" className="mx-auto h-40" />
            <p className="mt-3 text-sm">{step.text}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
