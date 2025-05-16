import type { CalendarEvent, Problem } from "@/lib/types"
import {
  mockUsers,
  mockCalendarEvents,
  mockProblems,
  mockForumPosts,
  mockComments,
  mockLeaderboard,
  mockVisualizations,
} from "./mock-data"

// Always use mock data
let useMockData = true

// Helper function to simulate API delay
const simulateDelay = async () => {
  return new Promise((resolve) => setTimeout(resolve, 300))
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:18080/api"

// Helper function for API calls
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // If mock data mode is enabled, throw a specific error to trigger mock data fallback
  if (useMockData) {
    throw new Error("Mock data mode enabled, skipping actual API call")
  }

  const url = `${API_BASE_URL}${endpoint}`

  // Get token from localStorage if available
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    console.log(`API Request: ${options.method || "GET"} ${url}`)

    const response = await fetch(url, {
      ...options,
      headers,
      // Add credentials to handle cookies properly
      credentials: "include",
    })

    // Handle non-2xx responses
    if (!response.ok) {
      let errorMessage = `API request failed with status ${response.status}`

      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch (e) {
        // If parsing JSON fails, use the default error message
      }

      throw new Error(errorMessage)
    }

    // Parse JSON response
    const data = await response.json()
    return data
  } catch (error) {
    // Provide more specific error messages based on the error type
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      console.error(
        "API Connection Error: The API server is unreachable. Please check if the server is running and your network connection is active.",
      )
      throw new Error(
        "Unable to connect to the API server. Please check your network connection or contact support if the issue persists.",
      )
    }

    console.error("API request error:", error)
    throw error
  }
}

// Add this function to toggle mock data mode
export function toggleMockDataMode(enable: boolean) {
  useMockData = enable
  console.log(`Mock data mode ${enable ? "enabled" : "disabled"}`)
  return useMockData
}

// Add this function to check if we're in mock data mode
export function isMockDataMode() {
  return useMockData
}

// Update the authAPI object
export const authAPI = {
  register: async (userData: { username: string; email: string; password: string; role: string }) => {
    if (useMockData) {
      // Simulate successful registration
      return { success: true, userId: 999, message: "Registration successful" }
    }

    try {
      return await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      })
    } catch (error) {
      if (useMockData) {
        return { success: true, userId: 999, message: "Registration successful" }
      }
      throw error
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    if (useMockData) {
      // In demo mode, accept any email with password "demo"
      if (credentials.password === "demo") {
        return {
          success: true,
          token: "mock-jwt-token",
          user: {
            id: 1,
            username: credentials.email.split("@")[0],
            email: credentials.email,
            role: "student",
            coinBalance: 150,
          },
        }
      } else {
        throw new Error("Invalid credentials. In demo mode, use any email with password 'demo'")
      }
    }

    try {
      return await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })
    } catch (error) {
      if (useMockData) {
        // If we switched to mock mode after the API call failed
        if (credentials.password === "demo") {
          return {
            success: true,
            token: "mock-jwt-token",
            user: {
              id: 1,
              username: credentials.email.split("@")[0],
              email: credentials.email,
              role: "student",
              coinBalance: 150,
            },
          }
        }
      }
      throw error
    }
  },

  getCurrentUser: async () => {
    if (useMockData) {
      // Return the first mock user
      return mockUsers[0]
    }

    try {
      return await fetchAPI("/users/me")
    } catch (error) {
      if (useMockData) {
        return mockUsers[0]
      }
      throw error
    }
  },
}

// Calendar API calls
export const calendarAPI = {
  getEvents: async (start: string, end: string) => {
    await simulateDelay()
    return mockCalendarEvents
  },

  createEvent: async (eventData: Omit<CalendarEvent, "id">) => {
    await simulateDelay()
    return { success: true, eventId: 999 }
  },
}

// Problems API calls
export const problemsAPI = {
  getProblems: async (filters?: { difficulty?: string; topic?: string }) => {
    await simulateDelay()
    let filteredProblems = [...mockProblems]

    if (filters?.difficulty && filters.difficulty !== "all") {
      filteredProblems = filteredProblems.filter((p) => p.difficulty === filters.difficulty)
    }

    if (filters?.topic && filters.topic !== "all") {
      filteredProblems = filteredProblems.filter((p) => p.topic === filters.topic)
    }

    return filteredProblems
  },

  submitAnswer: async (problemId: number, answer: string) => {
    await simulateDelay()
    // Simulate answer checking
    const correct = answer === "5" // For problem 1, the answer is x = 5

    return {
      success: true,
      correct,
      message: correct ? "Correct answer!" : "Incorrect answer. Try again.",
    }
  },

  getHistory: async () => {
    await simulateDelay()
    // Simulate problem history
    return {
      attempts: [
        {
          id: 1,
          title: "Solve for x: 2x + 5 = 15",
          difficulty: "easy",
          correct: true,
          timestamp: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 2,
          title: "Find the derivative of f(x) = x³ + 2x² - 4x + 7",
          difficulty: "medium",
          correct: false,
          timestamp: new Date(Date.now() - 172800000).toISOString(),
        },
      ],
    }
  },

  createProblem: async (problemData: Omit<Problem, "id"> & { correctAnswer: string }) => {
    await simulateDelay()
    return { success: true, problemId: 999 }
  },
}

// Leaderboard API calls
export const leaderboardAPI = {
  getLeaderboard: async (limit = 10) => {
    await simulateDelay()
    return { users: mockLeaderboard.slice(0, limit) }
  },
}

// Visualizations API calls
export const visualizationsAPI = {
  getVisualizations: async (topic?: string) => {
    await simulateDelay()
    let filteredVisualizations = [...mockVisualizations]

    if (topic && topic !== "all") {
      filteredVisualizations = filteredVisualizations.filter((v) => v.topic === topic)
    }

    return filteredVisualizations
  },
}

// Forum API calls
export const forumAPI = {
  getPosts: async (limit = 20) => {
    await simulateDelay()
    return mockForumPosts.slice(0, limit)
  },

  createPost: async (postData: { title: string; content: string }) => {
    await simulateDelay()
    return { success: true, postId: 999 }
  },

  getPost: async (postId: number) => {
    await simulateDelay()
    const post = mockForumPosts.find((p) => p.id === postId)
    if (!post) throw new Error("Post not found")
    return post
  },

  getComments: async (postId: number) => {
    await simulateDelay()
    return mockComments.filter((c) => c.postId === postId)
  },

  createComment: async (postId: number, content: string) => {
    await simulateDelay()
    return { success: true, commentId: 999 }
  },
}

// Add this to the existing api.ts file, after the other API objects

// Import the mock exam files
import { mockExamFiles } from "./mock-data"

// Exams API calls
export const examsAPI = {
  getExamFiles: async (type?: string) => {
    await simulateDelay()

    if (type && type !== "all") {
      return mockExamFiles.filter((file) => file.type === type)
    }

    return mockExamFiles
  },

  getExamFileById: async (id: number) => {
    await simulateDelay()
    const file = mockExamFiles.find((file) => file.id === id)

    if (!file) {
      throw new Error("Exam file not found")
    }

    return file
  },
}
