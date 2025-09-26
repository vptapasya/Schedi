"use client";

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Calendar, BookOpen, User } from 'lucide-react';
import Dashboard from '../pages/Dashboard';
import DataEntry from '../pages/DataEntry';
import InterestsSelection from '../pages/InterestsSelection';
import Navbar from '../components/Navbar';
import { useDashboard } from '../context/DashboardContext';

const Sidebar = ({ pathname }) => {
  const router = useRouter();

  const getLinkClass = (path) => {
    return `flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${pathname === path ? 'bg-[#2C5C53]' : 'hover:bg-[#1B3B35]/80'}`;
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="w-64 bg-[#1B3B35] text-white h-screen p-4">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="space-y-2">
            <div onClick={() => handleNavigation('/')} className={getLinkClass('/')}>
              <Home className="w-6 h-6" />
              <span>Dashboard</span>
            </div>
            <div onClick={() => handleNavigation('/schedule')} className={getLinkClass('/schedule')}>
              <Calendar className="w-6 h-6" />
              <span>Schedule Builder</span>
            </div>
            <div onClick={() => handleNavigation('/catalog')} className={getLinkClass('/catalog')}>
              <BookOpen className="w-6 h-6" />
              <span>Course Catalog</span>
            </div>
            <div onClick={() => handleNavigation('/profile')} className={getLinkClass('/profile')}>
              <User className="w-6 h-6" />
              <span>Profile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const pathname = usePathname();
  const { dashboardData, setDashboardData } = useDashboard();
  const [isProfileSetupComplete, setIsProfileSetupComplete] = React.useState(false);
  const [isInterestsSelectionComplete, setIsInterestsSelectionComplete] = React.useState(false);

  useEffect(() => {
    const hasProfilePreferences = dashboardData.major &&
                                  dashboardData.graduationTerm &&
                                  dashboardData.creditPreference;
    setIsProfileSetupComplete(Boolean(hasProfilePreferences));

    const hasInterests = dashboardData.interests && dashboardData.interests.length > 0;
    setIsInterestsSelectionComplete(Boolean(hasInterests));
  }, [dashboardData]);

  if (!isProfileSetupComplete) {
    return <DataEntry onSetupComplete={() => setIsProfileSetupComplete(true)} setDashboardData={setDashboardData} dashboardData={dashboardData} />;
  }

  if (!isInterestsSelectionComplete) {
    return <InterestsSelection onInterestsComplete={() => setIsInterestsSelectionComplete(true)} setDashboardData={setDashboardData} dashboardData={dashboardData} />;
  }

  // The `Navbar` and `Sidebar` are provided by RootLayout; render the page content here.
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="p-8">
        {pathname === '/' && <Dashboard dashboardData={dashboardData} />}
      </div>
    </main>
  );
};

export default App;