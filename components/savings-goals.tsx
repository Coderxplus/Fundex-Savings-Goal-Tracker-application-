"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { apiService } from "@/lib/api-service"

interface Goal {
  id: string | number
  goal_title: string
  current_amount: number
  target_amount: number
  icon?: string
}

export function SavingsGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await apiService.getGoals()
        // Handle both array and object responses
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">My Savings Goals</h3>
        <Link href="/create-goal">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Create New Goal</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const percentage = Math.round((goal.current_amount / goal.target_amount) * 100)
          return (
            <Card key={goal.id} className="p-4 bg-white hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{goal.icon || "💰"}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-900">{goal.goal_title}</h4>
                    <p className="text-sm font-bold text-slate-700">{percentage}%</p>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    ${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}
                  </p>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/goal/${goal.id}`}>
                      <Button variant="outline" size="sm" className="text-xs bg-transparent">
                        Details
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      Deposit
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
