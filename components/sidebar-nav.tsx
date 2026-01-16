"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Target, CreditCard, Zap, Plus } from "lucide-react"

export function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/goals", label: "Goals", icon: Target },
    { href: "/transactions", label: "Transactions", icon: CreditCard },
    { href: "/ai-assistant", label: "Fundex AI Assistant", icon: Zap },
  ]

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-blue-600">Fundex</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive ? "bg-blue-100 text-blue-700" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Create Goal Button */}
      <div className="p-4 border-t border-slate-200">
        <Link
          href="/create-goal"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
        >
          <Plus className="w-5 h-5" />
          Create New Goal
        </Link>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 text-xs text-slate-500 text-center">
        © 2026 Fundex. All rights reserved.
      </div>
    </aside>
  )
}
