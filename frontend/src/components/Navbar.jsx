import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1B3B35] text-white p-4 z-50 shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {/* App Name/Logo */}
        <span className="text-2xl font-bold">SchediApp</span>
      </div>
      <div className="flex items-center space-x-4">
        {/* Placeholder for future buttons/icons */}
        {/* Example: <button className="p-2 rounded-full hover:bg-[#2C5C53]"><Settings className="w-6 h-6" /></button> */}
      </div>
    </nav>
  );
};

export default Navbar; 