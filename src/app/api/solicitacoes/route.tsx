// app/api/solicitacoes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database/db";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formaPagamento, valor, vencimento, descricao, fornecedorId } = body;

    const cookieStore = await cookies();
    const usuario_id = cookieStore.get("usuario_id")?.value;

    await db.query(
      `INSERT INTO solicitacoes_pagamento 
      (usuario_id, fornecedor_id, forma_pagamento, valor, vencimento, descricao)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [usuario_id, fornecedorId, formaPagamento, valor, vencimento, descricao]
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao salvar solicitação" }, { status: 500 });
  }
}
