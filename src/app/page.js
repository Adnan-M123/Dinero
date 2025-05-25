'use client';

import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RestaurantCard from './components/RestaurantCard';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Main() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredCategories, setFeaturedCategories] = useState([]); // For buttons
  const [allCategories, setAllCategories] = useState([]); // For search suggestions
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [meals, setMeals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/restaurants')
      .then(response => {
        setRestaurants(response.data);
        setAllRestaurants(response.data); // Store all restaurants for suggestions
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading restaurants:', error);
        setLoading(false);
      });

    // Fetch featured categories for the buttons
    axios
      .get('http://localhost:5001/api/restaurants/featured-categories')
      .then(response => {
        console.log('Featured categories for buttons:', response.data);
        setFeaturedCategories(response.data);
      })
      .catch(error => console.error('Error loading featured categories:', error));

    // Fetch ALL categories for search suggestions
    axios
      .get('http://localhost:5001/api/restaurants/categories')
      .then(response => {
        console.log('All categories for suggestions:', response.data.length);
        setAllCategories(response.data);
      })
      .catch(error => console.error('Error loading all categories:', error));
  }, []);

  useEffect(() => {
    // Fetch meals/menu items for suggestions
    axios
      .get('http://localhost:5001/api/restaurants/menu-items') // <-- updated endpoint
      .then(response => {
        setMeals(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
      });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    if (!search.trim()) return;

    // Try to match a category name from ALL categories (not just featured)
    const matchedCategory = allCategories.find(
      cat => cat.name.toLowerCase() === search.trim().toLowerCase()
    );
    if (matchedCategory) {
      console.log('Matched category:', matchedCategory.name, 'ID:', matchedCategory.id);
      router.push(`/restaurants?category=${matchedCategory.id}`);
    } else {
      console.log('No category match, performing search for:', search);
      router.push(`/restaurants?q=${encodeURIComponent(search)}`);
    }
  };

  const handleInputChange = e => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Use all restaurants for suggestions
    const restaurantNames = allRestaurants.map(r => r.name);
    // Use ALL categories for suggestions (not just featured)
    const categoryNames = allCategories.map(c => c.name);

    // Try different possible property names for meal names
    const mealNames = meals
      .map(m => {
        return m.name || m.title || m.item_name || m.meal_name || m.dish_name || String(m);
      })
      .filter(Boolean);

    console.log('Building suggestions from:');
    console.log('- Restaurants:', restaurantNames.length);
    console.log('- All Categories:', categoryNames.length);
    console.log('- Meals:', mealNames.length);

    // Combine all suggestions and remove duplicates
    const allSuggestions = [...new Set([...restaurantNames, ...categoryNames, ...mealNames])];

    // Filter suggestions that contain the input value (case-insensitive)
    const filtered = allSuggestions.filter(s => s && s.toLowerCase().includes(value.toLowerCase()));

    console.log('Filtered suggestions:', filtered.slice(0, 8));

    setSuggestions(filtered.slice(0, 8));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = suggestion => {
    setSearch(suggestion);
    setShowSuggestions(false);

    // Check if the suggestion matches a category name from ALL categories
    const matchedCategory = allCategories.find(
      cat => cat.name.toLowerCase() === suggestion.trim().toLowerCase()
    );

    if (matchedCategory) {
      console.log('Suggestion matched category:', matchedCategory.name, 'ID:', matchedCategory.id);
      // If it's a category, navigate to restaurants page with category
      router.push(`/restaurants?category=${matchedCategory.id}`);
      return;
    }

    console.log('Suggestion is not a category, performing search for:', suggestion);
    // Otherwise, navigate to restaurants page with search query
    router.push(`/restaurants?q=${encodeURIComponent(suggestion)}`);
  };

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
          <form
            onSubmit={handleSearch}
            className="search-bar flex flex-col items-center justify-center w-full"
          >
            <div className="w-full flex items-center relative justify-center">
              <input
                type="text"
                value={search}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                placeholder="Search restaurant or meal"
                className="mt-4 px-4 py-2 rounded-3xl w-80 text-white border-1 border-white"
                autoComplete="off"
              />
              <button
                id="search-button"
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-2"
              >
                <CiSearch size={20} className="text-white" />
              </button>
              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  className={`
                    block absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 bg-white/80 text-black rounded-xl shadow-lg
                    max-h-56 overflow-y-auto overflow-hidden z-50 transition-all duration-200 ease-out opacity-90 scale-100
                  `}
                  style={{
                    minWidth: '20rem',
                    backdropFilter: 'blur(6px)',
                    animation: 'fadeSlideDown 0.2s ease',
                  }}
                >
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors duration-100"
                      onMouseDown={() => handleSuggestionClick(s)}
                    >
                      {s}
                    </li>
                  ))}
                  <style jsx global>{`
                    @keyframes fadeSlideDown {
                      from {
                        opacity: 0;
                        transform: translateY(-10px) scale(0.98);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                      }
                    }
                    ul::-webkit-scrollbar {
                      width: 6px;
                      border-radius: 8px;
                      background: transparent;
                    }
                    ul::-webkit-scrollbar-thumb {
                      background: #b8b6ad;
                      border-radius: 8px;
                    }
                    ul::-webkit-scrollbar-track {
                      background: transparent;
                      border-radius: 8px;
                    }
                  `}</style>
                </ul>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Categories - Only show FEATURED categories as buttons */}
      <div className="flex justify-center gap-4 bg-[#CDC1A5] py-4">
        {featuredCategories.map(category => (
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
            restaurants
              .slice(0, 5)
              .map((place, i) => (
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
            <img src={step.image || '/placeholder.svg'} alt="Step" className="mx-auto h-40" />
            <p className="mt-3 text-sm">{step.text}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
