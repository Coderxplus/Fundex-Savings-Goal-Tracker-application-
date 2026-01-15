import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { FinancialOverview } from "@/components/financial-overview"
import { SavingsGoals } from "@/components/savings-goals"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6 space-y-6">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            <FinancialOverview />
            <SavingsGoals />
          </div>
        </main>
      </div>
    </div>
  )
}
