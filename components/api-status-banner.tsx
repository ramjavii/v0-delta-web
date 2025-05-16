"use client"

import { useEffect, useState } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { isMockDataMode, toggleMockDataMode } from "@/lib/api"

export function ApiStatusBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Enable mock data mode by default
    toggleMockDataMode(true)

    // Check if we're in mock data mode
    const mockMode = isMockDataMode()
    setShowBanner(mockMode)
  }, [])

  if (!showBanner) return null

  return (
    <Alert className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Demo Mode Active</AlertTitle>
      <AlertDescription>
        <span>You are viewing demo data. This is a frontend-only demonstration with sample data.</span>
      </AlertDescription>
    </Alert>
  )
}
