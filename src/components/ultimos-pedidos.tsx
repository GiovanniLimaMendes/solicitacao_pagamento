import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export function UltimosPedidos() {
  return (
    <Table>
      <TableCaption>Lista de pedidos de compras recentes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>N.º Pedido de Compra</TableHead>
          <TableHead>Solicitante</TableHead>
          <TableHead>Forma de pagamento</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Vencimento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">49505</TableCell>
          <TableCell>Giovanni Mendes</TableCell>
          <TableCell>Boleto</TableCell>
          <TableCell>R$699,00</TableCell>
          <TableCell>16/08/2025</TableCell>
          <TableCell><Badge variant="default">Pago</Badge></TableCell>
          <TableCell className="text-right"><Button className="p-2">Editar</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
