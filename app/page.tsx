"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"

export default function Home() {
  const router = useRouter()
  const { setUserRole } = useUser()

  const handleEnterAsStudent = () => {
    setUserRole("student")
    router.push("/dashboard")
  }

  const handleEnterAsTeacher = () => {
    setUserRole("teacher")
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">DELTA</CardTitle>
          <CardDescription className="text-center text-lg">Mathematics Education Platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p>Welcome to DELTA, your interactive platform for mathematics education.</p>
          <p>Choose a role to continue:</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button onClick={handleEnterAsStudent}>Enter as Student</Button>
            <Button onClick={handleEnterAsTeacher}>Enter as Teacher</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
