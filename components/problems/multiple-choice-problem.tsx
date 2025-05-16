"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

export interface MultipleChoiceOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface MultipleChoiceProblemProps {
  id: number
  title: string
  description: string
  difficulty: string
  topic: string
  pointValue: number
  options: MultipleChoiceOption[]
  onSubmit?: (problemId: number, selectedOptionId: string, isCorrect: boolean) => void
}

export function MultipleChoiceProblem({
  id,
  title,
  description,
  difficulty,
  topic,
  pointValue,
  options,
  onSubmit,
}: MultipleChoiceProblemProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSubmit = () => {
    if (!selectedOption) return

    const selected = options.find((option) => option.id === selectedOption)
    const correct = selected?.isCorrect || false

    setIsCorrect(correct)
    setIsSubmitted(true)

    if (onSubmit) {
      onSubmit(id, selectedOption, correct)
    }
  }

  const handleReset = () => {
    setSelectedOption(null)
    setIsSubmitted(false)
  }

  return (
    <Card className="card-modern overflow-hidden border border-white/10 bg-black">
      <CardHeader className="bg-black border-b border-white/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                difficulty === "easy"
                  ? "bg-green-900/30 text-green-400"
                  : difficulty === "medium"
                    ? "bg-yellow-900/30 text-yellow-400"
                    : "bg-red-900/30 text-red-400"
              }`}
            >
              {difficulty}
            </span>
            <span className="text-sm text-gray-400">{pointValue} points</span>
          </div>
        </div>
        <CardDescription className="text-gray-400">{topic}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose prose-invert max-w-none">
          <p>{description}</p>
        </div>

        <div className="mt-6">
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
            disabled={isSubmitted}
            className="space-y-3"
          >
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center space-x-2 rounded-md border p-3 ${
                  isSubmitted && option.id === selectedOption
                    ? option.isCorrect
                      ? "border-green-500 bg-green-900/20"
                      : "border-red-500 bg-red-900/20"
                    : isSubmitted && option.isCorrect
                      ? "border-green-500 bg-green-900/20"
                      : "border-white/10 hover:border-white/20"
                }`}
              >
                <RadioGroupItem
                  value={option.id}
                  id={option.id}
                  className={isSubmitted && option.isCorrect ? "text-green-500" : ""}
                />
                <Label
                  htmlFor={option.id}
                  className={`flex-grow ${
                    isSubmitted && option.id === selectedOption
                      ? option.isCorrect
                        ? "text-green-400"
                        : "text-red-400"
                      : isSubmitted && option.isCorrect
                        ? "text-green-400"
                        : "text-white"
                  }`}
                >
                  {option.text}
                </Label>
                {isSubmitted &&
                  option.id === selectedOption &&
                  (option.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ))}
                {isSubmitted && option.id !== selectedOption && option.isCorrect && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="border-t border-white/10 bg-black/50 flex justify-between">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white"
          >
            Submit Answer
          </Button>
        ) : (
          <>
            <div className="flex items-center">
              {isCorrect ? (
                <div className="flex items-center text-green-500">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  <span>Correct! You earned {pointValue} points.</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <XCircle className="mr-2 h-5 w-5" />
                  <span>Incorrect. Try again!</span>
                </div>
              )}
            </div>
            <Button onClick={handleReset} variant="outline" className="border-white/10 text-white hover:bg-white/5">
              Try Another
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
