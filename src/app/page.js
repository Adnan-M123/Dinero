'use client';

import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RestaurantCard from './components/RestaurantCard';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Main() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter(); // Initialize router

  useEffect(() => {
    console.log('Fetching data from /restaurants.json...'); // Debugging message

    axios
      // .get('/restaurants.json')
      .get('http://localhost:5001/api/restaurant')
      .then(response => {
        console.log('Fetched data:', response.data); // Axios automatically parses JSON
        setRestaurants(response.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error loading restaurants:', error); // Debugging message
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Ensures it runs only once when the component mounts

  return (
    <div className="bg-[#4A503D] text-white min-h-screen font-serif">
      {/* Navbar */}
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
        {['Steak', 'Pasta', 'Bosnian Cuisine', 'Vegan', 'Asian Cuisine', 'Cafes'].map(
          (category, index) => (
            <button
              key={index}
              className="px-6 py-2 rounded-lg bg-[#4A503D] text-white shadow-lg hover:scale-105 duration-200"
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Test Button */}
      <div className="flex justify-center bg-[#CDC1A5] py-4">
        <button
          className="px-6 py-2 rounded-lg bg-red-500 text-white shadow-lg hover:scale-105 duration-200"
          onClick={() => router.push('/specific-restaurant')}
        >
          Test Button
        </button>
      </div>

      {/* Featured Places */}
      <section className="py-12 bg-[#E7DDC4] text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Featured places:</h2>
        <div className="flex justify-center gap-6 px-10">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="loader"></div> {/* Spinner */}
              <p className="mt-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : restaurants.length > 0 ? (
            restaurants.map((place, i) => (
              <RestaurantCard
                key={i}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
