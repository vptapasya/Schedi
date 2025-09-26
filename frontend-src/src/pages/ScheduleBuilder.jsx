import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { X } from 'lucide-react';
import { CourseModal } from './CourseCatalog';
import allCourseData from '../data/courses.json';

const ScheduleBuilder = ({ dashboardData: propsDashboardData }) => {
  let context;
  try { context = useDashboard(); } catch (e) { context = null; }
  const dashboardData = context ? context.dashboardData : propsDashboardData || {};
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('');
  const [schedulesByTerm, setSchedulesByTerm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawSchedule, setRawSchedule] = useState(null);
  const [customFeedback, setCustomFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(false);
  const [modalFeedback, setModalFeedback] = useState("");
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [feedbackSectionVisible, setFeedbackSectionVisible] = useState(false);

  const courseDetailsMap = allCourseData.courses.reduce((acc, course) => {
    acc[course.code] = course;
    return acc;
  }, {});

  const parseCourseTime = (timeString) => {
    const [daysPart, timePart] = timeString.split(' ');
    const [startTime] = timePart.split('-');
    const hour = parseInt(startTime.split(':')[0]);

    const days = [];
    if (daysPart.includes('M')) days.push('Monday');
    if (daysPart.includes('T') && !daysPart.includes('Th')) days.push('Tuesday');
    if (daysPart.includes('W')) days.push('Wednesday');
    if (daysPart.includes('Th')) days.push('Thursday');
    if (daysPart.includes('F')) days.push('Friday');
    
    return { days, hour };
  };

  // Function to generate academic terms from Fall 2025 to graduation term
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

  // Function to map schedi_plan_output to a calendar grid format
  const mapGeneratedScheduleToGrid = (planOutput, courseDetails, gradTerm) => {
    const semesterSchedules = {};
    const academicTerms = generateAcademicTerms(gradTerm);
    academicTerms.forEach((term, termIndex) => {
      const semesterKey = `Semester ${termIndex + 1}`;
      const coursesForSemester = planOutput[semesterKey] || [];
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const initialSchedule = {};
      dayNames.forEach(day => {
        initialSchedule[day] = {};
        for (let hour = 8; hour <= 17; hour++) {
          initialSchedule[day][hour] = null;
        }
      });
      coursesForSemester.forEach(courseName => {
        const course = courseDetails[courseName];
        if (course && course.times) {
          course.times.forEach(timeString => {
            const { days, hour } = parseCourseTime(timeString);
            days.forEach(day => {
              if (initialSchedule[day] && initialSchedule[day][hour] === null) {
                initialSchedule[day][hour] = course;
              }
            });
          });
        }
      });
      semesterSchedules[term] = initialSchedule;
    });
    return semesterSchedules;
  };

  useEffect(() => {
    // Automatically generate schedule when component mounts or dashboardData changes
    const generateSchedule = async () => {
      setLoading(true);
      setError(null);
      setRawSchedule(null);
      try {
        const userPreferences = {
          major: dashboardData.major,
          minor: dashboardData.minor || '',
          graduationTerm: dashboardData.graduationTerm,
          creditPreference: dashboardData.creditPreference,
          interests: dashboardData.interests || []
        };
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
        setRawSchedule(data);
        const generatedSchedules = mapGeneratedScheduleToGrid(
          data,
          courseDetailsMap,
          dashboardData.graduationTerm
        );
        setSchedulesByTerm(generatedSchedules);
        const terms = generateAcademicTerms(dashboardData.graduationTerm);
        if (terms.length > 0) {
          setActiveTab(terms[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    generateSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardData]);

  const currentSchedule = schedulesByTerm[activeTab];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  async function sendFeedback(message, fromModal = false) {
    if (!message) {
      if (fromModal) setModalError("Please enter feedback or select a quick option.");
      else console.log("No message to send, aborting.");
      return;
    }
    if (fromModal) {
      setModalLoading(true);
      setModalError("");
      setModalSuccess(false);
    }
    console.log("Sending feedback:", message);
    try {
      const res = await fetch("https://schedi.onrender.com/refine_schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const errMsg = `Server returned error status: ${res.status}`;
        if (fromModal) setModalError(errMsg);
        else console.error(errMsg);
        return;
      }
      const data = await res.json();
      console.log("Received response:", data);
      if (!data.schedule) {
        if (fromModal) setModalError("No schedule returned from backend.");
        return;
      }
      let updatedRawSchedule;
      try {
        updatedRawSchedule = typeof data.schedule === 'string' ? JSON.parse(data.schedule) : data.schedule;
      } catch {
        updatedRawSchedule = data.schedule;
      }
      setRawSchedule(updatedRawSchedule);
      // Re-map the new schedule to the grid
      const generatedSchedules = mapGeneratedScheduleToGrid(
        updatedRawSchedule,
        courseDetailsMap,
        dashboardData.graduationTerm
      );
      console.log("Mapped schedule for UI:", generatedSchedules);
      setSchedulesByTerm(generatedSchedules);
      setCustomFeedback("");
      if (fromModal) {
        setModalSuccess(true);
        setModalLoading(false);
        setTimeout(() => {
          setShowModal(false);
          setModalSuccess(false);
          setLocked(false);
          setFeedbackSectionVisible(true);
        }, 1200);
      }
    } catch (err) {
      if (fromModal) setModalError("Failed to refine schedule: " + err.message);
      else console.error("Failed to refine schedule", err);
    } finally {
      if (fromModal) setModalLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#1B3B35]">Schedule Builder</h1>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded bg-green-600 text-white font-semibold ${locked ? 'opacity-60 cursor-not-allowed' : ''}`}
              onClick={() => { setLocked(true); setFeedbackSectionVisible(false); }}
              disabled={locked}
            >
              Save
            </button>
            <button
              className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold`}
              onClick={() => { setShowModal(true); setLocked(false); }}
            >
              Change
            </button>
          </div>
        </div>
        {/* Modal for feedback */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
              <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={() => setShowModal(false)}>
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold mb-4">Request a Change</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className="px-3 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setModalFeedback("One less class")}
                  disabled={modalLoading}
                >
                  One less class
                </button>
                <button
                  className="px-3 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setModalFeedback("No 8AMs")}
                  disabled={modalLoading}
                >
                  No 8AMs
                </button>
                <button
                  className="px-3 py-2 bg-blue-500 text-white rounded"
                  onClick={() => setModalFeedback("No Friday classes")}
                  disabled={modalLoading}
                >
                  No Friday classes
                </button>
              </div>
              <input
                type="text"
                placeholder="Or type your own request..."
                value={modalFeedback}
                onChange={e => setModalFeedback(e.target.value)}
                className="p-2 w-full border rounded mb-4"
                disabled={modalLoading}
              />
              <button
                className="w-full py-2 bg-green-600 text-white rounded font-semibold mb-2 disabled:opacity-60"
                onClick={() => sendFeedback(modalFeedback, true)}
                disabled={modalLoading}
              >
                {modalLoading ? 'Submitting...' : 'Submit Change'}
              </button>
              {modalSuccess && <div className="text-green-600 text-center font-semibold mb-2">Schedule updated!</div>}
              {modalError && <div className="text-red-600 text-center font-semibold mb-2">Couldn't update: {modalError}</div>}
            </div>
          </div>
        )}
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {Object.keys(schedulesByTerm).map(term => (
            <button
              key={term}
              onClick={() => setActiveTab(term)}
              className={`py-3 px-6 text-lg font-medium transition-colors duration-200 
                ${activeTab === term ? 'border-b-2 border-[#1B3B35] text-[#1B3B35]' : 'text-gray-500 hover:text-gray-700'}`}
            >
               {term}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-600 text-center text-lg mt-12">Generating schedule...</p>}
        {error && <p className="text-red-600 text-center text-lg mt-12">{error}</p>}

        <div className="grid grid-cols-[1fr] gap-8">
          {/* Schedule Grid */}
          <div className={`bg-white rounded-xl shadow-sm p-6 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
            {currentSchedule ? (
              <div className="grid grid-cols-6 gap-4">
                {/* Time labels */}
                <div className="col-span-1">
                  <div className="h-12"></div>
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="h-20 flex items-center justify-end pr-4 text-sm text-gray-500"
                    >
                      {hour}:00
                    </div>
                  ))}
                </div>
                
                {/* Days */}
                {days.map((day) => (
                  <div key={day} className="col-span-1">
                    <div className="h-12 flex items-center justify-center font-medium text-[#1B3B35]">
                      {day}
                    </div>
                    {hours.map((hour) => {
                      const course = currentSchedule[day][hour];
                      return (
                        <div 
                          key={hour}
                          className="h-20 border border-gray-200 relative"
                          onClick={() => course && handleCourseClick(course)} 
                        >
                          {course && (
                            <div
                              className={`absolute inset-0 ${course.color} bg-opacity-20 hover:bg-opacity-30 cursor-pointer transition-colors p-2`}
                            >
                              <p className="text-sm font-medium">{course.code}</p>
                              <p className="text-xs">{course.title}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              !loading && !error && <p className="text-gray-600 text-center text-lg mt-12">No schedule data available for {activeTab}.</p>
            )}
          </div>
        </div>
      </div>
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default ScheduleBuilder; 