import { getDatabase, initializeDatabase } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    initializeDatabase()
    const db = getDatabase()
    const { id } = await params

    const goal = db
      .prepare(`
      SELECT id, name, description, target_amount, current_amount, target_date, category, icon, status
      FROM goals
      WHERE id = ? AND user_id = 1
    `)
      .get(id)

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 })
    }

    return NextResponse.json(goal)
  } catch (error) {
    console.error("Error fetching goal:", error)
    return NextResponse.json({ error: "Failed to fetch goal" }, { status: 500 })
  }
}
