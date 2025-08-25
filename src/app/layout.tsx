import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { SidebarWrapper } from "@/components/sidewrapper";
import { cookies } from "next/headers";

export const metadata = {
  title: "Solicitação de Pagamento",
  description: "Solicitação de Pagamento",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const usuario_nome = cookieStore.get("usuario_nome")?.value || "Usuário";
  return (
    <html lang="pt-BR">
      <body>
        <SidebarProvider>
          {<AppSidebar userName={usuario_nome} />}
          <main className="0 w-full h-[100vh]">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
