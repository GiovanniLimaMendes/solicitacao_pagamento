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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

interface Solicitacao {
  id: number;
  valor: number;
  vencimento: string;
  forma_pagamento: "boleto" | "pix" | "ted";
  descricao: string;
  fornecedor_nome: string;
  status: "pendente" | "aprovado" | "pago";
}

interface UltimosPedidosProps {
  limit?: number; // opcional
}

export function UltimosPedidos({ limit }: UltimosPedidosProps) {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(true);

  // estados do modal
  const [selectedSolicitacao, setSelectedSolicitacao] =
    useState<Solicitacao | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchSolicitacoes() {
      try {
        const res = await fetch("/api/solicitacoes_pagamento", {
          cache: "no-store",
        });
        const data = await res.json();
        let lista: Solicitacao[] = data.solicitacoes || [];

        if (limit) {
          lista = lista.slice(0, limit);
        }

        setSolicitacoes(lista);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSolicitacoes();
  }, [limit]);

  if (loading) return <p>Carregando pedidos...</p>;

  return (
    <>
      <Table>
        <TableCaption>Lista de pedidos de compras recentes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>N.º Pedido de Compra</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Forma de pagamento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead className="text-center">Status</TableHead>
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
                <Button
                  className="p-2"
                  onClick={() => {
                    setSelectedSolicitacao(s);
                    setOpen(true);
                  }}
                >
                  Visualizar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Solicitação #{selectedSolicitacao?.id}</DialogTitle>
            <DialogDescription>
              Detalhes da solicitação de pagamento.
            </DialogDescription>
          </DialogHeader>

          {selectedSolicitacao && (
            <div className="space-y-2">
              <p>
                <strong>Fornecedor:</strong>{" "}
                {selectedSolicitacao.fornecedor_nome}
              </p>
              <p>
                <strong>Forma de Pagamento:</strong>{" "}
                {selectedSolicitacao.forma_pagamento}
              </p>
              <p>
                <strong>Valor:</strong>{" "}
                {Number(selectedSolicitacao.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p>
                <strong>Vencimento:</strong>{" "}
                {new Date(selectedSolicitacao.vencimento).toLocaleDateString(
                  "pt-BR"
                )}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <Badge
                  variant={
                    selectedSolicitacao.status === "pago"
                      ? "default"
                      : selectedSolicitacao.status === "aprovado"
                      ? "default"
                      : selectedSolicitacao.status === "pendente"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {selectedSolicitacao.status}
                </Badge>
              </p>
              <p>
                <strong>Descrição:</strong> {selectedSolicitacao.descricao}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
