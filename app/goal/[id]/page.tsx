import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { GoalDetailsContent } from "@/components/goal-details-content"

export default function GoalDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <GoalDetailsContent goalId={params.id} />
          </div>
        </main>
      </div>
    </div>
  )
}
