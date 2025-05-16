"use client"

import { useState, useEffect } from "react"
import { problemsAPI } from "@/lib/api"
import type { Problem } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Search, BookOpen, Plus, ChevronRight, CheckCircle, Lock } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Define the chapters
const chapters = [
  { id: 1, title: "Álgebra Básica", description: "Operaciones fundamentales y ecuaciones lineales" },
  { id: 2, title: "Ecuaciones Cuadráticas", description: "Resolución de ecuaciones de segundo grado" },
  { id: 3, title: "Funciones", description: "Definición, dominio, rango y gráficas" },
  { id: 4, title: "Trigonometría", description: "Razones trigonométricas y funciones" },
  { id: 5, title: "Geometría Plana", description: "Figuras en el plano y sus propiedades" },
  { id: 6, title: "Geometría Analítica", description: "Coordenadas cartesianas y ecuaciones" },
  { id: 7, title: "Cálculo Diferencial", description: "Límites y derivadas" },
  { id: 8, title: "Cálculo Integral", description: "Antiderivadas e integrales definidas" },
  { id: 9, title: "Probabilidad", description: "Eventos, espacios muestrales y distribuciones" },
  { id: 10, title: "Estadística", description: "Análisis de datos y medidas estadísticas" },
  { id: 11, title: "Números Complejos", description: "Operaciones y aplicaciones" },
  { id: 12, title: "Matrices y Determinantes", description: "Operaciones matriciales y sistemas de ecuaciones" },
  { id: 13, title: "Sucesiones y Series", description: "Patrones numéricos y convergencia" },
]

// Define the progress for each chapter (mock data)
const chapterProgress = {
  1: 100, // Completed
  2: 85,
  3: 70,
  4: 60,
  5: 45,
  6: 30,
  7: 20,
  8: 10,
  9: 5,
  10: 0, // Not started
  11: 0,
  12: 0,
  13: 0,
}

// Define which chapters are locked (mock data)
const lockedChapters = [10, 11, 12, 13]

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeChapter, setActiveChapter] = useState(1)
  const { user } = useUser()

  useEffect(() => {
    const fetchProblems = async () => {
      setIsLoading(true)
      try {
        const data = await problemsAPI.getProblems()
        setProblems(data)
        setFilteredProblems(data)
      } catch (error) {
        console.error("Failed to fetch problems:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProblems()
  }, [])

  useEffect(() => {
    // Filter problems based on search term and active chapter
    let filtered = problems

    if (searchTerm) {
      filtered = filtered.filter(
        (problem) =>
          problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          problem.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // In a real app, you would filter by chapter
    // For now, we'll just use the mock data
    setFilteredProblems(filtered)
  }, [searchTerm, problems, activeChapter])

  const handleChapterChange = (chapterId: number) => {
    setActiveChapter(chapterId)
  }

  const ChapterCard = ({
    chapter,
    isActive,
    isLocked,
    progress,
  }: {
    chapter: (typeof chapters)[0]
    isActive: boolean
    isLocked: boolean
    progress: number
  }) => {
    return (
      <motion.div
        whileHover={!isLocked ? { scale: 1.02 } : {}}
        className={cn(
          "cursor-pointer rounded-lg border p-4 transition-colors",
          isActive
            ? "border-brand-blue bg-blue-50"
            : isLocked
              ? "border-gray-200 bg-gray-50 opacity-70"
              : "border-gray-200 bg-white hover:border-gray-300",
        )}
        onClick={() => !isLocked && handleChapterChange(chapter.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-white",
                isLocked ? "bg-gray-400" : progress === 100 ? "bg-green-500" : "bg-brand-blue",
              )}
            >
              {isLocked ? (
                <Lock className="h-4 w-4" />
              ) : progress === 100 ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span>{chapter.id}</span>
              )}
            </div>
            <div>
              <h3 className="font-medium">{chapter.title}</h3>
              <p className="text-xs text-gray-500">{chapter.description}</p>
            </div>
          </div>
          {!isLocked && (
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{progress}%</div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Problemas</h1>
        {user.role === "teacher" && (
          <Link href="/problems/create">
            <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Crear Problema
            </Button>
          </Link>
        )}
      </div>

      <Card className="border border-white/10 bg-black">
        <CardHeader>
          <CardTitle className="text-white">Capítulos</CardTitle>
          <CardDescription className="text-gray-400">Selecciona un capítulo para ver sus problemas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="search" className="text-white">
              Buscar
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Buscar problemas por título o descripción"
                className="bg-black border-white/10 pl-8 text-white placeholder:text-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {chapters.map((chapter) => (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                isActive={activeChapter === chapter.id}
                isLocked={lockedChapters.includes(chapter.id)}
                progress={chapterProgress[chapter.id as keyof typeof chapterProgress] || 0}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/10 bg-black">
        <CardHeader>
          <CardTitle className="text-white">
            {chapters.find((c) => c.id === activeChapter)?.title || "Problemas"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {chapters.find((c) => c.id === activeChapter)?.description || "Lista de problemas disponibles"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-md bg-white/10"></div>
              ))}
            </div>
          ) : filteredProblems.length > 0 ? (
            <div className="space-y-3">
              {filteredProblems.map((problem) => (
                <Link key={problem.id} href={`/problems/${problem.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                  >
                    <div>
                      <h3 className="font-medium text-white">{problem.title}</h3>
                      <p className="text-sm text-gray-400">{problem.topic}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          "capitalize",
                          problem.difficulty === "easy"
                            ? "bg-green-900/30 text-green-400"
                            : problem.difficulty === "medium"
                              ? "bg-yellow-900/30 text-yellow-400"
                              : "bg-red-900/30 text-red-400",
                        )}
                      >
                        {problem.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-xs text-white">
                        <BookOpen className="h-3 w-3" />
                        <span>{problem.pointValue} pts</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-4 text-lg font-medium text-white">No se encontraron problemas</h3>
              <p className="text-gray-400">
                {searchTerm
                  ? "No hay problemas que coincidan con tu búsqueda. Intenta con otros términos."
                  : "No hay problemas disponibles para este capítulo en este momento."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
