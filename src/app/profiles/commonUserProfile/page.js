"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { CgProfile } from "react-icons/cg";
import { PiCalendarDuotone } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPicHovered, setIsPicHovered] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    axios.get('http://localhost:5001/api/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setProfile(res.data);
        setEditData({
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone || "",
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Not logged in");
        setTimeout(() => router.push('/login'), 1500);
      });
  }, [router]);

  // Handle edit form changes
  const handleEditChange = e => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    try {
      await axios.put('http://localhost:5001/api/auth/profile', editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile({ ...profile, ...editData });
      setEditMode(false);
      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  // (Optional) Handle profile picture upload
  const handlePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePicture', file);
    try {
      const res = await axios.post('http://localhost:5001/api/auth/profile-picture', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile({ ...profile, profile_picture: res.data.url });
      toast.success("Profile picture updated!");
    } catch {
      toast.error("Failed to upload picture");
    }
  };

  // Reservation modal handlers
  const handleCancelClick = (reservation) => {
    setReservationToCancel(reservation);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = () => {
    // Here you would normally send an API request to cancel
    toast.success("Your reservation is successfully canceled");
    setIsModalOpen(false);
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  const navItems = [
    { label: 'Profile', icon: <CgProfile className="text-xl" /> },
    { label: 'Reservations', icon: <PiCalendarDuotone className="text-xl" /> },
    { label: 'Settings', icon: <IoSettingsOutline className="text-xl" /> },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf4e6] text-[#4A503D]">
      <Navbar />

      <div className="flex flex-1">
        <aside className="hidden w-[200px] flex-col border-r border-[#b1a68e] bg-[#CDC1A5] sm:flex">
          <nav className="grid gap-2 p-4">
            {navItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-[#b1a68e] text-[#4A503D]"
              >
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <button
              className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-100"
              onClick={() => {
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                router.push('/');
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div
                className="relative h-20 w-20 overflow-hidden rounded-full bg-white group cursor-pointer"
                onMouseEnter={() => setIsPicHovered(true)}
                onMouseLeave={() => setIsPicHovered(false)}
                onClick={() => {
                  if (editMode && fileInputRef.current) {
                    fileInputRef.current.click();
                  }
                }}
                style={{ pointerEvents: editMode ? "auto" : "none" }}
              >
                <img
                  src={profile.profile_picture ? `http://localhost:5001${profile.profile_picture}` : '/placeholder.svg?height=80&width=80'}
                  alt="User"
                  className="h-full w-full object-cover"
                />
                {/* Overlay on hover */}
                {(editMode || isPicHovered) && (
                  <div className="absolute inset-0 bg-[#bdbdbd] bg-opacity-20 flex items-center justify-center transition">
                    <FaPlus className="text-white text-2xl" />
                  </div>
                )}
                {/* Profile picture upload, only clickable in edit mode */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="absolute bottom-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  title="Upload profile picture"
                  onChange={handlePictureUpload}
                  disabled={!editMode}
                  style={{ display: "none" }}
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#4A503D]">{profile.username}</h2>
                <p className="text-[#938975]">{profile.email}</p>
              </div>
              {!editMode && (
                <button
                  className="sm:ml-auto rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-3 py-1 text-sm hover:bg-[#b1a68e]"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Edit Profile Form */}
            {editMode && (
              <div className="rounded-lg border border-[#CDC1A5] bg-white p-4 mb-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="username">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={editData.username}
                      onChange={handleEditChange}
                      className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={editData.email}
                      onChange={handleEditChange}
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
                      value={editData.phone}
                      onChange={handleEditChange}
                      className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]"
                      onClick={handleSaveChanges}
                      type="button"
                    >
                      Save Changes
                    </button>
                    <button
                      className="rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-4 py-2 text-[#4A503D] hover:bg-[#b1a68e]"
                      onClick={() => setEditMode(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="border-b border-[#b1a68e]">
                <div className="grid w-full grid-cols-3 text-center text-[#4A503D]">
                  {['upcoming', 'past', 'settings'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`border-b-2 py-2 transition-colors ${
                        activeTab === tab
                          ? 'border-[#4A503D] font-semibold'
                          : 'border-transparent hover:border-[#938975]'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upcoming Reservations */}
              {activeTab === 'upcoming' && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Upcoming Reservations</h3>
                  {[
                    {
                      title: 'The Italian Bistro',
                      date: 'May 10, 2025 • 7:30 PM • Table for 2',
                      day: 'Friday',
                      time: '7:30 PM',
                    },
                    {
                      title: 'Sushi Sensation',
                      date: 'May 15, 2025 • 6:00 PM • Table for 4',
                      day: 'Wednesday',
                      time: '6:00 PM',
                    },
                  ].map((res, idx) => (
                    <div key={idx} className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                      <div className="pb-2">
                        <h4 className="text-lg font-medium text-[#4A503D]">{res.title}</h4>
                        <p className="text-sm text-[#938975]">{res.date}</p>
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-4 text-sm text-[#b1a68e]">
                          <span>📅 {res.day}</span>
                          <span>⏰ {res.time}</span>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            className="rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-3 py-1 text-sm text-[#4A503D] hover:bg-[#b1a68e]"
                            onClick={() => handleCancelClick(res)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Past Reservations */}
              {activeTab === 'past' && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Past Reservations</h3>
                  {[
                    {
                      title: 'Steakhouse Prime',
                      date: 'April 28, 2025 • 8:00 PM • Table for 2',
                      day: 'Friday',
                      time: '8:00 PM',
                    },
                    {
                      title: 'Café Parisienne',
                      date: 'April 15, 2025 • 12:30 PM • Table for 3',
                      day: 'Tuesday',
                      time: '12:30 PM',
                    },
                  ].map((res, idx) => (
                    <div key={idx} className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                      <div className="pb-2">
                        <h4 className="text-lg font-medium text-[#4A503D]">{res.title}</h4>
                        <p className="text-sm text-[#938975]">{res.date}</p>
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-4 text-sm text-[#4A503D]">
                          <span>📅 {res.day}</span>
                          <span>⏰ {res.time}</span>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button className="rounded-md bg-[#4A503D] px-3 py-1 text-sm text-white hover:bg-[#3c4431]">
                            Book Again
                          </button>
                          <button className="rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-3 py-1 text-sm text-[#4A503D] hover:bg-[#b1a68e]">
                            Leave Review
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Account Settings</h3>
                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <div className="pb-4">
                      <h4 className="text-lg font-medium text-[#4A503D]">Personal Information</h4>
                      <p className="text-sm text-[#938975]">Update your personal details</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { id: 'name', label: 'Full Name', type: 'text', defaultValue: 'John Doe' },
                        {
                          id: 'email',
                          label: 'Email',
                          type: 'email',
                          defaultValue: 'john.doe@example.com',
                        },
                        {
                          id: 'phone',
                          label: 'Phone Number',
                          type: 'tel',
                          defaultValue: '(555) 123-4567',
                        },
                      ].map(field => (
                        <div key={field.id} className="grid gap-2">
                          <label className="text-sm font-medium" htmlFor={field.id}>
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            defaultValue={field.defaultValue}
                            className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                          />
                        </div>
                      ))}
                      <button className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <div className="pb-4">
                      <h4 className="text-lg font-medium text-[#4A503D]">Preferences</h4>
                      <p className="text-sm text-[#938975]">Customize your dining preferences</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Email Notifications</div>
                          <div className="text-xs text-[#938975]">
                            Receive emails about your reservations
                          </div>
                        </div>
                        <div className="h-6 w-11 cursor-pointer rounded-full bg-[#4A503D] p-1">
                          <div className="h-4 w-4 translate-x-5 rounded-full bg-white shadow-md"></div>
                        </div>
                      </div>
                      <button className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop with blur and transparency */}
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: 0.3, backdropFilter: 'blur(4px)' }}
              onClick={() => setIsModalOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="z-10 w-[400px] rounded-lg border border-[#b1a68e] bg-white p-6 shadow-xl">
              <h3 className="mb-4 text-lg font-semibold text-[#4A503D]">Confirm Cancellation</h3>
              <p className="mb-6 text-sm text-[#938975]">
                Are you sure you want to cancel this reservation?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-4 py-1.5 text-sm hover:bg-[#b1a68e] transition"
                >
                  No
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="rounded-md bg-red-600 px-4 py-1.5 text-sm text-white hover:bg-red-700 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </div>
  );
}
