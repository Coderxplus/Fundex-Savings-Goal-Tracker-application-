"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { apiService } from "@/lib/api-service"

interface Transaction {
  id: number
  short_note: string
  type: "deposit" | "withdrawal"
  goal_id?: number | null
  amount: number
  created_at?: string
  transaction_date?: string
}

export function TransactionsContent() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiService.getTransactions()
        const txnData = Array.isArray(response) ? response : response.transactions || []
        setTransactions(txnData)
      } catch (error) {
        console.error("Failed to fetch transactions:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const stats = {
    deposits: transactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0),
    withdrawals: Math.abs(transactions.filter((t) => t.type === "withdrawal").reduce((sum, t) => sum + t.amount, 0)),
    netBalance: transactions.reduce((sum, t) => sum + (t.type === "deposit" ? t.amount : -t.amount), 0),
  }

  if (loading) {
    return <div className="text-center py-8">Loading transactions...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Transactions</h2>
        <p className="text-slate-600 text-sm mt-1">Manage and review all your financial transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white">
          <p className="text-slate-600 text-sm">Total Deposits</p>
          <p className="text-2xl font-bold text-green-600 mt-1">${stats.deposits.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-1">↑ Incoming</p>
        </Card>
        <Card className="p-4 bg-white">
          <p className="text-slate-600 text-sm">Total Withdrawals</p>
          <p className="text-2xl font-bold text-red-600 mt-1">${stats.withdrawals.toLocaleString()}</p>
          <p className="text-xs text-red-600 mt-1">↓ Outgoing</p>
        </Card>
        <Card className="p-4 bg-white">
          <p className="text-slate-600 text-sm">Net Balance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">${stats.netBalance.toLocaleString()}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label className="text-sm font-medium text-slate-700 block mb-1">Date Range</label>
          <Input placeholder="Nov 01, 2025 - Nov 30, 2025" className="bg-white" />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-slate-700 block mb-1">Type</label>
          <Button variant="outline" className="w-full justify-between bg-transparent">
            All Types <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-slate-700 block mb-1">Goal</label>
          <Button variant="outline" className="w-full justify-between bg-transparent">
            All Goals <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-end">
          <Button variant="outline">Export</Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Card className="bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Description</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">Type</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-900">{txn.created_at || txn.transaction_date}</td>
                  <td className="px-4 py-3 text-slate-900">{txn.short_note}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        txn.type === "deposit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {txn.type === "deposit" ? "Deposit" : "Withdrawal"}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      txn.type === "deposit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {txn.type === "deposit" ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
