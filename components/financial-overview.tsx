"use client"

import { Card } from "@/components/ui/card"
import { DollarSign, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { apiService } from "@/lib/api-service"

interface DashboardData {
  active_goals?: number
}

export function FinancialOverview() {
  const [data, setData] = useState<DashboardData>({
    active_goals: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await apiService.getDashboard()
        setData(response)
      } catch (error) {
        console.error("Failed to fetch dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading financial overview...</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Financial Overview</h3>
        <p className="text-slate-600 text-sm">Your Progress Summary</p>
        <p className="text-slate-600 text-sm mt-1"></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        

        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Active Goals</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{data.active_goals || 0}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">{data.active_goals || 0}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
