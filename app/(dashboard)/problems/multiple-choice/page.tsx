"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { MultipleChoiceProblem } from "@/components/problems/multiple-choice-problem"
import { useToast } from "@/components/ui/use-toast"

// Sample multiple choice problems
const sampleProblems = [
  {
    id: 101,
    title: "Quadratic Formula",
    description: "Which of the following is the correct quadratic formula for solving ax² + bx + c = 0?",
    difficulty: "medium",
    topic: "Algebra",
    pointValue: 15,
    options: [
      { id: "a", text: "x = (-b ± √(b² - 4ac)) / 2a", isCorrect: true },
      { id: "b", text: "x = (-b ± √(b² + 4ac)) / 2a", isCorrect: false },
      { id: "c", text: "x = (b ± √(b² - 4ac)) / 2a", isCorrect: false },
      { id: "d", text: "x = (-b ± √(b² - 4ac)) / a", isCorrect: false },
    ],
  },
  {
    id: 102,
    title: "Derivative of sin(x)",
    description: "What is the derivative of sin(x) with respect to x?",
    difficulty: "easy",
    topic: "Calculus",
    pointValue: 10,
    options: [
      { id: "a", text: "cos(x)", isCorrect: true },
      { id: "b", text: "-cos(x)", isCorrect: false },
      { id: "c", text: "sin(x)", isCorrect: false },
      { id: "d", text: "-sin(x)", isCorrect: false },
    ],
  },
  {
    id: 103,
    title: "Pythagorean Theorem",
    description:
      "In a right triangle with legs a and b and hypotenuse c, which equation represents the Pythagorean theorem?",
    difficulty: "easy",
    topic: "Geometry",
    pointValue: 10,
    options: [
      { id: "a", text: "a² + b² = c²", isCorrect: true },
      { id: "b", text: "a + b = c", isCorrect: false },
      { id: "c", text: "a² - b² = c²", isCorrect: false },
      { id: "d", text: "a + b + c = 180°", isCorrect: false },
    ],
  },
  {
    id: 104,
    title: "Limit Evaluation",
    description: "Evaluate the limit: lim(x→0) (sin(x) / x)",
    difficulty: "hard",
    topic: "Calculus",
    pointValue: 20,
    options: [
      { id: "a", text: "1", isCorrect: true },
      { id: "b", text: "0", isCorrect: false },
      { id: "c", text: "∞", isCorrect: false },
      { id: "d", text: "The limit does not exist", isCorrect: false },
    ],
  },
]

export default function MultipleChoiceProblemsPage() {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [score, setScore] = useState(0)
  const { toast } = useToast()

  const handleSubmit = (problemId: number, selectedOptionId: string, isCorrect: boolean) => {
    if (isCorrect) {
      const points = sampleProblems[currentProblemIndex].pointValue
      setScore((prev) => prev + points)
      toast({
        title: "Correct!",
        description: `You earned ${points} points.`,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Incorrect",
        description: "Try again or move to the next problem.",
      })
    }
  }

  const handleNextProblem = () => {
    if (currentProblemIndex < sampleProblems.length - 1) {
      setCurrentProblemIndex((prev) => prev + 1)
    }
  }

  const handlePrevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex((prev) => prev - 1)
    }
  }

  const currentProblem = sampleProblems[currentProblemIndex]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/problems" className="flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Problems
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-brand-blue font-bold">Score: {score}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-400">
            Problem {currentProblemIndex + 1} of {sampleProblems.length}
          </span>
        </div>
      </div>

      <MultipleChoiceProblem {...currentProblem} onSubmit={handleSubmit} />

      <div className="flex justify-between">
        <Button
          onClick={handlePrevProblem}
          disabled={currentProblemIndex === 0}
          variant="outline"
          className="border-white/10 text-white hover:bg-white/5"
        >
          Previous Problem
        </Button>
        <Button
          onClick={handleNextProblem}
          disabled={currentProblemIndex === sampleProblems.length - 1}
          className="bg-brand-red hover:bg-brand-red/90 text-white"
        >
          Next Problem
        </Button>
      </div>
    </div>
  )
}
