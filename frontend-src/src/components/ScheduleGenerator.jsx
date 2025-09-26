import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const ScheduleGenerator = ({ dashboardData: propsDashboardData }) => {
  let context;
  try { context = useDashboard(); } catch (e) { context = null; }
  const dashboardData = context ? context.dashboardData : propsDashboardData || {};
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    // Prepare user preferences from dashboardData
    const userPreferences = {
      major: dashboardData.major,
      minor: dashboardData.minor || '',
      graduationTerm: dashboardData.graduationTerm,
      creditPreference: dashboardData.creditPreference,
      interests: dashboardData.interests || []
    };

    try {
      const response = await fetch('https://schedi.onrender.com/generate_schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userPreferences),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate schedule');
      }

      const data = await response.json();
      setSchedule(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Schedule Generator</h2>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-[#1B3B35] text-white px-4 py-2 rounded hover:bg-[#1B3B35]/90 disabled:bg-gray-400 mb-4"
      >
        {loading ? 'Generating...' : 'Generate Schedule'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {schedule && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Generated Schedule</h3>
          <div className="space-y-4">
            {Object.entries(schedule).map(([semester, courses]) => (
              <div key={semester} className="border p-4 rounded">
                <h4 className="font-bold">{semester}</h4>
                <ul className="list-disc list-inside">
                  {courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleGenerator; 