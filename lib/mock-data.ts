import type {
  User,
  CalendarEvent,
  Problem,
  ForumPost,
  Comment,
  LeaderboardEntry,
  Visualization,
  ExamFile,
} from "./types"

// Mock user data
export const mockUsers: User[] = [
  {
    id: 1,
    username: "student1",
    email: "student1@example.com",
    role: "student",
    coinBalance: 150,
  },
  {
    id: 2,
    username: "teacher1",
    email: "teacher1@example.com",
    role: "teacher",
    coinBalance: 500,
  },
]

// Mock calendar events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Algebra Lecture",
    description: "Introduction to algebraic expressions",
    eventType: "lecture",
    startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    endTime: new Date(Date.now() + 86400000 + 3600000).toISOString(), // Tomorrow + 1 hour
  },
  {
    id: 2,
    title: "Calculus Exam",
    description: "Final exam covering all calculus topics",
    eventType: "exam",
    startTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    endTime: new Date(Date.now() + 172800000 + 7200000).toISOString(), // Day after tomorrow + 2 hours
  },
]

// Mock problems
export const mockProblems: Problem[] = [
  {
    id: 1,
    title: "Solve for x: 2x + 5 = 15",
    description: "Find the value of x in the given linear equation.",
    difficulty: "easy",
    topic: "Algebra",
    pointValue: 10,
  },
  {
    id: 2,
    title: "Find the derivative of f(x) = x³ + 2x² - 4x + 7",
    description: "Calculate the first derivative of the given polynomial function.",
    difficulty: "medium",
    topic: "Calculus",
    pointValue: 20,
  },
  {
    id: 3,
    title: "Prove the Pythagorean theorem",
    description: "Provide a mathematical proof for the Pythagorean theorem (a² + b² = c²).",
    difficulty: "hard",
    topic: "Geometry",
    pointValue: 30,
  },
]

// Mock forum posts
export const mockForumPosts: ForumPost[] = [
  {
    id: 1,
    authorId: 1,
    authorName: "student1",
    title: "Help with integration by parts",
    content: "I'm struggling with integration by parts. Can someone explain the formula and provide an example?",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  },
  {
    id: 2,
    authorId: 2,
    authorName: "teacher1",
    title: "Tips for solving quadratic equations",
    content: "Here are some helpful tips for solving quadratic equations quickly...",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
]

// Mock comments
export const mockComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    authorId: 2,
    authorName: "teacher1",
    content:
      "The formula for integration by parts is ∫u(x)v'(x)dx = u(x)v(x) - ∫u'(x)v(x)dx. Let me know if you need more help!",
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    id: 2,
    postId: 1,
    authorId: 1,
    authorName: "student1",
    content: "Thank you! That helps a lot.",
    createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
  },
]

// Mock leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, id: 2, username: "teacher1", coins: 500 },
  { rank: 2, id: 1, username: "student1", coins: 150 },
  { rank: 3, id: 3, username: "student2", coins: 120 },
  { rank: 4, id: 4, username: "student3", coins: 100 },
  { rank: 5, id: 5, username: "student4", coins: 80 },
]

