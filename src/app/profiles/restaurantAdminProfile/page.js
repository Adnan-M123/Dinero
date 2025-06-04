'use client';

import { useEffect, useState } from 'react';
import AdminNavbar from '@/app/components/AdminNavbar';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import { TbLogout } from 'react-icons/tb';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { IoRestaurantOutline } from 'react-icons/io5';
import { MdFastfood } from 'react-icons/md';

export default function AdminProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('reservations');
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
  });
  const [addingMenuItem, setAddingMenuItem] = useState(false);
  const router = useRouter();

  // Redirect if not restaurant admin
  useEffect(() => {
    const role = localStorage.getItem('role') || sessionStorage.getItem('role');
    if (role !== 'restaurant_admin') {
      router.push('/profiles/commonUserProfile');
    }
  }, []);

  // Fetch restaurant info
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    axios
      .get('http://localhost:5001/api/restaurants/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setRestaurant(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Fetch reservations
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    axios
      .get('http://localhost:5001/api/restaurants/my/reservations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setReservations(res.data))
      .finally(() => setLoadingReservations(false));
  }, []);

  // Fetch categories for menu
  useEffect(() => {
    axios.get('http://localhost:5001/api/categories').then(res => {
      console.log('Fetched categories:', res.data);
      setCategories(res.data);
    });
  }, []);

  // Fetch menu items for this restaurant
  useEffect(() => {
    if (!restaurant) return;
    axios
      .get(`http://localhost:5001/api/restaurants/${restaurant.id}/menu-items`)
      .then(res => setMenuItems(res.data));
  }, [restaurant]);

  // Handle menu item form change
  const handleMenuItemChange = e => {
    setNewMenuItem({ ...newMenuItem, [e.target.name]: e.target.value });
  };

  // Add menu item
  const handleAddMenuItem = async e => {
    e.preventDefault();
    setAddingMenuItem(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    await axios.post(
      `http://localhost:5001/api/restaurants/${restaurant.id}/menu-items`,
      newMenuItem,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setNewMenuItem({ name: '', description: '', price: '', category_id: '', image_url: '' });
    // Refresh menu items
    axios
      .get(`http://localhost:5001/api/restaurants/${restaurant.id}/menu-items`)
      .then(res => setMenuItems(res.data));
    setAddingMenuItem(false);
  };

  // Restaurant info handlers
  const handleChange = e => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleHoursChange = (idx, field, value) => {
    const updatedHours = [...restaurant.hours];
    updatedHours[idx][field] = value;
    setRestaurant({ ...restaurant, hours: updatedHours });
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const {
      name = '',
      description = '',
      address = '',
      phone = '',
      logo_url = '',
      website = '',
      map_link = '',
      google_maps_link = '',
      // email, // REMOVE THIS
    } = restaurant || {};
    await axios.put(
      'http://localhost:5001/api/restaurants/my',
      {
        name,
        description,
        address,
        phone,
        logo_url,
        website,
        map_link,
        google_maps_link,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSaving(false);
    alert('Restaurant info updated!');
  };

  // Save hours
  const handleSaveHours = async () => {
    setSaving(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    // Send only the hours array to the backend
    await axios.put(
      'http://localhost:5001/api/restaurants/my/hours',
      { hours: restaurant.hours },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSaving(false);
    alert('Hours updated!');
  };

  // Reservation approve/reject
  const handleReservationAction = async (reservationId, newStatus) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    await axios.put(
      `http://localhost:5001/api/reservations/${reservationId}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // Refresh reservations
    setLoadingReservations(true);
    axios
      .get('http://localhost:5001/api/restaurants/my/reservations', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setReservations(res.data))
      .finally(() => setLoadingReservations(false));
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5001/api/restaurants/${id}`)
      .then(res => setRestaurant(res.data))
      .catch(() => setRestaurant(null));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!restaurant) return <div>No restaurant found.</div>;

  const tabs = [
    {
      label: 'Reservations',
      value: 'reservations',
      icon: <TbBrandGoogleAnalytics className="text-xl" />,
    },
    { label: 'Menu Update', value: 'menu', icon: <MdFastfood className="text-xl" /> },
    {
      label: 'Restaurant Settings',
      value: 'settings',
      icon: <IoRestaurantOutline className="text-xl" />,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf4e6] text-[#4A503D]">
      <AdminNavbar profilePicture={restaurant.logo_url} />
      <div className="flex flex-1">
        <aside className="hidden w-[200px] flex-col border-r border-[#b1a68e] bg-[#CDC1A5] sm:flex">
          <nav className="grid gap-2 p-4">
            {tabs.map(item => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-[#b1a68e] ${
                  activeTab === item.value ? 'bg-[#b1a68e] font-medium' : ''
                } text-[#4A503D]`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button
              className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-100"
              onClick={() => {
                localStorage.removeItem('token');
                router.push('/login');
              }}
            >
              <span className="text-sm">
                <TbLogout className="text-xl" />
              </span>
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* --- TOP SECTION: Always visible --- */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white">
                <img
                  src={restaurant.logo_url || '/placeholder.svg?height=80&width=80'}
                  alt="Restaurant Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#4A503D]">{restaurant.name}</h2>
                <p className="text-[#938975]">{restaurant.email}</p>
              </div>
              <button
                className="ml-2 rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-3 py-1 text-sm hover:bg-[#b1a68e]"
                onClick={() =>
                  router.push(`/specific-restaurant/${encodeURIComponent(restaurant.name)}`)
                }
              >
                Preview Public Page
              </button>
            </div>

            {/* --- TABS --- */}
            <div className="border-b border-[#b1a68e]">
              <div className="grid w-full grid-cols-3 text-center text-[#4A503D]">
                {tabs.map(tab => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`border-b-2 py-2 transition-colors ${
                      activeTab === tab.value
                        ? 'border-[#4A503D] font-semibold'
                        : 'border-transparent hover:border-[#938975]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* --- TAB CONTENTS --- */}
            {activeTab === 'reservations' && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium text-[#4A503D]">Reservations</h3>
                {loadingReservations ? (
                  <div>Loading reservations...</div>
                ) : reservations.length === 0 ? (
                  <div>No reservations found.</div>
                ) : (
                  <table className="min-w-full border">
                    <thead>
                      <tr>
                        <th className="border px-2 py-1">User</th>
                        <th className="border px-2 py-1">Email</th>
                        <th className="border px-2 py-1">Date</th>
                        <th className="border px-2 py-1">Time</th>
                        <th className="border px-2 py-1">Guests</th>
                        <th className="border px-2 py-1">Status</th>
                        <th className="border px-2 py-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map(r => (
                        <tr key={r.id}>
                          <td className="border px-2 py-1">{r.username}</td>
                          <td className="border px-2 py-1">{r.email}</td>
                          <td className="border px-2 py-1">{r.reservation_date}</td>
                          <td className="border px-2 py-1">{r.reservation_time}</td>
                          <td className="border px-2 py-1">{r.number_of_guests}</td>
                          <td className="border px-2 py-1">{r.status}</td>
                          <td className="border px-2 py-1">
                            {r.status === 'Pending' && (
                              <div className="flex gap-2">
                                <button
                                  className="px-2 py-1 bg-green-500 text-white rounded"
                                  onClick={() => handleReservationAction(r.id, 'Approved')}
                                >
                                  Approve
                                </button>
                                <button
                                  className="px-2 py-1 bg-red-500 text-white rounded"
                                  onClick={() => handleReservationAction(r.id, 'Rejected')}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium text-[#4A503D]">Menu Update</h3>
                <form
                  onSubmit={handleAddMenuItem}
                  className="space-y-4 bg-white p-4 rounded-lg border border-[#CDC1A5]"
                >
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                      name="name"
                      value={newMenuItem.name}
                      onChange={handleMenuItemChange}
                      className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      value={newMenuItem.description}
                      onChange={handleMenuItemChange}
                      className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Price</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      value={newMenuItem.price}
                      onChange={handleMenuItemChange}
                      className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Category</label>
                    <select
                      name="category_id"
                      value={newMenuItem.category_id}
                      onChange={handleMenuItemChange}
                      className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Image URL</label>
                    <input
                      name="image_url"
                      value={newMenuItem.image_url}
                      onChange={handleMenuItemChange}
                      className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]"
                    disabled={addingMenuItem}
                  >
                    {addingMenuItem ? 'Adding...' : 'Add Menu Item'}
                  </button>
                </form>
                <div>
                  <h4 className="text-md font-medium text-[#4A503D] mt-4">Current Menu Items</h4>
                  <ul>
                    {menuItems.map((item, idx) => (
                      <li key={`${item.id}-${idx}`}>
                        {item.name} - {item.price} (
                        {categories.find(c => c.id === item.category_id)?.name || ''})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium text-[#4A503D]">Restaurant Settings</h3>
                <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                  <div className="pb-4">
                    <h4 className="text-lg font-medium text-[#4A503D]">Basic Information</h4>
                    <p className="text-sm text-[#938975]">Update your restaurant details</p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="name">
                        Restaurant Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={restaurant.name || ''}
                        onChange={handleChange}
                        className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={restaurant.phone || ''}
                        onChange={handleChange}
                        className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="address">
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={restaurant.address || ''}
                        onChange={handleChange}
                        className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium" htmlFor="description">
                        Restaurant Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={restaurant.description || ''}
                        onChange={handleChange}
                        className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                      />
                    </div>
                    <button
                      className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>

                
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
