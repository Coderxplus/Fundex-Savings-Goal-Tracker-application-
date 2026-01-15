import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { NotificationsContent } from "@/components/notifications-content"

export default function NotificationsPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <NotificationsContent />
          </div>
        </main>
      </div>
    </div>
  )
}
