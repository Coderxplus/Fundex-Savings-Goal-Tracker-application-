import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { GoalsContent } from "@/components/goals-content"

export default function GoalsPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <GoalsContent />
          </div>
        </main>
      </div>
    </div>
  )
}
