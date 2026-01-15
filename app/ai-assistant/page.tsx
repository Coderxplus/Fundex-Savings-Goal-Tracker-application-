import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { AIAssistantContent } from "@/components/ai-assistant-content"

export default function AIAssistantPage() {
  return (
    <div className="flex h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <AIAssistantContent />
      </div>
    </div>
  )
}
