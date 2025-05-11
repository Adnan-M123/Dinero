"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf4e6] text-[#4A503D]">
      <Navbar />

      <div className="flex flex-1">
        <aside className="hidden w-[200px] flex-col border-r border-[#b1a68e] bg-[#CDC1A5] sm:flex">
          <nav className="grid gap-2 p-4">
            {["👤 Profile", "📅 Reservations", "⚙️ Settings"].map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left hover:bg-[#b1a68e] text-[#4A503D]"
              >
                <span className="text-sm">{item.split(" ")[0]}</span>
                {item.split(" ").slice(1).join(" ")}
              </button>
            ))}
            <button className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-100">
              <span className="text-sm">🚪</span>
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white">
                <img src="/placeholder.svg?height=80&width=80" alt="User" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-[#4A503D]">John Doe</h2>
                <p className="text-[#938975]">john.doe@example.com</p>
              </div>
              <button className="sm:ml-auto rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-3 py-1 text-sm hover:bg-[#b1a68e]">
                Edit Profile
              </button>
            </div>

            <div className="space-y-4">
              <div className="border-b border-[#b1a68e]">
                <div className="grid w-full grid-cols-3 text-center text-[#4A503D]">
                  {["upcoming", "past", "settings"].map((tab) => (
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

              {/* Upcoming Reservations */}
              {activeTab === "upcoming" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Upcoming Reservations</h3>
                  {[
                    {
                      title: "The Italian Bistro",
                      date: "May 10, 2025 • 7:30 PM • Table for 2",
                      day: "Friday",
                      time: "7:30 PM",
                    },
                    {
                      title: "Sushi Sensation",
                      date: "May 15, 2025 • 6:00 PM • Table for 4",
                      day: "Wednesday",
                      time: "6:00 PM",
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
                          <button className="rounded-md bg-[#4A503D] px-3 py-1 text-sm text-white hover:bg-[#3c4431]">
                            Modify
                          </button>
                          <button className="rounded-md border border-[#b1a68e] bg-[#CDC1A5] px-3 py-1 text-sm text-[#4A503D] hover:bg-[#b1a68e]">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Past Reservations */}
              {activeTab === "past" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Past Reservations</h3>
                  {[
                    {
                      title: "Steakhouse Prime",
                      date: "April 28, 2025 • 8:00 PM • Table for 2",
                      day: "Friday",
                      time: "8:00 PM",
                    },
                    {
                      title: "Café Parisienne",
                      date: "April 15, 2025 • 12:30 PM • Table for 3",
                      day: "Tuesday",
                      time: "12:30 PM",
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
              {activeTab === "settings" && (
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium text-[#4A503D]">Account Settings</h3>
                  <div className="rounded-lg border border-[#CDC1A5] bg-white p-4">
                    <div className="pb-4">
                      <h4 className="text-lg font-medium text-[#4A503D]">Personal Information</h4>
                      <p className="text-sm text-[#938975]">Update your personal details</p>
                    </div>
                    <div className="space-y-4">
                      {[
                        { id: "name", label: "Full Name", type: "text", defaultValue: "John Doe" },
                        { id: "email", label: "Email", type: "email", defaultValue: "john.doe@example.com" },
                        { id: "phone", label: "Phone Number", type: "tel", defaultValue: "(555) 123-4567" },
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
                          <div className="text-xs text-[#938975]">Receive emails about your reservations</div>
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
      </div>
      <Footer />
    </div>
  );
}
