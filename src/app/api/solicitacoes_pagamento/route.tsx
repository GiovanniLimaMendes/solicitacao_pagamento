import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/database/db";
import { cookies } from "next/headers";
import { RowDataPacket } from "mysql2";

interface SolicitacaoPagamento extends RowDataPacket {
  id: number;
  valor: number;
  vencimento: string;
  forma_pagamento: "boleto" | "pix" | "ted";
  descricao: string | null;
  fornecedor_nome: string;
  fornecedor_pix: string | null;
  fornecedor_banco: string | null;
  fornecedor_agencia: string | null;
  fornecedor_conta: string | null;
  status: "pendente" | "aprovado" | "pago";
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const usuario_id = cookieStore.get("usuario_id")?.value;

    if (!usuario_id) {
      return NextResponse.json({ erro: "Usuário não autenticado" }, { status: 401 });
    }

    // Busca as solicitações do usuário logado
    const [solicitacoes] = await db.query<SolicitacaoPagamento[]>(
      `
      SELECT 
        sp.id,
        sp.valor,
        sp.vencimento,
        sp.forma_pagamento,
        sp.descricao,
        sp.status,
        f.nome AS fornecedor_nome,
        f.pix AS fornecedor_pix,
        f.banco AS fornecedor_banco,
        f.agencia AS fornecedor_agencia,
        f.conta AS fornecedor_conta
      FROM solicitacoes_pagamento sp
      JOIN fornecedores f ON sp.fornecedor_id = f.id
      WHERE sp.usuario_id = ?
      ORDER BY sp.vencimento DESC
      `,
      [usuario_id]
    );

    return NextResponse.json({ solicitacoes }, { status: 200 });

  } catch (erro) {
    console.error("Erro ao buscar extrato:", erro);
    return NextResponse.json({ erro: "Erro interno" }, { status: 500 });
  }
}
