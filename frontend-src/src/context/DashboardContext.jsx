"use client";

import React, { createContext, useContext, useState } from 'react';
import { mockDashboardData } from '../data/mockData';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useState(mockDashboardData);

  return (
    <DashboardContext.Provider value={{ dashboardData, setDashboardData }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
