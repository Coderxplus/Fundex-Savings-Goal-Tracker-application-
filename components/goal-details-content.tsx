"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { apiService } from "@/lib/api-service"

interface GoalDetailsContentProps {
  goalId: string
}

interface GoalDetail {
  id: string | number
  goal_title: string
  icon?: string
  goal_description?: string
  current_amount: number
  target_amount: number
  category_id?: number
  status?: string
  target_date?: string
  created_at?: string
  chart_data?: Array<{ month: string; saved: number }>
}

export function GoalDetailsContent({ goalId }: GoalDetailsContentProps) {
  const [goal, setGoal] = useState<GoalDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await apiService.getGoals()
        setGoal(response)
      } catch (error) {
        console.error("Failed to fetch goal details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGoal()
  }, [goalId])

  if (loading) {
    return <div className="text-center py-8">Loading goal details...</div>
  }

  if (!goal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Goal not found</h1>
          <Link href="/goals">
            <Button>Back to Goals</Button>
          </Link>
        </div>
      </div>
    )
  }

  const percentage = Math.round((goal.current_amount / goal.target_amount) * 100)
  const chartData = goal.chart_data || []

  return (
    <div className="space-y-6">
      <Link href="/goals" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
        <ArrowLeft className="w-4 h-4" />
        Back to Goals
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{goal.icon || "💰"}</span>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{goal.goal_title}</h2>
            <p className="text-slate-600 text-sm">{goal.status || "Goal"}</p>
          </div>
        </div>
        <p className="text-slate-600 text-sm mt-2">{goal.goal_description || "Savings goal"}</p>
      </div>

      {/* Goal Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <p className="text-xs text-slate-600 mb-1">Current Saved</p>
          <p className="text-2xl font-bold text-slate-900">${goal.current_amount.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-white">
          <p className="text-xs text-slate-600 mb-1">Target Amount</p>
          <p className="text-2xl font-bold text-slate-900">${goal.target_amount.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-white">
          <p className="text-xs text-slate-600 mb-1">Progress</p>
          <p className="text-2xl font-bold text-blue-600">{percentage}%</p>
        </Card>
        <Card className="p-4 bg-white">
          <p className="text-xs text-slate-600 mb-1">Remaining</p>
          <p className="text-2xl font-bold text-slate-900">
            ${(goal.target_amount - goal.current_amount).toLocaleString()}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        {chartData.length > 0 && (
          <Card className="lg:col-span-2 p-6 bg-white">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Savings Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="saved" stroke="#2563eb" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        )}

        
      </div>

      {/* Goal Description */}
      {goal.goal_description && (
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">About This Goal</h3>
          <p className="text-slate-600 leading-relaxed">{goal.goal_description}</p>
        </Card>
      )}

      {/* Goal Actions */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Goal Actions</h3>
        <p className="text-sm text-slate-600 mb-4">Manage your funds for this goal.</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">Deposit Funds</Button>
          <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">Withdraw Funds</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Edit Goal
          </Button>
        </div>
      </Card>
    </div>
  )
}
