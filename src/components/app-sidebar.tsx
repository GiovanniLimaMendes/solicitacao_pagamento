import { ChevronUp, Home, User2 } from "lucide-react";

import { FaUserPlus } from "react-icons/fa";

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
import {
  MdHome,
  MdLibraryAdd,
  MdLibraryAddCheck,
  MdPayments,
} from "react-icons/md";
import { cookies } from "next/headers";
import NovaSolicitacao from "./nova_solicitacao";
import CadastroFornecedor from "./cadastro_fornecedor";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: MdHome,
  },
  {
    title: "Solicitações de Pagamento",
    url: "solicitacoes_pagamento",
    icon: MdPayments,
  },
  {
    title: "Painel de Aprovação",
    url: "#",
    icon: MdLibraryAddCheck,
  },
];

type AppSidebarProps = {
  userName: string;
};

export function AppSidebar({ userName }: AppSidebarProps) {
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
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-primary hover:text-white"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-primary hover:text-white"
                >
                  <a className="cursor-pointer"><NovaSolicitacao width="w-[500px]" buttonClass="flex items-center gap-2 cursor-pointer " icon="text-lg"/></a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="hover:bg-primary hover:text-white"
                >
                  <a className="cursor-pointer"><CadastroFornecedor width="w-[500px]" buttonClass="flex items-center gap-2 cursor-pointer " icon="text-lg"/></a>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
                  <User2 /> {userName}
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
