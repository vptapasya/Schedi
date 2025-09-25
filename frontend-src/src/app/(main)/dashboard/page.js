"use client";

import React from 'react';;

function DashboardPage(){

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        {/* Welcome Header */}
        <div className="p-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
            Welcome, Tapasya Velmurugan
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-2">You are 30% of the way to graduation!</p>
          <div className="w-full bg-white border-2 border-black rounded-full h-6 p-1">
            <div className="relative bg-red-500 rounded-full h-full">
              <div className="absolute top-0 left-0 h-full w-[30%] bg-green-500 rounded-l-full"></div>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Schedule Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-[#18453B] text-white p-4 text-center font-bold">
              January 15, 2025
            </div>
            <div className="p-4 relative">
              {/* Timeline with grid for hours */}
              <div className="grid grid-cols-[auto,1fr] gap-x-4 text-sm text-gray-500">
                {['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'].map((time, i) => (
                  <React.Fragment key={time}>
                    <div className="text-right h-12 flex items-start -translate-y-2">{time}</div>
                    <div className="border-t border-gray-200 h-12"></div>
                  </React.Fragment>
                ))}
              </div>
               {/* Events positioned over the grid */}
              <div className="absolute top-4 left-[70px] right-4 bottom-4">
                <div className="absolute top-[calc(1*48px)] h-[96px] w-full bg-cyan-200 text-cyan-900 font-bold p-2 rounded-lg border border-cyan-400">ADV 205</div>
                <div className="absolute top-[calc(3*48px)] h-[96px] w-full bg-pink-200 text-pink-900 font-bold p-2 rounded-lg border border-pink-400">CSE 232</div>
                <div className="absolute top-[calc(8*48px)] h-[48px] w-full bg-orange-200 text-orange-900 font-bold p-2 rounded-lg border border-orange-400">CSE 260</div>
              </div>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-[#18453B] p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-white">Explore These Courses:</h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-[#18453B]">
                <h4 className="font-bold text-gray-800">COM 100: Human Communication (3)</h4>
                <p className="text-sm text-gray-600 mt-1">Process and functions of communication. Principles underlying communication behavior. Practice in analyzing communication situations and in speaking and writing.</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-[#18453B]">
                <h4 className="font-bold text-gray-800">PSY 101: Introductory Psychology (4)</h4>
                <p className="text-sm text-gray-600 mt-1">Mind and behavior from biological, individual, and social perspectives. Scientific and professional aspects of psychology.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;