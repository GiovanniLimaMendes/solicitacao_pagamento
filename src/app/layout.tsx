import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { SidebarWrapper } from "@/components/sidewrapper";

export const metadata = {
  title: "Solicitação de Pagamento",
  description: "Solicitação de Pagamento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SidebarProvider>
            <SidebarWrapper />
            <main className="0 w-full h-[100vh]">
              <SidebarTrigger />
              {children}
            </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
