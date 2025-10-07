"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Calendar, BookOpen, User } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const getLinkClass = (path) => {
    return `flex items-center space-x-2 p-2 rounded-lg cursor-pointer ${pathname === path ? 'bg-[#2C5C53]' : 'hover:bg-[#1B3B35]/80'}`;
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="w-64 bg-[#1B3B35] text-white h-screen p-4 fixed left-0 top-16">
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
}
