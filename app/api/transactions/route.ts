import { getDatabase, initializeDatabase } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    initializeDatabase()
    const db = getDatabase()

    // Hardcoding user_id to 1 (demo user)
    const transactions = db
      .prepare(`
      SELECT id, goal_id, type, amount, description, transaction_date
      FROM transactions
      WHERE user_id = 1
      ORDER BY transaction_date DESC
    `)
      .all()

    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const db = getDatabase()

    const result = db
      .prepare(`
      INSERT INTO transactions (user_id, goal_id, type, amount, description, transaction_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      .run(1, body.goal_id || null, body.type, body.amount, body.description, body.transaction_date)

    return NextResponse.json({ id: result.lastInsertRowid, ...body }, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
