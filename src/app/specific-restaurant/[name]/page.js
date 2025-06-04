'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import AdminNavbar from '../../components/AdminNavbar';
import Footer from '../../components/Footer';
import FoodItem from '../../components/FoodItem';
import { CiSearch } from 'react-icons/ci';
import { HiLocationMarker } from 'react-icons/hi';
import { TbWorldWww } from 'react-icons/tb';
import { FaPhoneFlip } from 'react-icons/fa6';
import axios from 'axios';

const daysOfWeek = [
  '', // 0 index not used
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function RestaurantPage() {
  const { name } = useParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [workHours, setWorkHours] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuByCategory, setMenuByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
  });
  const [reservationMsg, setReservationMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegularUser, setIsRegularUser] = useState(false);

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
    fetch(`http://localhost:5001/api/restaurants/name/${name}/menu-items`)
      .then(response => response.json())
      .then(data => setMenuItems(data))
      .catch(error => {
        console.error('Error loading menu items:', error);
      });

    // Fetch categories
    fetch(`http://localhost:5001/api/restaurants/name/${name}/categories`)
      .then(response => response.json())
      .then(data => {
        // console.log('Fetched categories:', data); // <-- Add this
        setCategories(data);
      })
      .catch(error => {
        console.error('Error loading categories:', error);
      });
  }, [name]);

  useEffect(() => {
    if (!restaurant?.id) return;
    axios
      .get(`http://localhost:5001/api/restaurants/${restaurant.id}/menu-items`)
      .then(res => {
        // Group menu items by category
        const menuByCat = {};
        res.data.forEach(item => {
          if (!menuByCat[item.category_name]) menuByCat[item.category_name] = [];
          menuByCat[item.category_name].push(item);
        });
        setMenuByCategory(menuByCat);
      })
      .catch(err => console.error('Error fetching menu items:', err));
  }, [restaurant]);

  // Group menu items by category name
  const menuGroupedByCategory = {};
  menuItems.forEach(item => {
    if (!item.categories) return;
    item.categories.forEach(cat => {
      // If cat is an object, use cat.name; if string, use as is
      const catName = typeof cat === 'string' ? cat : cat.name;
      if (!menuGroupedByCategory[catName]) menuGroupedByCategory[catName] = [];
      menuGroupedByCategory[catName].push(item);
    });
  });

  const categoryRefs = useMemo(() => {
    const refs = {};
    categories.forEach(cat => {
      refs[cat.name] = refs[cat.name] || React.createRef();
    });
    return refs;
  }, [categories]);

  const handleCategoryClick = catName => {
    categoryRefs[catName]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReservation = () => {
    // Basic client-side validation
    if (!reservationData.date || !reservationData.time) {
      setReservationMsg('Please select both date and time for your reservation.');
      return;
    }

    setReservationMsg(''); // Clear any previous messages

    // Here you would typically send the reservationData to your server
    // For this example, we'll just log it and show a success message
    console.log('Reservation data:', reservationData);
    setReservationMsg('Reservation made successfully!'); // Show success message
    setIsModalOpen(false); // Close the modal
  };

  const handleOpenReservationModal = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      // Save current path for redirect after login
      localStorage.setItem('openReservationModal', 'true');
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/login');
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('openReservationModal') === 'true') {
      setIsModalOpen(true);
      localStorage.removeItem('openReservationModal');
    }
  }, []);

  useEffect(() => {
    // Detect user role and login status
    function checkRole() {
      const role = localStorage.getItem('role') || sessionStorage.getItem('role');
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      setIsAdmin(role === 'restaurant_admin' && !!token);
      setIsRegularUser(role === 'user' && !!token);
    }
    checkRole();
    window.addEventListener('storage', checkRole); // In case login status changes in another tab
    return () => window.removeEventListener('storage', checkRole);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!restaurant)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#4A503D] text-white text-2xl">
        Restaurant not found.
      </div>
    );

  return (
    <div className="bg-[#4A503D] text-white min-h-screen font-serif">
      {isAdmin ? (
        <AdminNavbar profilePicture={restaurant?.logo_url} />
      ) : isRegularUser ? (
        <Navbar />
      ) : (
        <Navbar /> 
      )}

      <div
        className="relative w-full h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('${restaurant?.image || '/Klopa/klopa-restaurant.jpg'}')`,
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
                        {daysOfWeek[item.day_of_week]}:{' '}
                        {item.open_time && item.close_time
                          ? `${item.open_time.slice(0, 5)} - ${item.close_time.slice(0, 5)}`
                          : 'Closed'}
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
                    <HiLocationMarker className="text-lg" />{' '}
                    {/* Changed from text-5xl to text-lg */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        restaurant?.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline truncate max-w-[200px] block"
                      title={restaurant?.address}
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
                      className="hover:underline truncate max-w-[200px] block"
                      title={restaurant?.website}
                    >
                      {restaurant?.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-x-2 mb-2">
                    <FaPhoneFlip className="text-lg" />
                    <a
                      href={`tel:${restaurant?.phone}`}
                      className="hover:underline truncate max-w-[200px] block"
                      title={restaurant?.phone}
                    >
                      {restaurant?.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-2">
                  <button
                    className="bg-[#283618] w-[300px] text-white px-6 py-2 rounded-2xl hover:bg-white hover:text-[#4A503D] border border-transparent hover:border-[#4A503D] "
                    onClick={handleOpenReservationModal}
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
      <div className="flex w-full mt-10 pt-4 pb-35 px-40 bg-[#E7DDC4] text-black">
        {/* Sidebar */}
        <div className="w-55 mr-8 border-r border-[#4A503D] pr-6">
          <div className="sticky top-12">
            <h3 className="text-2xl font-bold mb-4 mt-4">Categories</h3>
            <ul className="space-y-0">
              {categories.map((cat, idx, arr) => (
                <React.Fragment key={cat.id}>
                  <li>
                    <button
                      className="w-full px-3 py-2 rounded hover:bg-[#4A503D] hover:text-white transition text-left"
                      onClick={() => handleCategoryClick(cat.name)}
                    >
                      {cat.name}
                    </button>
                  </li>
                  {idx !== arr.length - 1 && (
                    <li key={cat.id + '-sep'} role="separator" className="p-0">
                      <hr className="border-t border-[#4A503D] mx-2" />
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
        {/* Menu grid */}
        <div className="flex-1 pl-6">
          <h2 className="text-3xl font-serif font-bold mb-4 mt-4">Menu</h2>
          {categories.length > 0 ? (
            categories.map(cat => (
              <div
                key={cat.id}
                className="mb-10"
                ref={categoryRefs[cat.name]} // <-- Attach the ref here
              >
                <h3 className="text-2xl font-bold mb-3">{cat.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {menuByCategory[cat.name]?.length > 0 ? (
                    menuByCategory[cat.name].map(item => (
                      <FoodItem
                        key={item.id}
                        name={item.name}
                        image={item.image_url}
                        price={item.price}
                        description={item.description}
                      />
                    ))
                  ) : (
                    <p className="col-span-full text-gray-500">No items in this category.</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(40, 54, 24, 0.9)' }} // 0.3 = 30% opacity
        >
          <div className="bg-white text-black rounded-lg p-8 w-[350px] shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-black"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Reserve a Table</h2>
            <form
              onSubmit={async e => {
                e.preventDefault();
                setReservationMsg('');
                try {
                  // Get user token
                  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
                  if (!token) {
                    setReservationMsg('You must be logged in.');
                    return;
                  }
                  // Send reservation to backend
                  await axios.post(
                    'http://localhost:5001/api/reservations',
                    {
                      restaurant_id: restaurant.id,
                      reservation_date: reservationData.date,
                      reservation_time: reservationData.time,
                      number_of_guests: reservationData.guests,
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  setReservationMsg('Reservation successful!');
                } catch (err) {
                  setReservationMsg('Failed to make reservation.');
                }
              }}
            >
              <div className="mb-3">
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-2 py-1"
                  value={reservationData.date}
                  onChange={e => setReservationData({ ...reservationData, date: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Time</label>
                <input
                  type="time"
                  className="w-full border rounded px-2 py-1"
                  value={reservationData.time}
                  onChange={e => setReservationData({ ...reservationData, time: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block mb-1 font-medium">Guests</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  className="w-full border rounded px-2 py-1"
                  value={reservationData.guests}
                  onChange={e => setReservationData({ ...reservationData, guests: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#283618] text-white py-2 rounded hover:bg-[#4A503D] transition"
              >
                Reserve
              </button>
              {reservationMsg && (
                <div className="mt-3 text-center text-sm text-[#9C5A25]">{reservationMsg}</div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
}
