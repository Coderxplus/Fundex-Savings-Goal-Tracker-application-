// lib/api-service.ts

const API_BASE_URL = "https://5nzs5f79-8000.uks1.devtunnels.ms/api"

export const apiService = {
  // -------------------------
  // Auth
  // -------------------------
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }), // backend expects "username"
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("Login failed:", res.status, text)
      throw new Error(text)
    }

    const data = await res.json()
    if (data.access) {
      localStorage.setItem("authToken", data.access) // save JWT
    }

    return data
  },

  register: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("Register failed:", res.status, text)
      throw new Error(text)
    }

    return res.json()
  },

  // -------------------------
  // Dashboard
  // -------------------------
  getDashboard: async () => {
    
    const token = localStorage.getItem("authToken")
    const res = await fetch(`${API_BASE_URL}/me/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  // -------------------------
  // Goals
  // -------------------------
  getGoals: async () => {
    const token = localStorage.getItem("authToken")
    const res = await fetch(`${API_BASE_URL}/goals/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  createGoal: async (goal: {
    goal_title: string
    goal_description?: string
    target_amount: number
    target_date?: string
    category_id?: number
    status?: string
  }) => {
    const token = localStorage.getItem("authToken")
    const res = await fetch(`${API_BASE_URL}/goals/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(goal),
    })

    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  // -------------------------
  // Transactions
  // -------------------------
  createTransaction: async (transaction: {
    amount: number
    type: "deposit" | "withdrawal"
    short_note: string
    goal_id?: string
    user_id?: string
  }) => {
    const token = localStorage.getItem("authToken")
    const res = await fetch(`${API_BASE_URL}/transactions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transaction),
    })

    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },

  getTransactions: async () => {
    const token = localStorage.getItem("authToken")
    const res = await fetch(`${API_BASE_URL}/transactions/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
}
