import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MdLibraryAddCheck, MdPayments } from "react-icons/md";
import "./globals.css";
import { UltimosPedidos } from "@/components/ultimos-pedidos";
import NovaSolicitacao from "@/components/nova_solicitacao";
import CadastroFornecedor from "@/components/cadastro_fornecedor";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const usuario_nome = cookieStore.get("usuario_nome")?.value;

  if(!usuario_nome){
    redirect("/login");
  }

  return (
    <div>
      <div className="w-full p-3">
        <h1 className="text-xl text-primary">Menu principal</h1>
        <Separator className="mt-5 mb-5 bg-primary" />
        <nav className="flex gap-5">
          <a
            href="/solicitacoes_pagamento"
            className="flex p-3 border-1 rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white"
          >
            <MdPayments className="text-2xl" />
            <h1>Solicitações de Pagamento</h1>
          </a>
          <NovaSolicitacao buttonClass="flex p-3 border rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white transition-colors" />
          <div className="flex p-3 border-1 rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white">
            <MdLibraryAddCheck className="text-2xl" />
            <h1>Painel de Aprovação</h1>
          </div>
          <CadastroFornecedor buttonClass="flex p-3 border rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white transition-colors" />
        </nav>
        <div className="flex mt-5">
          <h1 className="w-[50%]">Últimos pedidos</h1>
        </div>
        <Separator className="mt-5 mb-5 bg-primary" />
        <div>
          <UltimosPedidos limit={10} />
        </div>
      </div>
    </div>
  );
}
