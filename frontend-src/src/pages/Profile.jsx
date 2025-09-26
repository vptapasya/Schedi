import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

const Profile = ({ dashboardData: propsDashboardData, setDashboardData: propsSetDashboardData }) => {
  let context;
  try { context = useDashboard(); } catch (e) { context = null; }
  const dashboardData = context ? context.dashboardData : propsDashboardData || {};
  const setDashboardData = context ? context.setDashboardData : propsSetDashboardData || (() => {});
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    major: '',
    minor: '',
    graduationTerm: '',
    creditPreference: '',
    creditsCompleted: 0
  });

  // Generate graduation term options
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
    // Initialize form with existing data from props
    setData(dashboardData); // Use dashboardData from props
    setFormData({
      major: dashboardData.major || '',
      minor: dashboardData.minor || '',
      graduationTerm: dashboardData.graduationTerm || '',
      creditPreference: dashboardData.creditPreference || '',
      creditsCompleted: dashboardData.creditsCompleted || 0
    });
  }, [dashboardData]); // Depend on dashboardData prop

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update global dashboard data state
    setDashboardData(prevData => ({
      ...prevData,
      ...formData
    }));
    setIsEditing(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    // Reset form data to current data from props
    setFormData({
      major: dashboardData.major || '',
      minor: dashboardData.minor || '',
      graduationTerm: dashboardData.graduationTerm || '',
      creditPreference: dashboardData.creditPreference || '',
      creditsCompleted: dashboardData.creditsCompleted || 0
    });
    setIsEditing(false);
  };

  if (!data) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#1B3B35]">Profile</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1B3B35] text-white rounded-lg hover:bg-[#2C5C53] transition-colors"
          >
            {isEditing ? (
              <>
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Settings className="w-5 h-5" />
                <span>Edit Profile</span>
              </>
            )}
          </button>
        </div>

        {showConfirmation && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline ml-2">Profile updated successfully!</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3B35] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minor</label>
                  <input
                    type="text"
                    name="minor"
                    value={formData.minor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3B35] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation</label>
                  <select
                    name="graduationTerm"
                    value={formData.graduationTerm}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3B35] focus:border-transparent"
                    required
                  >
                    <option value="">Select graduation term</option>
                    {generateGraduationTerms().map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credit Preference</label>
                  <select
                    name="creditPreference"
                    value={formData.creditPreference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3B35] focus:focus:border-transparent"
                    required
                  >
                    <option value="">Select preference</option>
                    <option value="12">12 credits</option>
                    <option value="15">15 credits</option>
                    <option value="18">18 credits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credits Completed</label>
                  <input
                    type="number"
                    name="creditsCompleted"
                    value={formData.creditsCompleted}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B3B35] focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1B3B35] text-white rounded-lg hover:bg-[#2C5C53] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-[#1B3B35] text-white rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Student Information</h2>
                  <div className="space-y-2">
                    <p>Name: {dashboardData.user}</p>
                    <p>Major: {dashboardData.major || 'N/A'}</p>
                    <p>Minor: {dashboardData.minor || 'N/A'}</p>
                    <p>Expected Graduation: {dashboardData.graduationTerm || 'N/A'}</p>
                    <p>Credit Preference: {dashboardData.creditPreference ? `${dashboardData.creditPreference} credits` : 'N/A'}</p>
                    <p>Credits Completed: {dashboardData.creditsCompleted || 0}</p>
                  </div>
                </div>

                <div className="bg-[#1B3B35] text-white rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {dashboardData.interests && dashboardData.interests.length > 0 ? (
                      dashboardData.interests.map((interest, index) => (
                        <span key={index} className="px-4 py-2 rounded-full bg-white text-[#1B3B35] text-sm font-medium">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-300">No interests selected.</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1B3B35] mb-4">Completed Coursework</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dashboardData.completedCourses.map((course, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                      <h3 className="font-semibold text-lg text-[#1B3B35]">{course.code}</h3>
                      <p className="text-gray-600">Credits: {course.credits}</p>
                      <p className="text-gray-600">Professor: {course.professor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 