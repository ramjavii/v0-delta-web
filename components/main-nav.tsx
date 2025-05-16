"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, Home, MessageSquare, Trophy, LineChart, FileText } from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Problems",
    href: "/problems",
    icon: BookOpen,
  },
  {
    name: "Past Exams",
    href: "/past-exams",
    icon: FileText,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Forum",
    href: "/forum",
    icon: MessageSquare,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
  },
  {
    name: "Visualizations",
    href: "/visualizations",
    icon: LineChart,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <span className="font-bold text-xl text-white">DELTA</span>
      </Link>
      <div className="flex items-center space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-1 text-sm font-medium transition-colors hover:text-white",
              pathname === item.href || pathname.startsWith(`${item.href}/`) ? "text-white" : "text-gray-400",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "after:block after:h-0.5 after:w-full after:bg-brand-red after:mt-0.5"
                : "",
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
