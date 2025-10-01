"use client";

import React, { useEffect } from 'react';
import Dashboard from '../components/pages/Dashboard';
import DataEntry from '../components/pages/DataEntry';
import InterestsSelection from '../components/pages/InterestsSelection';
import { useDashboard } from '../context/DashboardContext';

export default function HomePage() {
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

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="p-8">
        <Dashboard dashboardData={dashboardData} />
      </div>
    </main>
  );
}