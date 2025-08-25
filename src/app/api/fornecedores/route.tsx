// app/api/fornecedores/route.ts
import { NextResponse } from "next/server"
import { db } from "@/app/database/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, nome FROM fornecedores ORDER BY nome ASC")
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error)
    return NextResponse.json({ error: "Erro ao buscar fornecedores" }, { status: 500 })
  }
}
