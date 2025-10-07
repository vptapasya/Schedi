export const mockDashboardData = {
  user: "Tapy",
  graduationProgress: 45,
  date: "Monday, March 18, 2024",
  // Clear these fields to trigger the initial setup
  major: '',
  minor: '',
  graduationTerm: '',
  creditPreference: '',
  interests: [],
  completedCourses: [
    { code: "EGR 100", credits: 2, grade: 4.0, professor: "J Morgan" },
    { code: "CSD 203", credits: 3, grade: 4.0, professor: "S Ramani" },
    { code: "PHY 183", credits: 4, grade: 3.5, professor: "T Nagy" },
    { code: "WRA 101", credits: 4, grade: 4.0, professor: "G Walter" }
  ],
  schedule: {
    courses: [
      {
        name: "Introduction to Engineering Design",
        time: "10 AM",
        days: ["Mon", "Wed"],
        color: "bg-blue-500"
      },
      {
        name: "Computer Systems Design",
        time: "11 AM",
        days: ["Tue", "Thu"],
        color: "bg-green-500"
      },
      {
        name: "Physics for Scientists",
        time: "2 PM",
        days: ["Mon", "Wed", "Fri"],
        color: "bg-red-500"
      }
    ]
  },
  suggestedCourses: [
    {
      code: "CSE 231",
      name: "Introduction to Programming I",
      credits: 4,
      description: "Introduction to programming concepts and problem-solving techniques using Python."
    },
    {
      code: "MTH 132",
      name: "Calculus I",
      credits: 4,
      description: "Differential calculus, including limits, derivatives, and applications."
    },
    {
      code: "STT 200",
      name: "Statistical Methods",
      credits: 3,
      description: "Introduction to statistical methods and their applications in various fields."
    }
  ]
}; 