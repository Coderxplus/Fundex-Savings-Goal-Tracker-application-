import { getDatabase, initializeDatabase } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    initializeDatabase()
    const db = getDatabase()

    // Hardcoding user_id to 1 (demo user)
    const goals = db
      .prepare(`
      SELECT id, name, description, target_amount, current_amount, target_date, category, icon, status
      FROM goals
      WHERE user_id = 1
      ORDER BY created_at DESC
    `)
      .all()

    return NextResponse.json(goals)
  } catch (error) {
    console.error("Error fetching goals:", error)
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = getDatabase()

    const result = db
      .prepare(`
      INSERT INTO goals (user_id, name, description, target_amount, current_amount, target_date, category, icon, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .run(
        1,
        body.name,
        body.description || "",
        body.target_amount,
        body.current_amount || 0,
        body.target_date,
        body.category || "other",
        body.icon || "🎯",
        "active",
      )

    return NextResponse.json({ id: result.lastInsertRowid, ...body }, { status: 201 })
  } catch (error) {
    console.error("Error creating goal:", error)
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 })
  }
}
