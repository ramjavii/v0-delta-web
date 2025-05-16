"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Plus, Trash2, Check } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"

interface Option {
  id: string
  text: string
  isCorrect: boolean
}

export default function CreateProblemPage() {
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "medium",
    topic: "Algebra",
    pointValue: "10",
    type: "multiple-choice",
    options: [
      { id: "a", text: "", isCorrect: false },
      { id: "b", text: "", isCorrect: false },
      { id: "c", text: "", isCorrect: false },
      { id: "d", text: "", isCorrect: false },
    ] as Option[],
  })

  // Redirect if not a teacher
  if (user.role !== "teacher") {
    router.push("/problems")
    return null
  }

  const handleOptionChange = (index: number, field: keyof Option, value: string | boolean) => {
    const newOptions = [...formData.options]

    if (field === "isCorrect" && value === true) {
      // Uncheck all other options
      newOptions.forEach((option, i) => {
        option.isCorrect = i === index
      })
    } else {
      newOptions[index] = { ...newOptions[index], [field]: value }
    }

    setFormData({ ...formData, options: newOptions })
  }

  const addOption = () => {
    if (formData.options.length >= 8) {
      toast({
        variant: "destructive",
        title: "Maximum options reached",
        description: "You can have a maximum of 8 options.",
      })
      return
    }

    const newId = String.fromCharCode(97 + formData.options.length) // a, b, c, ...
    setFormData({
      ...formData,
      options: [...formData.options, { id: newId, text: "", isCorrect: false }],
    })
  }

  const removeOption = (index: number) => {
    if (formData.options.length <= 2) {
      toast({
        variant: "destructive",
        title: "Minimum options required",
        description: "You need at least 2 options for a multiple choice problem.",
      })
      return
    }

    const newOptions = formData.options.filter((_, i) => i !== index)

    // Reassign IDs to maintain sequential lettering
    const updatedOptions = newOptions.map((option, i) => ({
      ...option,
      id: String.fromCharCode(97 + i),
    }))

    setFormData({ ...formData, options: updatedOptions })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide a title and description for the problem.",
      })
      return
    }

    const hasCorrectOption = formData.options.some((option) => option.isCorrect)
    if (!hasCorrectOption) {
      toast({
        variant: "destructive",
        title: "No correct answer",
        description: "Please mark at least one option as correct.",
      })
      return
    }

    const emptyOptions = formData.options.some((option) => !option.text.trim())
    if (emptyOptions) {
      toast({
        variant: "destructive",
        title: "Empty options",
        description: "Please provide text for all options.",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would submit to an API
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Problem created",
        description: "The multiple choice problem has been successfully created.",
      })

      // Redirect back to the problems page
      router.push("/problems")
    } catch (error) {
      console.error("Failed to create problem:", error)
      toast({
        variant: "destructive",
        title: "Creation failed",
        description: "Failed to create the problem. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/problems" className="flex items-center text-gray-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Problems
        </Link>
      </div>

      <Card className="border border-white/10 bg-black">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-white">Create Multiple Choice Problem</CardTitle>
            <CardDescription className="text-gray-400">
              Create a new multiple choice problem for students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Problem Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Quadratic Formula"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-black border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Problem Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="e.g., Which of the following is the correct quadratic formula for solving ax² + bx + c = 0?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] bg-black border-white/10 text-white placeholder:text-gray-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-white">
                    Difficulty
                  </Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger id="difficulty" className="bg-black border-white/10 text-white">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-white">
                    Topic
                  </Label>
                  <Select value={formData.topic} onValueChange={(value) => setFormData({ ...formData, topic: value })}>
                    <SelectTrigger id="topic" className="bg-black border-white/10 text-white">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-white/10 text-white">
                      <SelectItem value="Algebra">Algebra</SelectItem>
                      <SelectItem value="Calculus">Calculus</SelectItem>
                      <SelectItem value="Geometry">Geometry</SelectItem>
                      <SelectItem value="Trigonometry">Trigonometry</SelectItem>
                      <SelectItem value="Statistics">Statistics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pointValue" className="text-white">
                    Point Value
                  </Label>
                  <Input
                    id="pointValue"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.pointValue}
                    onChange={(e) => setFormData({ ...formData, pointValue: e.target.value })}
                    className="bg-black border-white/10 text-white"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Answer Options</h3>
                <Button
                  type="button"
                  onClick={addOption}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Option
                </Button>
              </div>

              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white">
                      {option.id}
                    </div>
                    <div className="flex-grow">
                      <Input
                        value={option.text}
                        onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                        placeholder={`Option ${option.id}`}
                        className="bg-black border-white/10 text-white placeholder:text-gray-500"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant={option.isCorrect ? "blue" : "outline"}
                      className={option.isCorrect ? "" : "border-white/10 text-white hover:bg-white/5"}
                      onClick={() => handleOptionChange(index, "isCorrect", !option.isCorrect)}
                    >
                      {option.isCorrect && <Check className="mr-2 h-4 w-4" />}
                      {option.isCorrect ? "Correct" : "Mark Correct"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/5"
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove option</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-white/10 pt-6">
            <Button type="submit" disabled={isSubmitting} className="bg-brand-red hover:bg-brand-red/90 text-white">
              {isSubmitting ? "Creating..." : "Create Problem"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
