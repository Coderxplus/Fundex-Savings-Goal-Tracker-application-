// API service for communicating with backend at 192.168.1.120:5000
const API_BASE_URL = "http://192.168.1.120:5000"

export const apiService = {
  // Auth endpoints
  async register(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  // Dashboard endpoint
  async getDashboard() {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    return response.json()
  },

  // Goals endpoints
  async getGoals() {
    const response = await fetch(`${API_BASE_URL}/goals`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    return response.json()
  },

  async getGoal(id: string | number) {
    const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    return response.json()
  },

  async createGoal(goal: {
    goal_title: string
    goal_description?: string
    target_amount: number
    target_date?: string
    category_id?: number
    status?: string
  }) {
    const response = await fetch(`${API_BASE_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    })
    return response.json()
  },

  async updateGoal(
    id: string | number,
    goal: {
      goal_title?: string
      goal_description?: string
      target_amount?: number
      current_amount?: number
      status?: string
      target_date?: string
    },
  ) {
    const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    })
    return response.json()
  },

  // Transactions endpoints
  async getTransactions() {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    return response.json()
  },

  async createTransaction(transaction: {
    amount: number
    type: "deposit" | "withdrawal"
    short_note: string
    goal_id?: string
    user_id?: string
  }) {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    })
    return response.json()
  },
}
