import { Separator } from "@/components/ui/separator";
import { UltimosPedidos } from "@/components/ultimos-pedidos";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SolicitacoesPagamento() {
  const cookieStore = await cookies();
  const usuario_nome = cookieStore.get("usuario_nome")?.value;

  if (!usuario_nome) {
    redirect("/login");
  }
  
  return (
    <div className="w-full p-3">
      <h1 className="text-xl text-primary">Solicitações de Pagamento</h1>
      <Separator className="mt-5 mb-5 bg-primary" />
      <UltimosPedidos />
    </div>
  );
}
