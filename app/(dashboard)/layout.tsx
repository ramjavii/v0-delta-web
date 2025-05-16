import type React from "react"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ApiStatusBanner } from "@/components/api-status-banner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="hidden md:block">
            <MainNav />
          </div>
          <div className="block md:hidden">
            <MobileNav />
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <ApiStatusBanner />
        {children}
      </main>
    </div>
  )
}
