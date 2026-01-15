"use client"

import { Bell, MessageSquare, User } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-600 text-sm">Manage your financial goals and savings</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/notifications" className="relative p-2 hover:bg-slate-100 rounded-lg transition">
            <Bell className="w-6 h-6 text-slate-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          <Link href="/ai-assistant">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition">
              <MessageSquare className="w-6 h-6 text-slate-700" />
            </button>
          </Link>
         
        </div>
      </div>
    </header>
  )
}
