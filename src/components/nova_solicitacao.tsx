"use client";

import { MdLibraryAdd } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { Textarea } from "./ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { cn } from "@/lib/utils";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

// Definição do tipo para o fornecedor para melhor tipagem
interface Fornecedor {
  id: number;
  nome: string;
}

type NovaSolicitacaoProps = {
  width?: string;          // largura do modal
  buttonClass?: string;    // estilo do botão que abre o modal
  icon?: string;
};

// Componente principal
export default function NovaSolicitacao({ width = "w-full", buttonClass = "", icon = "text-2xl" }: NovaSolicitacaoProps) {
  // Estados para os campos do formulário
  const [formaPagamento, setFormaPagamento] = useState("");
  const [valor, setValor] = useState("0,00");
  const [date, setDate] = useState<Date | undefined>();
  const [descricao, setDescricao] = useState("");
  // Estado para a combobox de fornecedores
  const [open, setOpen] = useState(false);
  const [fornecedorId, setFornecedorId] = useState("");
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  // Estado para o alerta de sucesso/erro
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  // Hook para buscar os fornecedores da API uma única vez ao carregar o componente
  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchFornecedores = async () => {
      try {
        const res = await fetch("/api/fornecedores");
        const data = await res.json();
        setFornecedores(data);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
        setAlert({ type: "error", message: "Erro ao carregar fornecedores." });
      }
    };

    fetchFornecedores();
  }, []); // O array vazio garante que o useEffect rode apenas uma vez

  // Função para limpar o formulário, resetando todos os estados
  const resetForm = () => {
    setFormaPagamento("");
    setValor("0,00");
    setDate(undefined);
    setDescricao("");
    setFornecedorId("");
  };

  // Função para formatar o valor de entrada para o formato monetário (Real)
  const handleChangeValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    // Remove tudo que não for número e limita a 10 dígitos para evitar valores muito longos
    rawValue = rawValue.replace(/\D/g, "").slice(0, 10);

    if (!rawValue) {
      setValor("0,00");
      return;
    }

    // Converte para número em centavos
    const numberValue = parseFloat(rawValue) / 100;

    // Formata para a moeda brasileira
    const formattedValue = numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValor(formattedValue);
  };

  // Função de submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null); // Limpa o alerta anterior

    // Converte o valor formatado "R$ 1.234,56" para o formato de número 1234.56
    const numeroValor = parseFloat(
      valor.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
    );

    // Validações básicas
    if (isNaN(numeroValor) || numeroValor <= 0) {
      setAlert({
        type: "error",
        message: "O valor deve ser um número válido maior que zero.",
      });
      return;
    }
    if (!formaPagamento) {
      setAlert({ type: "error", message: "Selecione uma forma de pagamento." });
      return;
    }
    if (!date) {
      setAlert({ type: "error", message: "Selecione a data de vencimento." });
      return;
    }
    if (!fornecedorId) {
      setAlert({ type: "error", message: "Selecione um fornecedor." });
      return;
    }

    const payload = {
      formaPagamento,
      valor: numeroValor,
      vencimento: date?.toISOString(),
      descricao,
      fornecedorId: parseInt(fornecedorId),
    };

    try {
      const res = await fetch("/api/solicitacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setAlert({
          type: "success",
          message: "Solicitação criada com sucesso!",
        });
        resetForm();
      } else {
        setAlert({
          type: "error",
          message: data.error || "Erro ao salvar a solicitação.",
        });
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setAlert({
        type: "error",
        message: "Erro ao conectar com o servidor. Tente novamente.",
      });
    }
  };

  // Efeito para esconder o alerta automaticamente após 5 segundos
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000); // 5 segundos

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado ou se o alerta mudar
    }
  }, [alert]);

  // Encontra o fornecedor selecionado para exibir no botão
  const selectedFornecedor = fornecedores.find(
    (f) => f.id.toString() === fornecedorId
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className={`${buttonClass}, ${width}`} >
            <MdLibraryAdd className={`${icon}`} />
            Fazer nova Solicitação
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Solicitação de Pagamento</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para criar uma nova Solicitação de
              Pagamento.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fornecedor">Fornecedor/Favorecido</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedFornecedor
                        ? selectedFornecedor.nome
                        : "Selecione o fornecedor"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar fornecedor..." />
                      <CommandEmpty>Nenhum fornecedor encontrado.</CommandEmpty>
                      <CommandGroup>
                        {fornecedores.map((f) => (
                          <CommandItem
                            key={f.id}
                            value={f.nome.toLowerCase()} // Usar o nome em lowercase para a busca
                            onSelect={(currentValue) => {
                              const selected = fornecedores.find(
                                (forn) =>
                                  forn.nome.toLowerCase() === currentValue
                              );
                              setFornecedorId(
                                selected ? selected.id.toString() : ""
                              );
                              setOpen(false);
                            }}
                          >
                            {f.nome}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                fornecedorId === f.id.toString()
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="formaPagamento">Forma de Pagamento</Label>
                <Select
                  onValueChange={(value) => setFormaPagamento(value)}
                  value={formaPagamento}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="boleto">Boleto</SelectItem>
                    <SelectItem value="ted">TED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  name="valor"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={valor}
                  onChange={handleChangeValor}
                  className="w-full"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vencimento">Data Vencimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date
                        ? format(date, "dd/MM/yyyy", { locale: ptBR })
                        : "Selecione a data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva aqui o que está sendo comprado."
                  className="w-full resize-none"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Salvar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* ALERTA DE ERRO OU SUCESSO com temporizador */}
      {alert && (
        <div
          className={`fixed bottom-4 right-4 z-500 w-[300px] bg-white border-l-4 rounded shadow-lg ${
            alert.type === "error" ? "border-red-500" : "border-green-500"
          }`}
        >
          <Alert>
            <AlertTitle>
              {alert.type === "error" ? "Erro" : "Sucesso"}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
