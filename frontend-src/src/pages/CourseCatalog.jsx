import React, { useState } from 'react';
import { X } from 'lucide-react';
import courseData from '../data/courses.json';

const CourseCard = ({ course, onClick }) => (
  <div
    onClick={() => onClick(course)}
    className="bg-[#1B3B35] text-white rounded-lg p-4 cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-lg"
  >
    <h3 className="font-semibold">{course.code}</h3>
    <p className="text-sm text-white/80 mt-1">{course.title}</p>
    <div className="mt-2 space-y-1 text-sm">
      <p>Credits: {course.credits}</p>
      <p>Professor: {course.professor}</p>
    </div>
  </div>
);

export const CourseModal = ({ course, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl max-w-xl w-full mx-4 max-h-[60vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1B3B35]">{course.code}</h2>
            <p className="text-lg text-gray-600">{course.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-[#1B3B35] mb-2">Course Description</h3>
            <p className="text-gray-600">{course.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-[#1B3B35] mb-2">Prerequisites</h3>
            <ul className="list-disc list-inside text-gray-600">
              {course.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1B3B35] mb-2">Class Times</h3>
            <ul className="list-disc list-inside text-gray-600">
              {course.times.map((time, index) => (
                <li key={index}>{time}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#1B3B35] mb-2">Professor Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium">{course.professor}</p>
              <div className="flex items-center mt-2">
                <div className="text-yellow-400">{'★'.repeat(Math.floor(course.professorRating))}</div>
                <span className="ml-2 text-gray-600">{course.professorRating}/5.0</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#1B3B35] mb-2">Student Reviews</h3>
            <div className="space-y-2">
              {course.reviews.map((review, index) => (
                <p key={index} className="p-3 bg-gray-50 rounded-lg text-gray-600">
                  "{review}"
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CourseCatalog = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[#1B3B35] mb-12">Course Catalog</h1>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-[#1B3B35] mb-6">
              Courses you should take next semester
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {courseData.courses.map((course) => (
                <CourseCard
                  key={course.code}
                  course={course}
                  onClick={setSelectedCourse}
                />
              ))}
            </div>
          </section>
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

export default CourseCatalog; 