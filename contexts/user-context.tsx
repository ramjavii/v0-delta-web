"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User } from "@/lib/types"

interface UserContextType {
  user: User
  setUserRole: (role: "student" | "teacher") => void
}

// Default user data
const defaultUser: User = {
  id: 1,
  username: "Demo User",
  email: "demo@example.com",
  role: "student",
  coinBalance: 150,
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)

  const setUserRole = (role: "student" | "teacher") => {
    setUser({
      ...user,
      role,
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUserRole,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
