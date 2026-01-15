import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { CreateGoalForm } from "@/components/create-goal-form"

export default function CreateGoalPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <CreateGoalForm />
          </div>
        </main>
      </div>
    </div>
  )
}
