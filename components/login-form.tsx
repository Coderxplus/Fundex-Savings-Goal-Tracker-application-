"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { apiService } from "@/lib/api-service"

export function LoginForm() {
  const router = useRouter()
  const [username, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await apiService.login(username, password)

      if (response.success || response.token) {
        // Store token if provided
        if (response.token) {
          localStorage.setItem("authToken", response.token)
        }
        router.push("/dashboard")
      } else {
        setError(response.message || "Login failed")
      }
    } catch (err) {
      setError("Failed to connect to server. Make sure backend is running")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Funex</h1>
        <h2 className="text-xl font-semibold text-slate-700">Login to Funex</h2>
        <p className="text-sm text-slate-600">Enter your credentials to access your financial dashboard.</p>
      </div>

      {/* Error Message */}
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <Input
            id="username"
            type="username"
            placeholder="name@example.com"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer">
              Remember me
            </label>
          </div>
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* Sign up link */}
      <p className="text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
