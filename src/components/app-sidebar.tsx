import {
  ChevronUp,
  Home,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MdHome, MdLibraryAdd, MdLibraryAddCheck, MdPayments } from "react-icons/md";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: MdHome,
  },
  {
    title: "Solicitação de Pagamento",
    url: "#",
    icon: MdPayments,
  },
  {
    title: "Fazer Nova Solicitação",
    url: "#",
    icon: MdLibraryAdd,
  },
  {
    title: "Painel de Aprovação",
    url: "#",
    icon: MdLibraryAddCheck,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <Image
        src="/02 - Logo ZCBR Retangular.png"
        alt="Imagem Externa"
        width={200}
        height={0}
        className="mb-3 mt-5 mr-4 self-center"
      />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-primary hover:text-white">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-primary hover:text-white">
                  <User2 /> Usuário
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Conta</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
