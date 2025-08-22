"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"

export function SidebarWrapper() {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/login")

  if (isAuthPage) return null
  return <AppSidebar />
}
