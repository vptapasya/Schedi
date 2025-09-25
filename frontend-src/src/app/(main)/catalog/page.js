"use client";

import React from 'react';

// --- Personalized MSU Course Data ---

// For a CS major finishing freshman year
const nextSemesterCourses = [
  { code: 'CSE 232', title: 'Intro to Programming II', credits: 4, description: 'Continues from CSE 231, focusing on algorithms, data structures, and object-oriented programming in C++.' },
  { code: 'MTH 133', title: 'Calculus II', credits: 4, description: 'Covers integration techniques, sequences, series, and an introduction to differential equations.' },
  { code: 'STT 351', title: 'Probability & Statistics', credits: 3, description: 'A calculus-based probability course covering random variables, distributions, and statistical inference.' },
  { code: 'ISS 210', title: 'Society & the Individual', credits: 4, description: 'Examines the relationship between individuals and society through various social science perspectives.' },
  { code: 'WRA 101', title: 'Writing, Rhetoric & American Cultures', credits: 4, description: 'Focuses on composing, analyzing, and researching arguments in different genres.' },
];

// Courses for your major and industry (Software/AI)
const industryCourses = [
  { code: 'CSE 440', title: 'Intro to AI', credits: 3, description: 'Core concepts of artificial intelligence, including search, knowledge representation, and machine learning.' },
  { code: 'CSE 482', title: 'Big Data Analysis', credits: 3, description: 'Techniques for storing, processing, and analyzing large-scale datasets using tools like Hadoop and Spark.' },
  { code: 'CSE 476', title: 'Mobile App Development', credits: 3, description: 'Design and implementation of applications for mobile devices, such as Android or iOS.' },
  { code: 'CSE 450', title: 'Translation of Prog. Languages', credits: 3, description: 'Principles of compiler design, including lexical analysis, parsing, and code generation.' },
  { code: 'MI 455', title: 'UX Research and Strategy', credits: 3, description: 'Methods for understanding user needs and behaviors to inform the design of digital products.' },
];

// Courses that might align with your other interests (AI, Entrepreneurship)
const interestCourses = [
    { code: 'CSE 448', title: 'Object-Oriented Design', credits: 3, description: 'Covers software design patterns and principles for building complex, maintainable software systems.' },
    { code: 'PHL 357', title: 'Philosophy of Mind', credits: 3, description: 'Explores philosophical questions about consciousness, intelligence, and the nature of mental states.' },
    { code: 'PSY 200', title: 'Cognitive Psychology', credits: 3, description: 'The scientific study of mental processes such as attention, language use, memory, and problem solving.' },
    { code: 'EGR 360', title: 'Entrepreneurial Business', credits: 3, description: 'Fundamentals of creating and managing a technology-based startup, from idea to business plan.' },
    { code: 'LIN 450', title: 'Intro to Cognitive Science', credits: 3, description: 'An interdisciplinary approach to the study of the mind, drawing from AI, psychology, and linguistics.' },
];


const CourseCard = ({ course }) => (
  <div className="flex-shrink-0 w-64 h-48 bg-[#18453B] text-white p-4 rounded-2xl shadow-lg flex flex-col">
    <h3 className="font-bold">{course.code}: {course.title}</h3>
    <p className="text-sm text-gray-300 mb-2">Credits: {course.credits}</p>
    <p className="text-sm text-gray-200 flex-grow">{course.description}</p>
  </div>
);

const CourseRow = ({ title, courses }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-gray-700 mb-3">{title}</h2>
    <div className="flex space-x-6 pb-4 overflow-x-auto custom-scrollbar">
      {courses.map((course) => <CourseCard key={course.code} course={course} />)}
    </div>
  </section>
);


const CatalogPage = () => {
  return (
    <>
      {/* CSS for custom scrollbar. In a real app, move this to a global CSS file. */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background-color: #f9fafb; /* gray-50 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #18453B; /* gray-400 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #1E3A3A; /* gray-500 */
        }
      `}</style>

      <div className="flex min-h-screen overflow-x-hidden bg-gray-50 font-sans">

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-10 overflow-hidden">
          <h1 className="text-4xl font-bold italic text-center mb-10 text-gray-800">
            Course Catalog
          </h1>

          <CourseRow title="Courses you should take next semester" courses={nextSemesterCourses} />
          <CourseRow title="Courses that align with your industry" courses={industryCourses} />
          <CourseRow title="Courses that align with your Interests" courses={interestCourses} />
          
        </main>
      </div>
    </>
  );
};

export default CatalogPage;