"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Bell } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "warning" | "info" | "success" | "alert"
  action?: { label: string; href: string }
}

export function NotificationsContent() {
  const notifications: Notification[] = [
    {
      id: "1",
      title: 'Goal "House Downpayment" Off Track',
      message:
        "Your progress towards saving for the house downpayment is 5% behind schedule. Consider increasing your monthly contributions by $150 to meet your target by the deadline.",
      time: "2 hours ago",
      type: "warning",
      action: { label: "View Goal", href: "/goal/1" },
    },
    {
      id: "2",
      title: "Low Balance Detected",
      message:
        "Your linked checking account balance is currently below your defined safety threshold. We recommend reviewing your budget or making a deposit soon.",
      time: "Yesterday",
      type: "alert",
      action: { label: "Manage Goals", href: "/goals" },
    },
    {
      id: "3",
      title: 'Monthly Deposit for "Retirement" Due Tomorrow',
      message:
        "A recurring deposit of $500 for your retirement fund is scheduled for tomorrow. Please ensure sufficient funds are available.",
      time: "1 day ago",
      type: "info",
      action: { label: "Review Dashboard", href: "/dashboard" },
    },
    {
      id: "4",
      title: "New AI Insight Available",
      message:
        'Funex AI has generated a new insight: "Optimizing Your Savings Rate for Better Returns." Tap to learn more.',
      time: "3 days ago",
      type: "info",
      action: { label: "View Insight", href: "/ai-assistant" },
    },
    {
      id: "5",
      title: "Increased Savings Potential",
      message:
        "Based on your recent spending, you have the potential to increase your monthly savings by an additional $100 without significantly impacting your lifestyle. Would you like to adjust your goals?",
      time: "1 week ago",
      type: "success",
      action: { label: "Adjust Goals", href: "/goals" },
    },
    {
      id: "6",
      title: "Review Your Emergency Fund",
      message:
        "Your emergency fund goal is 90% complete! Consider reviewing your target amount or allocating excess savings to another goal.",
      time: "2 weeks ago",
      type: "success",
      action: { label: "Review Fund", href: "/goal/2" },
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return <Bell className="w-5 h-5 text-blue-600" />
    }
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "alert":
        return "bg-red-50 border-red-200"
      case "success":
        return "bg-green-50 border-green-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>
        <p className="text-slate-600 text-sm mt-1">Stay updated on your financial goals and account activity</p>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className={`p-4 border ${getTypeStyles(notification.type)}`}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                    <p className="text-sm text-slate-700 mt-1">{notification.message}</p>
                  </div>
                  <p className="text-xs text-slate-500 whitespace-nowrap ml-4">{notification.time}</p>
                </div>
                {notification.action && (
                  <div className="mt-3">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      {notification.action.label}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
