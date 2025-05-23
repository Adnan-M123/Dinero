"use client"

import { useState } from "react"
import Navbar from "@/app/components/Navbar"
import Footer from "@/app/components/Footer"
import { TbLogout } from "react-icons/tb";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoRestaurantOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const navItems = [
    {
      label: 'Dashboard',
      icon: <TbBrandGoogleAnalytics className="text-xl" />, 
    },
    {
      label: 'Restaurant',
      icon: <IoRestaurantOutline  className="text-xl" />,
    },
    {
      label: 'Settings',
      icon: <IoSettingsOutline className="text-xl" />,
    },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-[#fbf4e6] text-[#4A503D]">
      <Navbar />

      <div className="flex flex-1">
        <aside className="hidden w-[200px] flex-col border-r border-[#b1a68e] bg-[#CDC1A5] sm:flex">
          <nav className="grid gap-2 p-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-[#b1a68e] ${
                  activeTab === item.value ? "bg-[#b1a68e] font-medium" : ""
                } text-[#4A503D]`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <button className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-100">
              <span className="text-sm"><TbLogout className="text-xl"/></span>
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Restaurant Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#4A503D]">Italian Bistro</h2>
                <p className="text-[#938975]">admin@italianbistro.com</p>
              </div>
              <button className="sm:ml-auto rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-3 py-1 text-sm hover:bg-[#b1a68e]">
                Edit Profile
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-b border-[#b1a68e]">
                <div className="grid w-full grid-cols-3 text-center text-[#4A503D]">
                  {["dashboard", "restaurant", "settings"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`border-b-2 py-2 transition-colors ${
                        activeTab === tab
                          ? "border-[#4A503D] font-semibold"
                          : "border-transparent hover:border-[#938975]"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dashboard */}
              {activeTab === "dashboard" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Restaurant Dashboard</h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                      { title: "Today's Reservations", value: "12", icon: "📅" },
                      { title: "Available Tables", value: "8", icon: "🪑" },
                      { title: "This Week's Revenue", value: "$3,450", icon: "💰" },
                    ].map((metric, idx) => (
                      <div key={idx} className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[#938975]">{metric.title}</p>
                            <p className="text-2xl font-bold text-[#4A503D]">{metric.value}</p>
                          </div>
                          <div className="text-2xl">{metric.icon}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <h4 className="mb-4 text-lg font-medium text-[#4A503D]">Today's Reservations</h4>
                    <div className="space-y-3">
                      {[
                        { name: "John Smith", time: "12:30 PM", guests: 2, status: "Confirmed" },
                        { name: "Maria Garcia", time: "1:00 PM", guests: 4, status: "Confirmed" },
                        { name: "Robert Johnson", time: "7:30 PM", guests: 6, status: "Pending" },
                        { name: "Emily Davis", time: "8:00 PM", guests: 2, status: "Confirmed" },
                      ].map((reservation, idx) => (
                        <div key={idx} className="flex items-center justify-between border-b border-[#CDC1A5] pb-2">
                          <div>
                            <p className="font-medium text-[#4A503D]">{reservation.name}</p>
                            <p className="text-sm text-[#938975]">
                              {reservation.time} • {reservation.guests} guests
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                reservation.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {reservation.status}
                            </span>
                            <button className="rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-2 py-1 text-xs hover:bg-[#b1a68e]">
                              Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 rounded-md bg-[#4A503D] px-3 py-1 text-sm text-white hover:bg-[#3c4431]">
                      View All Reservations
                    </button>
                  </div>
                </div>
              )}

              {/* Restaurant Information */}
              {activeTab === "restaurant" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Restaurant Information</h3>
                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <div className="pb-4">
                      <h4 className="text-lg font-medium text-[#4A503D]">Basic Information</h4>
                      <p className="text-sm text-[#938975]">Update your restaurant details</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { id: "name", label: "Restaurant Name", type: "text", defaultValue: "Italian Bistro" },
                        {
                          id: "email",
                          label: "Contact Email",
                          type: "email",
                          defaultValue: "contact@italianbistro.com",
                        },
                        { id: "phone", label: "Phone Number", type: "tel", defaultValue: "(555) 123-4567" },
                        { id: "address", label: "Address", type: "text", defaultValue: "123 Main St, Anytown, USA" },
                      ].map((field) => (
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
                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="description">
                          Restaurant Description
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          defaultValue="Authentic Italian cuisine in a cozy atmosphere. We specialize in handmade pasta and wood-fired pizzas using traditional recipes."
                          className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                        />
                      </div>
                      <button className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]">
                        Save Changes
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <div className="pb-4">
                      <h4 className="text-lg font-medium text-[#4A503D]">Hours of Operation</h4>
                      <p className="text-sm text-[#938975]">Set your restaurant's opening hours</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { day: "Monday", open: "11:00 AM", close: "10:00 PM" },
                        { day: "Tuesday", open: "11:00 AM", close: "10:00 PM" },
                        { day: "Wednesday", open: "11:00 AM", close: "10:00 PM" },
                        { day: "Thursday", open: "11:00 AM", close: "10:00 PM" },
                        { day: "Friday", open: "11:00 AM", close: "11:00 PM" },
                        { day: "Saturday", open: "10:00 AM", close: "11:00 PM" },
                        { day: "Sunday", open: "10:00 AM", close: "9:00 PM" },
                      ].map((hours, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="w-24 font-medium text-[#4A503D]">{hours.day}</span>
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              defaultValue={hours.open.replace(" AM", "").replace(" PM", "")}
                              className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-2 py-1"
                            />
                            <span>to</span>
                            <input
                              type="time"
                              defaultValue={hours.close.replace(" AM", "").replace(" PM", "")}
                              className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-2 py-1"
                            />
                          </div>
                        </div>
                      ))}
                      <button className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]">
                        Update Hours
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings */}
              {activeTab === "settings" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Admin Settings</h3>
                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <div className="pb-4">
                      <h4 className="text-lg font-medium text-[#4A503D]">Reservation Settings</h4>
                      <p className="text-sm text-[#938975]">Configure how reservations work</p>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="max-party">
                          Maximum Party Size
                        </label>
                        <input
                          id="max-party"
                          type="number"
                          defaultValue="10"
                          className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                        />
                      </div>
                      <div className="grid gap-2">
                        <label className="text-sm font-medium" htmlFor="reservation-interval">
                          Reservation Time Interval (minutes)
                        </label>
                        <select
                          id="reservation-interval"
                          defaultValue="30"
                          className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">60 minutes</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Require Confirmation</div>
                          <div className="text-xs text-[#938975]">Manually confirm all reservations</div>
                        </div>
                        <div className="h-6 w-11 cursor-pointer rounded-full bg-[#4A503D] p-1">
                          <div className="h-4 w-4 translate-x-5 rounded-full bg-white shadow-md"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="text-sm font-medium">Email Notifications</div>
                          <div className="text-xs text-[#938975]">Receive emails for new reservations</div>
                        </div>
                        <div className="h-6 w-11 cursor-pointer rounded-full bg-[#4A503D] p-1">
                          <div className="h-4 w-4 translate-x-5 rounded-full bg-white shadow-md"></div>
                        </div>
                      </div>
                      <button className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]">
                        Save Settings
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <div className="pb-4">
                      <h4 className="text-lg font-medium text-[#4A503D]">Account Security</h4>
                      <p className="text-sm text-[#938975]">Update your password</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { id: "current-password", label: "Current Password", type: "password" },
                        { id: "new-password", label: "New Password", type: "password" },
                        { id: "confirm-password", label: "Confirm New Password", type: "password" },
                      ].map((field) => (
                        <div key={field.id} className="grid gap-2">
                          <label className="text-sm font-medium" htmlFor={field.id}>
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            className="rounded-md border border-[#b1a68e] bg-[#fbf4e6] px-3 py-2"
                          />
                        </div>
                      ))}
                      <button className="rounded-md bg-[#4A503D] px-4 py-2 text-white hover:bg-[#3c4431]">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
