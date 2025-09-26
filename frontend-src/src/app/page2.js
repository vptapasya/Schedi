"use client";

import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    // Handle login logic here
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    localStorage.setItem('loginEmail', email);
    localStorage.setItem('loginPassword', password);

    router.push('/setup');
  };


  return (
    <div className="bg-[#18453B] min-h-screen p-8 flex flex-col font-sans">
      {/* Header Section */}
      <header className="flex justify-between items-center w-full max-w-6xl mx-auto">
        <div className="text-white text-3xl font-bold">Schedi</div>
        <button className="bg-white cursor-pointer text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors">
          Request
        </button>
      </header>

      {/* Main Content - Login Form */}
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">
          <form>
            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-black text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-[#F3F3F3] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-black text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#F3F3F3] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Links */}
            <div className="flex justify-between items-center mx-20">
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
              <Link
                href="#"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
