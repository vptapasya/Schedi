"use client";

import React from 'react';
import Profile from '../../components/pages/Profile';

export default function ProfilePage() {
  // When navigated directly, Profile expects dashboardData prop. The component reads from props,
  // but to support direct routing we render without props (Profile uses dashboardData prop in app flow).
  return <Profile dashboardData={{}} setDashboardData={() => {}} />;
}
