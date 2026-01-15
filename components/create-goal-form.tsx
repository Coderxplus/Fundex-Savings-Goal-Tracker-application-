"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateGoalForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    goalName: "",
    goalDescription: "",
    goalTag: "",
    targetAmount: "",
    initialDeposit: "",
    targetDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push("/goals")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create New Financial Goal</h2>
      </div>

      <Card className="p-8 bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Goal Details Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Goal Details</h3>
              <p className="text-sm text-slate-600 mb-4">Provide information about your financial aspirations.</p>
            </div>

            <div>
              <label htmlFor="goalName" className="block text-sm font-medium text-slate-700 mb-1">
                Goal Name
              </label>
              <Input
                id="goalName"
                name="goalName"
                value={formData.goalName}
                onChange={handleChange}
                placeholder="Dream Home Down Payment"
                className="w-full bg-white"
              />
            </div>

            <div>
              <label htmlFor="goalDescription" className="block text-sm font-medium text-slate-700 mb-1">
                Goal Description
              </label>
              <textarea
                id="goalDescription"
                name="goalDescription"
                value={formData.goalDescription}
                onChange={handleChange}
                placeholder="Saving up for the initial down payment on a new house."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
                rows={3}
              />
            </div>

            <div>
              <label htmlFor="goalTag" className="block text-sm font-medium text-slate-700 mb-1">
                Goal Tag
              </label>
              <select
                id="goalTag"
                name="goalTag"
                value={formData.goalTag}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
              >
                <option value="">Select a category</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Retirement">Retirement</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Financial Details Section */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Financial Details</h3>
            </div>

            <div>
              <label htmlFor="targetAmount" className="block text-sm font-medium text-slate-700 mb-1">
                Target Amount
              </label>
              <Input
                id="targetAmount"
                name="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={handleChange}
                placeholder="30000.00"
                className="w-full bg-white"
              />
            </div>

            <div>
              <label htmlFor="initialDeposit" className="block text-sm font-medium text-slate-700 mb-1">
                Initial Deposit
              </label>
              <Input
                id="initialDeposit"
                name="initialDeposit"
                type="number"
                value={formData.initialDeposit}
                onChange={handleChange}
                placeholder="5000.00"
                className="w-full bg-white"
              />
            </div>

            <div>
              <label htmlFor="targetDate" className="block text-sm font-medium text-slate-700 mb-1">
                Target Date
              </label>
              <Input
                id="targetDate"
                name="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={handleChange}
                className="w-full bg-white"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-200">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              Create Goal
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
