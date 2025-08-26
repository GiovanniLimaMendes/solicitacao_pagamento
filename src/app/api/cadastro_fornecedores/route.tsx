// pages/api/cadastro_fornecedores.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/database/db";
import { NextRequest, NextResponse, connection } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, cpfCnpj, banco, agencia, conta, pix } = body;

    if (!nome || !cpfCnpj) {
      return NextResponse.json(
        { error: "Nome e CPF/CNPJ são obrigatórios." },
        { status: 400 }
      );
    }

    // Verifica se já existe
    const [rows] = await db.execute(
      "SELECT id FROM fornecedores WHERE cpf_cnpj = ?",
      [cpfCnpj]
    );

    if ((rows as any[]).length > 0) {
      return NextResponse.json(
        { error: "Fornecedor já cadastrado." },
        { status: 400 }
      );
    }

    // Insere no banco
    await db.execute(
      `INSERT INTO fornecedores (nome, cpf_cnpj, banco, agencia, conta, pix)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nome, cpfCnpj, banco || null, agencia || null, conta || null, pix || null]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar fornecedor." },
      { status: 500 }
    );
  }
}
