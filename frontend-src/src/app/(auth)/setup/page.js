"use client";

import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function PreferencesPage() {
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState('');
  const [gradYear, setGradYear] = useState('');
  const [creditPref, setCreditPref] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Handle login logic here
    if (!major || !gradYear || !creditPref) {
      alert('Please fill in all fields.');
      return;
    }
    localStorage.setItem('major', major);
    localStorage.setItem('minor', minor);
    localStorage.setItem('gradYear', gradYear);
    localStorage.setItem('creditPref', creditPref);

    router.push('/dashboard');
  };


  return (
    <div className="bg-[#18453B] min-h-screen p-8 flex flex-col font-sans">
      {/* Header Section */}
      <header className="flex justify-between items-center w-full max-w-6xl mx-auto">
        <div className="text-white text-3xl font-bold">Schedi</div>
      </header>

      {/* Main Content - Login Form */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-black mb-8">
            Enter Your Preferences:
          </h2>
          <form className="space-y-6">
            {/* Form Row: Major */}
            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4">
              <label htmlFor="major" className="text-black text-lg font-bold whitespace-nowrap">
                Major:<span className="text-red-500 text-2xl font-bold">*</span>
              </label>
              <input
                type="text"
                id="major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full p-3 bg-[#F3F3F3] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>

            {/* Form Row: Minor */}
            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4">
              <label htmlFor="minor" className="text-black text-lg font-bold whitespace-nowrap">
                Minor:
              </label>
              <input
                type="text"
                id="minor"
                value={minor}
                onChange={(e) => setMinor(e.target.value)}
                className="w-full p-3 bg-[#F3F3F3] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Row: Graduation Year */}
            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4">
              <label htmlFor="grad-year" className="text-black text-lg font-bold whitespace-nowrap">
                Graduation Year:<span className="text-red-500 text-2xl font-bold">*</span>
              </label>
              <input
                type="text"
                id="grad-year"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                // Calculated based on you being a freshman in Fall 2025
                className="w-full p-3 bg-[#F3F3F3] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Row: Credit Preference */}
            <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4">
              <label htmlFor="credits" className="text-black text-lg font-bold whitespace-nowrap">
                Credit Preference:<span className="text-red-500 text-2xl font-bold">*</span>
              </label>
              <input
                type="number"
                id="credits"
                value={creditPref}
                onChange={(e) => setCreditPref(e.target.value)}
                className="w-full p-3 bg-[#F3F3F3] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>

            <button
                type="button"
                onClick={() => {
                  // Handle sign up logic here
                  handleSubmit();
                }}
                className="text-black font-bold hover:underline cursor-pointer"
              >
                Sign up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};