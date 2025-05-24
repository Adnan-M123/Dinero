'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FoodItem from '../../components/FoodItem';
import { CiSearch } from 'react-icons/ci';
import { HiLocationMarker } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import { FaPhoneFlip } from 'react-icons/fa6';

const daysOfWeek = [
  '', // 0 index not used
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export default function RestaurantPage() {
  const { name } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [workHours, setWorkHours] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch restaurant info
    fetch(`http://localhost:5001/api/restaurants/name/${name}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch restaurant');
        return response.json();
      })
      .then(data => {
        setRestaurant(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading restaurant:', error);
        setLoading(false);
      });

    // Fetch work hours
    fetch(`http://localhost:5001/api/restaurants/name/${name}/workhours`)
      .then(response => response.json())
      .then(data => setWorkHours(data))
      .catch(error => {
        console.error('Error loading work hours:', error);
      });

    // Fetch menu items
    fetch(`http://localhost:5001/api/restaurants/name/${name}/menu`)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => {
        console.error('Error loading menu items:', error);
      });
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (!restaurant) return (
    <div className="flex items-center justify-center min-h-screen bg-[#4A503D] text-white text-2xl">
      Restaurant not found.
    </div>
  );

  return (
    <div className="bg-[#4A503D] text-white min-h-screen font-serif">
      <Navbar />

      <div
        className="relative w-full h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('${restaurant?.image || "/Klopa/klopa-restaurant.jpg"}')`
        }}
      >
        <div className="absolute inset-0 bg-black/30 flex flex-col">
          <div className="flex flex-col px-40 pt-20">
            <div className="top-20 left-20 text-white">
              <h1 className="text-6xl font-serif mb-4">{restaurant?.name}</h1>
              <p className="max-w-2xl text-l">{restaurant?.description}</p>
            </div>
            <div className="flex gap-x-4 mt-4">
              <div className="flex flex-col gap-y-2 bg-[#9C5A25]/80 p-4 rounded-xl">
                <h2 className="text-xl font-serif font-bold">Working Hours</h2>
                <ul className="flex flex-col text-l gap-y-1">
                  {workHours.length > 0 ? (
                    workHours.map((item, index) => (
                      <li key={index}>
                        {daysOfWeek[item.day_of_week]}:{" "}
                        {item.open_time && item.close_time
                          ? `${item.open_time.slice(0,5)} - ${item.close_time.slice(0,5)}`
                          : "Closed"}
                      </li>
                    ))
                  ) : (
                    <li>No work hours available.</li>
                  )}
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
                        restaurant?.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {restaurant?.address}
                    </a>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <TbWorldWww className="text-lg" />
                    <a
                      href={restaurant?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {restaurant?.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <FaPhoneFlip className="text-lg" />
                    <a href={`tel:${restaurant?.phone}`} className="hover:underline">
                      {restaurant?.phone}
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
      {/* Menu Section */}
      <div className="flex flex-col w-full mt-10 pb-15 px-40 bg-[#E7DDC4] text-black">
        <h2 className="text-3xl font-serif font-bold mb-4 mt-4">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <FoodItem
                key={item.id}
                name={item.name}
                image={item.image_url}
                price={item.price}
                description={item.description}
              />
            ))
          ) : (
            <p>No menu items available.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
