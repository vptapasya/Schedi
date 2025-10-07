import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

const InterestsSelection = ({ onInterestsComplete, dashboardData: propsDashboardData, setDashboardData: propsSetDashboardData }) => {
  let context;
  try { context = useDashboard(); } catch (e) { context = null; }
  const dashboardData = context ? context.dashboardData : propsDashboardData || {};
  const setDashboardData = context ? context.setDashboardData : propsSetDashboardData || (() => {});
  const allInterests = [
    "AI", "Design", "Web Development", "App Development", "Back End", "Front End",
    "Art", "Painting", "Poetry", "Psychology", "Fashion", "Entrepreneurship",
    "UX", "Hardware", "Gaming", "Startups", "Robotics", "Education",
    "Tech Policy", "Photography", "Travel", "Music", "Sport", "Movies",
    "Nature", "Hiking", "Gastronomy", "Singing", "Dancing", "Astrology",
    "Cars", "Shopping", "Self-care", "Yoga", "Meditation", "Coffee",
    "Skateboarding", "Pottery", "Architecture", "Tattoo", "Crochet", "Festivals",
    "Plants", "Museum", "Podcasts", "Content creation", "Drawing", "Makeup",
    "Climbing", "Crossfit"
  ];

  const [selectedInterests, setSelectedInterests] = useState(dashboardData.interests || []);

  const handleInterestClick = (interest) => {
    setSelectedInterests(prevSelected => {
      if (prevSelected.includes(interest)) {
        return prevSelected.filter(item => item !== interest);
      } else {
        if (prevSelected.length < 5) {
          return [...prevSelected, interest];
        } else {
          return prevSelected;
        }
      }
    });
  };

  const handleContinue = () => {
    setDashboardData(prevData => ({
      ...prevData,
      interests: selectedInterests,
    }));
    onInterestsComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">What inspires you? What do you enjoy?</h1>
        <p className="text-xl text-gray-600">Tell us more about your passions and preferences. Please select up to five words.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-5xl">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {allInterests.map(interest => (
            <button
              key={interest}
              onClick={() => handleInterestClick(interest)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-200 
                ${selectedInterests.includes(interest)
                  ? 'bg-[#1B3B35] text-white border-[#1B3B35]'
                  : 'bg-gray-100 text-gray-700 border-gray-100 hover:bg-gray-200 hover:border-gray-300'}
              `}
            >
              {interest}
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={selectedInterests.length === 0}
            className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200
              ${selectedInterests.length > 0
                ? 'bg-[#1B3B35] text-white hover:bg-[#2C5C53]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestsSelection; 