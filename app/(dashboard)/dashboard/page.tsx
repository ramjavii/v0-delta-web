"use client"

import { useState, useEffect } from "react"
import { useUser } from "@/contexts/user-context"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { calendarAPI, problemsAPI, leaderboardAPI } from "@/lib/api"
import type { CalendarEvent, Problem, LeaderboardEntry } from "@/lib/types"
import { Calendar, BookOpen, Trophy, Clock, CheckCircle, ArrowRight, Star, Zap, Award } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Custom components for the dashboard
const WelcomeCard = ({
  username,
  coinBalance,
  progress,
}: { username: string; coinBalance: number; progress: number }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-brand-blue to-blue-700 text-white">
        <CardContent className="p-0">
          <div className="relative p-6">
            <div className="absolute right-0 top-0 h-32 w-32 opacity-20">
              <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                <path
                  d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">¡Bienvenido, {username}!</h2>
              <p className="text-blue-100">Continúa tu preparación con DELTA. Estás avanzando muy bien.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1">
                  <p className="mb-1 text-sm text-blue-100">Progreso general</p>
                  <Progress value={progress} className="h-2 bg-blue-200/30" indicatorClassName="bg-white" />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1">
                  <Trophy className="h-4 w-4 text-yellow-300" />
                  <span className="font-medium">{coinBalance}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-blue-600 bg-blue-800/30">
            <Link href="/problems" className="flex flex-col items-center p-3 text-center hover:bg-blue-700/30">
              <BookOpen className="mb-1 h-5 w-5" />
              <span className="text-xs">Problemas</span>
            </Link>
            <Link href="/calendar" className="flex flex-col items-center p-3 text-center hover:bg-blue-700/30">
              <Calendar className="mb-1 h-5 w-5" />
              <span className="text-xs">Calendario</span>
            </Link>
            <Link href="/leaderboard" className="flex flex-col items-center p-3 text-center hover:bg-blue-700/30">
              <Trophy className="mb-1 h-5 w-5" />
              <span className="text-xs">Ranking</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const LeaderboardPreview = ({ entries }: { entries: LeaderboardEntry[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Top Estudiantes</CardTitle>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            {entries.slice(0, 5).map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-white",
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                          ? "bg-gray-400"
                          : index === 2
                            ? "bg-amber-700"
                            : "bg-brand-blue",
                    )}
                  >
                    {index + 1}
                  </div>
                  <span className="font-medium">{entry.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{entry.coins}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Link
            href="/leaderboard"
            className="flex w-full items-center justify-center gap-1 text-sm text-brand-blue hover:underline"
          >
            <span>Ver ranking completo</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const UpcomingEvents = ({ events }: { events: CalendarEvent[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Próximos Eventos</CardTitle>
            <Clock className="h-5 w-5 text-brand-blue" />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            {events.length > 0 ? (
              events.slice(0, 3).map((event) => (
                <div key={event.id} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-xs text-gray-500">
                        {format(new Date(event.startTime), "EEEE, d 'de' MMMM, h:mm a")}
                      </p>
                    </div>
                    <Badge
                      className={cn(
                        "capitalize",
                        event.eventType === "lecture"
                          ? "bg-blue-100 text-blue-800"
                          : event.eventType === "exam"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800",
                      )}
                    >
                      {event.eventType}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">No hay eventos próximos</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Link
            href="/calendar"
            className="flex w-full items-center justify-center gap-1 text-sm text-brand-blue hover:underline"
          >
            <span>Ver todos los eventos</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const RecentProblems = ({ problems }: { problems: Problem[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Problemas Recientes</CardTitle>
            <BookOpen className="h-5 w-5 text-brand-red" />
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            {problems.length > 0 ? (
              problems.slice(0, 3).map((problem) => (
                <Link key={problem.id} href={`/problems/${problem.id}`}>
                  <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{problem.title}</h4>
                        <p className="text-xs text-gray-500">{problem.topic}</p>
                      </div>
                      <Badge
                        className={cn(
                          "capitalize",
                          problem.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : problem.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800",
                        )}
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-500">No hay problemas disponibles</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Link
            href="/problems"
            className="flex w-full items-center justify-center gap-1 text-sm text-brand-blue hover:underline"
          >
            <span>Ver todos los problemas</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

const AchievementCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Tus Logros</CardTitle>
            <Award className="h-5 w-5 text-purple-500" />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent">
            <TabsList className="mb-4 grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recientes</TabsTrigger>
              <TabsTrigger value="progress">En Progreso</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Racha de 3 días</h4>
                  <p className="text-xs text-gray-500">Continúa resolviendo problemas diariamente</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">Primer lugar en Álgebra</h4>
                  <p className="text-xs text-gray-500">Obtuviste la puntuación más alta</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="progress" className="space-y-3">
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Maestro de Cálculo</span>
                    <span className="text-xs text-gray-500">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Experto en Geometría</span>
                    <span className="text-xs text-gray-500">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Resolvedor Veloz</span>
                    <span className="text-xs text-gray-500">30%</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DashboardPage() {
  const { user } = useUser()
  const [upcomingEvents, setUpcomingEvents] = useState<CalendarEvent[]>([])
  const [recentProblems, setRecentProblems] = useState<Problem[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userProgress, setUserProgress] = useState(65) // Mock progress percentage

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        // Get upcoming events for the next 7 days
        const now = new Date()
        const nextWeek = new Date()
        nextWeek.setDate(now.getDate() + 7)

        const startDate = now.toISOString()
        const endDate = nextWeek.toISOString()

        const [eventsData, problemsData, leaderboardData] = await Promise.all([
          calendarAPI.getEvents(startDate, endDate),
          problemsAPI.getProblems({ limit: 5 }),
          leaderboardAPI.getLeaderboard(10),
        ])

        setUpcomingEvents(eventsData)
        setRecentProblems(problemsData)
        setLeaderboard(leaderboardData.users)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-40 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
          <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <WelcomeCard username={user.username} coinBalance={user.coinBalance} progress={userProgress} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LeaderboardPreview entries={leaderboard} />
        <UpcomingEvents events={upcomingEvents} />
        <RecentProblems problems={recentProblems} />
      </div>

      <AchievementCard />
    </div>
  )
}
