// /app/profile/page.jsx

import React from 'react';


// Data for the course cards for easy mapping
const courses = [
  { code: 'EGR 100', credits: 2, grade: 4.0, professor: 'J Morgan' },
  { code: 'CSD 203', credits: 3, grade: 4.0, professor: 'S Ramani' },
  { code: 'PHY 183', credits: 4, grade: 3.5, professor: 'T Nagy' },
  { code: 'WRA 101', credits: 4, grade: 4.0, professor: 'G Walter' },
];

const ProfilePage = () => {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 font-sans">
      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10">
        <h1 className="text-4xl font-bold italic text-center mb-10 text-gray-800">
          Profile
        </h1>

        {/* Top Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Card */}
          <div className="bg-[#18453B] text-white p-6 rounded-2xl shadow-lg space-y-2">
            <p className="font-bold text-lg">Undergraduate Student</p>
            <p className="font-bold text-lg">College of Engineering</p>
            <p className="font-bold text-lg">36 Credits Completed</p>
            <p className="font-bold text-lg">3.9 GPA</p>
          </div>
          {/* Right Card */}
          <div className="bg-[#18453B] text-white p-6 rounded-2xl shadow-lg space-y-2">
            <p className="text-lg">Major: <span className="font-bold">Computer Science</span></p>
            <p className="text-lg">Minor: <span className="font-bold">Cognitive Science</span></p>
            <p className="text-lg">Graduation Year: <span className="font-bold">Spring 2027</span></p>
            <p className="text-lg">Credit Preference: <span className="font-bold">18</span></p>
          </div>
        </div>

        {/* Completed Coursework Card */}
        <div className="bg-[#18453B] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl text-white font-bold text-center mb-6">
            Completed Coursework
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.code} className="bg-white p-4 rounded-lg text-gray-800 shadow space-y-1">
                <h3 className="text-center font-bold text-lg mb-2">{course.code}</h3>
                <p><span className="font-bold">Credits:</span> {course.credits}</p>
                <p><span className="font-bold">Grade:</span> {course.grade.toFixed(1)}</p>
                <p><span className="font-bold">Professor:</span> {course.professor}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;