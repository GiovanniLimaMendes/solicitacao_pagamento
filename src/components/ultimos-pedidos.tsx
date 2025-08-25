"use client";

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Solicitacao {
  id: number;
  valor: number;
  vencimento: string;
  forma_pagamento: "boleto" | "pix" | "ted";
  descricao: string;
  fornecedor_nome: string;
  status: "pendente" | "aprovado" | "pago";
}

export function UltimosPedidos() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSolicitacoes() {
      try {
        const res = await fetch("/api/solicitacoes_pagamento", {
          cache: "no-store",
        });
        const data = await res.json();
        setSolicitacoes(data.solicitacoes || []);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSolicitacoes();
  }, []);

  if (loading) return <p>Carregando pedidos...</p>;

  return (
    <Table>
      <TableCaption>Lista de pedidos de compras recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>N.º Pedido de Compra</TableHead>
          <TableHead>Fornecedor</TableHead>
          <TableHead>Forma de pagamento</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {solicitacoes.map((s) => (
          <TableRow key={s.id}>
            <TableCell className="font-medium">{s.id}</TableCell>
            <TableCell>{s.fornecedor_nome}</TableCell>
            <TableCell>{s.forma_pagamento}</TableCell>
            <TableCell>
              {Number(s.valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
            <TableCell>
              {new Date(s.vencimento).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              <Badge
                className="min-w-[100%]"
                variant={
                  s.status === "pago"
                    ? "default"
                    : s.status === "aprovado"
                    ? "default"
                    : s.status === "pendente"
                    ? "destructive"
                    : "outline"
                }
              >
                {s.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button className="p-2">Visualizar</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
