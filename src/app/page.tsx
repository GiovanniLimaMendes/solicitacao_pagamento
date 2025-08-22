import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MdLibraryAdd, MdLibraryAddCheck, MdOutlinePayments, MdPayments } from "react-icons/md";
import "./globals.css";

export default function Home() {
  return (
    <div>
      <div className="w-full p-3">
        <h1 className="text-xl text-primary">Menu principal</h1>
        <Separator className="mt-5 mb-5 bg-primary" />
        <nav className="flex gap-5">
          <div className="flex p-3 border-1 rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white">
            <MdPayments className="text-2xl" />
            <h1>Solicitações de Pagamento</h1>
          </div>
          <div className="flex p-3 border-1 rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white">
            <MdLibraryAdd className="text-2xl" />
            <h1>Fazer nova Solicitação</h1>
          </div>
          <div className="flex p-3 border-1 rounded-2xl items-center gap-3 cursor-pointer hover:bg-primary hover:text-white">
            <MdLibraryAddCheck className="text-2xl" />
            <h1>Painel de Aprovação</h1>
          </div>
        </nav>
        <Separator className="mt-5 mb-5 bg-primary" />
        
      </div>
    </div>
  );
}
