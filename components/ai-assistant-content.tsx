"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const API_URL = "http://localhost:8000/chat" // change in prod

export function AIAssistantContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Funex AI. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendToAI = async (question: string): Promise<string> => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || "AI service failed")
    }

    const data = await res.json()
    return data.answer ?? "No response from AI."
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const aiText = await sendToAI(userMessage.text)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "AI service unavailable. Try again.",
          sender: "ai",
          timestamp: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    "How do i create a new goal?",
    "Where can i go and view my transactions"

  ]

  return (
    <main className="flex-1 flex flex-col overflow-hidden p-6">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Funex AI Assistant</h2>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto mb-4 space-y-4 bg-white rounded-lg p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <p className="text-xs text-slate-400">AI is thinking…</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-4 flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button
              key={action}
              variant="outline"
              className="text-xs"
              onClick={() => setInput(action)}
            >
              {action}
            </Button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </main>
  )
}
