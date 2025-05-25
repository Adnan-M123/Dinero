'use client';

import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { CiSearch } from 'react-icons/ci';

export default function Restaurants() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollRef = useRef(null);
  const buttonRefs = useRef({});
  const categoriesRowRef = useRef(null);
  const menuSectionRef = useRef(null);
  const restaurantGridRef = useRef(null);
  const scrollAmount = 250 * 2;
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch meals/menu items for suggestions
    axios
      .get('http://localhost:5001/api/restaurants/menu-items')
      .then(response => {
        setMeals(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch all categories
    axios
      .get('http://localhost:5001/api/restaurants/categories')
      .then(response => {
        console.log('All categories loaded:', response.data);
        response.data.forEach(cat => {
          console.log(`Category: ${cat.name}, ID: ${cat.id}, Type: ${typeof cat.id}`);
        });
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    // Handle initial search query from URL
    if (initialQuery) {
      console.log('Performing initial search for:', initialQuery);
      setLoading(true);
      axios
        .get(`http://localhost:5001/api/restaurants/search?q=${encodeURIComponent(initialQuery)}`)
        .then(res => {
          console.log('Search results:', res.data);
          setRestaurants(res.data);
          setSelectedCategory('all'); // Reset category when searching
        })
        .catch(err => {
          console.error('Search error:', err);
          console.error('Search query was:', initialQuery);
          // Fallback to showing all restaurants if search fails
          return axios.get('http://localhost:5001/api/restaurants');
        })
        .then(fallbackRes => {
          if (fallbackRes) {
            console.log('Using fallback - showing all restaurants');
            setRestaurants(fallbackRes.data);
          }
        })
        .finally(() => setLoading(false));
    } else {
      // Handle category selection
      console.log('Loading restaurants for category:', selectedCategory);
      setLoading(true);

      if (selectedCategory === 'all') {
        axios
          .get('http://localhost:5001/api/restaurants')
          .then(response => {
            console.log('All restaurants loaded:', response.data.length);
            setRestaurants(response.data);
          })
          .catch(error => {
            console.error('Error fetching all restaurants:', error);
            setRestaurants([]); // Set empty array on error
          })
          .finally(() => setLoading(false));
      } else {
        // Add validation for category ID
        if (!selectedCategory || selectedCategory === 'undefined' || selectedCategory === 'null') {
          console.error('Invalid category ID:', selectedCategory);
          setSelectedCategory('all');
          return;
        }

        axios
          .get(`http://localhost:5001/api/restaurants/by-category/${selectedCategory}`)
          .then(response => {
            console.log(`Restaurants for category ${selectedCategory}:`, response.data.length);
            setRestaurants(response.data);
          })
          .catch(error => {
            console.error(`Error fetching restaurants for category ${selectedCategory}:`, error);
            console.error('Category ID that failed:', selectedCategory);
            console.error('Error details:', error.response?.data);

            // Fallback to all restaurants if category fails
            console.log('Falling back to all restaurants...');
            return axios.get('http://localhost:5001/api/restaurants');
          })
          .then(fallbackRes => {
            if (fallbackRes) {
              console.log('Fallback successful, showing all restaurants');
              setRestaurants(fallbackRes.data);
              setSelectedCategory('all'); // Reset to "all" since category failed
            }
          })
          .finally(() => setLoading(false));
      }
    }
  }, [selectedCategory, initialQuery]);

  useEffect(() => {
    if (selectedCategory && buttonRefs.current[selectedCategory]) {
      buttonRefs.current[selectedCategory].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    // Fetch all restaurants initially for suggestions
    axios
      .get('http://localhost:5001/api/restaurants')
      .then(response => {
        console.log('All restaurants fetched for suggestions:', response.data.length);
        setAllRestaurants(response.data);
      })
      .catch(error => console.error('Error fetching all restaurants:', error));
  }, []);

  const handleLeftClick = () => {
    scrollRef.current.scrollLeft -= scrollAmount;
  };

  const handleRightClick = () => {
    scrollRef.current.scrollLeft += scrollAmount;
  };

  const handleCategorySelect = catId => {
    console.log('Category selected:', catId, typeof catId);

    // Validate category ID
    if (!catId || catId === 'undefined' || catId === 'null') {
      console.error('Invalid category ID provided:', catId);
      catId = 'all';
    }

    setSelectedCategory(catId);
    setSearch(''); // Clear search when selecting category

    // Update the URL
    const params = new URLSearchParams();
    if (catId !== 'all') {
      params.set('category', catId);
    }
    router.replace(`?${params.toString()}`, { scroll: false });

    // Scroll to restaurant grid after category is selected
    setTimeout(() => {
      restaurantGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSearch = e => {
    e.preventDefault();
    if (!search.trim()) return;

    // Try to match a category name (case-insensitive)
    const matchedCategory = categories.find(
      cat => cat.name.toLowerCase() === search.trim().toLowerCase()
    );
    if (matchedCategory) {
      handleCategorySelect(matchedCategory.id);
      return;
    }

    setLoading(true);
    setSelectedCategory('all'); // Reset category when searching

    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', search);
    router.replace(`?${params.toString()}`, { scroll: false });

    axios
      .get(`http://localhost:5001/api/restaurants/search?q=${encodeURIComponent(search)}`)
      .then(res => {
        setRestaurants(res.data);
        // Scroll to restaurant grid after results load
        setTimeout(() => {
          restaurantGridRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      })
      .catch(err => console.error('Search error:', err))
      .finally(() => setLoading(false));
  };

  const handleInputChange = e => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Use all restaurants for suggestions, not just filtered ones
    const restaurantNames = allRestaurants.map(r => r.name);
    const categoryNames = categories.map(c => c.name);

    // Try different possible property names for meal names
    const mealNames = meals.map(m => m.name).filter(Boolean);

    // Combine all suggestions and remove duplicates
    const allSuggestions = [...new Set([...restaurantNames, ...categoryNames, ...mealNames])];

    // Filter suggestions that contain the input value (case-insensitive)
    const filtered = allSuggestions.filter(s => s && s.toLowerCase().includes(value.toLowerCase()));

    setSuggestions(filtered.slice(0, 8));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = suggestion => {
    setSearch(suggestion);
    setShowSuggestions(false);

    // Check if the suggestion matches a category name (same logic as handleSearch)
    const matchedCategory = categories.find(
      cat => cat.name.toLowerCase() === suggestion.trim().toLowerCase()
    );

    if (matchedCategory) {
      // If it's a category, select it directly
      handleCategorySelect(matchedCategory.id);
      return;
    }

    // Otherwise, perform a search
    setLoading(true);
    setSelectedCategory('all'); // Reset category when searching

    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', suggestion);
    router.replace(`?${params.toString()}`, { scroll: false });

    axios
      .get(`http://localhost:5001/api/restaurants/search?q=${encodeURIComponent(suggestion)}`)
      .then(res => {
        setRestaurants(res.data);
        // Scroll to restaurant grid after results load
        setTimeout(() => {
          restaurantGridRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      })
      .catch(err => console.error('Search error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // If there's a search or category in the URL, scroll to the grid after mount
    if (initialQuery || (selectedCategory && selectedCategory !== 'all')) {
      setTimeout(() => {
        restaurantGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300); // delay to ensure content is rendered
    }
  }, [initialQuery, selectedCategory]);

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
              {/* Suggestions dropdown absolutely positioned below the input */}
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

      {/* Categories */}
      <section className="bg-[#CDC1A5] py-2">
        <div className="flex justify-center gap-4 bg-[#CDC1A5] py-4 px-20">
          <div className="flex items-center w-full overflow-hidden">
            {/* Left Arrow */}
            <div>
              <button
                onClick={handleLeftClick}
                className="w-9 h-9 mr-1 flex items-center justify-center text-lg  text-white bg-[#b1a68e] rounded-full hover:bg-[#938975] p-2"
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
              <button
                key="all"
                ref={el => (buttonRefs.current['all'] = el)}
                className={`px-6 py-2 rounded-lg shadow-md min-w-[150px] text-center whitespace-nowrap 
                  ${
                    selectedCategory === 'all'
                      ? 'bg-[#283618] text-white scale-105 transition-transform duration-200'
                      : 'bg-[#4A503D] text-white hover:scale-105 transition-transform duration-100'
                  }
                `}
                onClick={() => handleCategorySelect('all')}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  ref={el => (buttonRefs.current[category.id] = el)}
                  className={`px-6 py-2 rounded-lg shadow-md min-w-[150px] text-center whitespace-nowrap 
                    ${
                      selectedCategory == category.id
                        ? 'bg-[#283618] text-white scale-105 transition-transform duration-200'
                        : 'bg-[#4A503D] text-white hover:scale-105 transition-transform duration-100'
                    }
                  `}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
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
      <section ref={restaurantGridRef} className="bg-[#fbf4e6] py-8 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="loader"></div>
              <p className="ml-4 text-gray-600">Loading restaurants...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {restaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id || index}
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
