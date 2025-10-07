import React from 'react';
import scheduleData from '../../data/schedi_plan_output.json';
import { useDashboard } from '../../context/DashboardContext';

const ScheduleViewer = ({ dashboardData: propsDashboardData }) => {
  let context;
  try { context = useDashboard(); } catch (e) { context = null; }
  const dashboardData = context ? context.dashboardData : propsDashboardData || {};
  const generateAcademicTerms = (graduationTerm) => {
    const terms = [];
    if (!graduationTerm) return terms; 

    const startYear = 2025; 
    const startSeason = 'Fall'; 

    let currentYear = startYear;
    let currentSeason = startSeason;

    let reachedGraduation = false;

    while (!reachedGraduation) {
      const termString = `${currentSeason} ${currentYear}`;
      terms.push(termString);

      if (termString === graduationTerm) {
        reachedGraduation = true;
      }

      if (currentSeason === 'Fall') {
        currentSeason = 'Spring';
        currentYear++;
      } else {
        currentSeason = 'Fall';
      }
    }
    return terms;
  };

  const academicTerms = generateAcademicTerms(dashboardData.graduationTerm);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Schedule</h2>
      {scheduleData.semesters && scheduleData.semesters.length > 0 ? (
        <div className="space-y-4">
          {scheduleData.semesters.map((semester, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="font-bold">{semester.name}</h3>
              <ul className="list-disc list-inside">
                {semester.courses.map((course, courseIndex) => (
                  <li key={courseIndex}>{course}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 italic">
          No schedule generated yet. Please use the schedule generator to create your schedule.
        </div>
      )}
    </div>
  );
};

export default ScheduleViewer; 