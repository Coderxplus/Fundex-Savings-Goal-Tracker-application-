"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { apiService } from "@/lib/api-service"

interface Goal {
  id: number
  goal_title: string
  current_amount: number
  target_amount: number
  icon?: string
}

export function GoalsContent() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await apiService.getGoals()
        const goalsData = Array.isArray(response) ? response : response.goals || []
        setGoals(goalsData)
      } catch (error) {
        console.error("Failed to fetch goals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGoals()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading goals...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Savings Goals</h2>
          <p className="text-slate-600 text-sm mt-1">Manage and track all your financial goals</p>
        </div>
        <Link href="/create-goal">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Create New Goal</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const percentage = Math.round((goal.current_amount / goal.target_amount) * 100)
          return (
            <Card key={goal.id} className="p-6 bg-white hover:shadow-md transition">
              <div className="flex items-start gap-6">
                <div className="text-4xl">{goal.icon || "💰"}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-slate-900">{goal.goal_title}</h4>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">{percentage}%</p>
                      <p className="text-xs text-slate-600 mt-1">Complete</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                  </p>
                  <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/goal/${goal.id}`}>
                      <Button variant="outline" className="text-sm bg-transparent">
                        Details
                      </Button>
                    </Link>
                    <Button variant="outline" className="text-sm bg-transparent">
                      Deposit
                    </Button>
                    <Button variant="outline" className="text-sm bg-transparent">
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
