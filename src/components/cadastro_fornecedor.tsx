"use client";

import { FaUserPlus } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CadastroFornecedor() {
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [banco, setBanco] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState("");
  const [pix, setPix] = useState("");
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número

    if (value.length <= 11) {
      // CPF: 000.000.000-00
      value = value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // CNPJ: 00.000.000/0000-00
      value = value
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }

    setCpfCnpj(value);
  };

  const resetForm = () => {
    setNome("");
    setCpfCnpj("");
    setBanco;
    setAgencia("");
    setConta("");
    setPix("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    const cpfCnpjNumeros = cpfCnpj.replace(/\D/g, ""); // remove ., / e -

    // Validações básicas
    if (!nome) {
      setAlert({ type: "error", message: "Insira o nome do Fornecedor." });
      return;
    }
    if (!cpfCnpj) {
      setAlert({ type: "error", message: "Insira o CPF/CNPJ do Fornecedor." });
      return;
    }

    const payload = {
      nome: nome,
      cpfCnpj: cpfCnpj,
      banco: banco,
      agencia: agencia,
      conta: conta,
      pix: pix,
    };

    try {
      const res = await fetch("/api/cadastro_fornecedores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setAlert({
          type: "success",
          message: "Fornecedor cadastrado com sucesso!",
        });
        resetForm();
      } else {
        setAlert({
          type: "error",
          message: data.error || "Erro ao cadastrar fornecedor.",
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

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex p-3 border rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white transition-colors">
            <FaUserPlus className="text-2xl" />
            Cadastrar Fornecedor
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Fornecedor/Favorecido</DialogTitle>
            <DialogDescription>
              Preencha o formulário abaixo para cadastrar um novo
              Fornecedor/Favorecido.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome Fornecedor</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="off"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Razão Social do Fornecedor"
                  className="w-full"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cpf_cnpj">CPF/CNPJ</Label>
                <Input
                  id="cpf_cnpj"
                  name="cpf_cnpj"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={cpfCnpj}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Ex: 12.345.678/0001-90"
                  maxLength={18}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="banco">Banco</Label>
                <Input
                  id="banco"
                  name="banco"
                  type="text"
                  autoComplete="off"
                  value={banco}
                  onChange={(e) => setBanco(e.target.value)}
                  className="w-full"
                  placeholder="Ex: Banco do Brasil"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agencia">Agência</Label>
                <Input
                  id="agencia"
                  name="agencia"
                  type="text"
                  autoComplete="off"
                  value={agencia}
                  onChange={(e) => setAgencia(e.target.value)}
                  className="w-full"
                  placeholder="Ex: 00000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="conta">Conta</Label>
                <Input
                  id="conta"
                  name="conta"
                  type="text"
                  autoComplete="off"
                  value={conta}
                  onChange={(e) => setConta(e.target.value)}
                  className="w-full"
                  placeholder="Ex: 000000000000"
                  maxLength={13}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pix">Pix</Label>
                <Input
                  id="pix"
                  name="pix"
                  type="text"
                  autoComplete="off"
                  value={pix}
                  onChange={(e) => setPix(e.target.value)}
                  className="w-full"
                  placeholder="Cadastre o Pix do Fornecedor/Favorecido"
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