// Mock visualizations
export const mockVisualizations: Visualization[] = [
  {
    id: 1,
    title: "Quadratic Function Visualization",
    description: "Interactive visualization of y = ax² + bx + c with adjustable parameters.",
    visualizationType: "line",
    topic: "Algebra",
    dataPayload: {
      labels: ["-10", "-8", "-6", "-4", "-2", "0", "2", "4", "6", "8", "10"],
      datasets: [
        {
          label: "y = x²",
          data: [100, 64, 36, 16, 4, 0, 4, 16, 36, 64, 100],
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
      xAxisLabel: "x",
      yAxisLabel: "y",
      title: "Quadratic Function: y = x²",
    },
  },
  {
    id: 2,
    title: "Trigonometric Functions",
    description: "Visualization of sine and cosine functions over the interval [0, 2π].",
    visualizationType: "line",
    topic: "Trigonometry",
    dataPayload: {
      labels: ["0", "π/4", "π/2", "3π/4", "π", "5π/4", "3π/2", "7π/4", "2π"],
      datasets: [
        {
          label: "sin(x)",
          data: [0, 0.7071, 1, 0.7071, 0, -0.7071, -1, -0.7071, 0],
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
        },
        {
          label: "cos(x)",
          data: [1, 0.7071, 0, -0.7071, -1, -0.7071, 0, 0.7071, 1],
          borderColor: "rgb(54, 162, 235)",
          tension: 0.1,
        },
      ],
      xAxisLabel: "x",
      yAxisLabel: "y",
      title: "Trigonometric Functions",
    },
  },
]

// Mock exam files
export const mockExamFiles: ExamFile[] = [
  {
    id: 1,
    title: "Exam 2024",
    year: 2024,
    type: "exam",
    fileUrl: "/sample-exams/exam-2024.pdf",
    uploadDate: new Date(2024, 0, 15).toISOString(),
  },
  {
    id: 2,
    title: "Exam 2023",
    year: 2023,
    type: "exam",
    fileUrl: "/sample-exams/exam-2023.pdf",
    uploadDate: new Date(2023, 0, 15).toISOString(),
  },
  {
    id: 3,
    title: "Exam 2022",
    year: 2022,
    type: "exam",
    fileUrl: "/sample-exams/exam-2022.pdf",
    uploadDate: new Date(2022, 0, 15).toISOString(),
  },
  {
    id: 4,
    title: "Exam 2021 B",
    year: 2021,
    type: "exam",
    semester: "B",
    fileUrl: "/sample-exams/exam-2021-b.pdf",
    uploadDate: new Date(2021, 6, 15).toISOString(),
  },
  {
    id: 5,
    title: "Exam 2021 A",
    year: 2021,
    type: "exam",
    semester: "A",
    fileUrl: "/sample-exams/exam-2021-a.pdf",
    uploadDate: new Date(2021, 0, 15).toISOString(),
  },
  {
    id: 6,
    title: "Exam 2020",
    year: 2020,
    type: "exam",
    fileUrl: "/sample-exams/exam-2020.pdf",
    uploadDate: new Date(2020, 0, 15).toISOString(),
  },
  {
    id: 7,
    title: "Midterm 2019",
    year: 2019,
    type: "midterm",
    fileUrl: "/sample-exams/midterm-2019.pdf",
    uploadDate: new Date(2019, 3, 15).toISOString(),
  },
  {
    id: 8,
    title: "Midterm 2018",
    year: 2018,
    type: "midterm",
    fileUrl: "/sample-exams/midterm-2018.pdf",
    uploadDate: new Date(2018, 3, 15).toISOString(),
  },
  {
    id: 9,
    title: "Final 2023",
    year: 2023,
    type: "final",
    fileUrl: "/sample-exams/final-2023.pdf",
    uploadDate: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: 10,
    title: "Final 2022",
    year: 2022,
    type: "final",
    fileUrl: "/sample-exams/final-2022.pdf",
    uploadDate: new Date(2022, 5, 15).toISOString(),
  },
  {
    id: 11,
    title: "Final 2021",
    year: 2021,
    type: "final",
    fileUrl: "/sample-exams/final-2021.pdf",
    uploadDate: new Date(2021, 5, 15).toISOString(),
  },
  {
    id: 12,
    title: "Final 2020",
    year: 2020,
    type: "final",
    fileUrl: "/sample-exams/final-2020.pdf",
    uploadDate: new Date(2020, 5, 15).toISOString(),
  },
  {
    id: 13,
    title: "Final 2019",
    year: 2019,
    type: "final",
    fileUrl: "/sample-exams/final-2019.pdf",
    uploadDate: new Date(2019, 5, 15).toISOString(),
  },
  {
    id: 14,
    title: "Final 2018",
    year: 2018,
    type: "final",
    fileUrl: "/sample-exams/final-2018.pdf",
    uploadDate: new Date(2018, 5, 15).toISOString(),
  },
]
