import React, { useState, useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';

const MAJORS = [
  "Applied Engineering Sciences",
  "Biosystems Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Computational Data Science",
  "Computer Engineering",
  "Computer Science",
  "Data Science",
  "Electrical Engineering",
  "Environmental Engineering",
  "Materials Science and Engineering",
  "Mechanical Engineering",
  "Techonology Engineering",
];

const DataEntry = ({ onSetupComplete, dashboardData: propsDashboardData, setDashboardData: propsSetDashboardData }) => {
  // Prefer context when available
  let context;
  try { context = useDashboard(); } catch (e) { context = null; }
  const dashboardData = context ? context.dashboardData : propsDashboardData || {};
  const setDashboardData = context ? context.setDashboardData : propsSetDashboardData || (() => {});
  const [formData, setFormData] = useState({
    major: '',
    minor: '',
    graduationTerm: '',
    creditPreference: ''
  });

  const generateGraduationTerms = () => {
    const terms = ['Fall', 'Spring'];
    const currentYear = new Date().getFullYear();
    const options = [];
    
    // Generate options for the next 4 years
    for (let year = currentYear; year <= currentYear + 4; year++) {
      terms.forEach(term => {
        options.push(`${term} ${year}`);
      });
    }
    return options;
  };

  useEffect(() => {
    setFormData({
      major: dashboardData.major || '',
      minor: dashboardData.minor || '',
      graduationTerm: dashboardData.graduationTerm || '',
      creditPreference: dashboardData.creditPreference || ''
    });
  }, [dashboardData]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update global dashboard data state
    setDashboardData(prevData => ({
      ...prevData,
      ...formData,
      creditPreference: parseInt(formData.creditPreference) 
    }));

    alert('Profile information updated successfully!');
    
    onSetupComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1B3B35] mb-4">Welcome to Schedi!</h1>
          <p className="text-gray-600">Please set up your profile information to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                Major *
              </label>
              <select
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B3B35] focus:border-transparent"
                required
              >
                <option value="">Select your major</option>
                {MAJORS.map((major) => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="minor" className="block text-sm font-medium text-gray-700 mb-1">
                Minor
              </label>
              <input
                type="text"
                id="minor"
                name="minor"
                value={formData.minor}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B3B35] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="graduationTerm" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Graduation *
              </label>
              <select
                id="graduationTerm"
                name="graduationTerm"
                value={formData.graduationTerm}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1B3B35] focus:border-transparent"
                required
              >
                <option value="">Select graduation term</option>
                {generateGraduationTerms().map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="creditPreference" className="block text-sm font-medium text-gray-700 mb-1">
                Credit Preference (per semester) *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-150 ${formData.creditPreference === 12 ? 'bg-blue-600 text-white' : 'text-gray-700 border-gray-300 hover:bg-blue-100'}`}
                  onClick={() => setFormData(prev => ({ ...prev, creditPreference: 12 }))}
                >
                  Light
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-150 ${formData.creditPreference === 15 ? 'bg-blue-600 text-white' : 'text-gray-700 border-gray-300 hover:bg-blue-100'}`}
                  onClick={() => setFormData(prev => ({ ...prev, creditPreference: 15 }))}
                >
                  Standard 
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg border font-medium transition-colors duration-150 ${formData.creditPreference === 18 ? 'bg-blue-600 text-white' : 'text-gray-700 border-gray-300 hover:bg-blue-100'}`}
                  onClick={() => setFormData(prev => ({ ...prev, creditPreference: 18 }))}
                >
                  Rigorous
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B3B35] text-white py-3 px-4 rounded-lg hover:bg-[#1B3B35]/90 transition-colors text-lg font-medium"
            >
              Get Started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataEntry; 