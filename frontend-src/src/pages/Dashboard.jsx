import React, { useState, useEffect } from 'react';
import { mockDashboardData } from '../data/mockData';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setData(mockDashboardData);
  }, []);

  if (!data) {
    return <div className="p-8">Loading...</div>;
  }

  const timeSlots = [8, 9, 10, 11, 12, 1, 2, 3, 4];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getCourseAtTimeSlot = (time, day) => {
    const timeStr = `${time} ${time < 8 ? 'PM' : 'AM'}`;
    return data.schedule.courses.find(course => 
      course.time === timeStr && course.days.includes(day)
    );
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1B3B35] mb-2">Welcome, {data.user}</h1>
        
        <div className="mt-8">
          {/* Daily Schedule */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-[#1B3B35] mb-4">{data.date}</h2>
            <div className="grid grid-cols-6 gap-2">
              {/* Header row */}
              <div className="col-span-1"></div>
              {days.map(day => (
                <div key={day} className="text-center font-semibold text-gray-600">
                  {day}
                </div>
              ))}
              
              {/* Time slots */}
              {timeSlots.map((hour) => (
                <React.Fragment key={hour}>
                  <div className="text-gray-500 py-2">
                    {hour} {hour < 8 ? 'PM' : 'AM'}
                  </div>
                  {days.map(day => {
                    const course = getCourseAtTimeSlot(hour, day);
                    return (
                      <div 
                        key={`${hour}-${day}`} 
                        className={`p-2 rounded ${course ? course.color : 'bg-gray-50'} border border-gray-100`}
                      >
                        {course && (
                          <div className="text-sm font-medium text-white">
                            {course.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 