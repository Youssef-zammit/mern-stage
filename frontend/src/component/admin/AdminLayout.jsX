"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import { AdminSidebar } from "./AdminSidebar"
import { AdminHeader } from "./AdminHeader"
import { Button } from "../ui/button"
import { Sheet, SheetContent } from "../ui/sheet"
import { Menu } from "lucide-react"

export function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:block md:fixed md:inset-y-0 md:z-50 md:w-64">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <AdminHeader>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </AdminHeader>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
