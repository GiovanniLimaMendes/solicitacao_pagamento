"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"

type SidebarWrapperProps = {
  userName: string;
};

export function SidebarWrapper({ userName }: SidebarWrapperProps) {
  const pathname = usePathname()
  const isAuthPage = pathname.includes("/login")

  if (isAuthPage) return null
  return <AppSidebar  userName={userName}/>
}
