"use client";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TableHeaderComponent() {
  return (
    <TableHeader className="bg-zinc-900">
      <TableRow className="border-zinc-800 hover:bg-zinc-900">
        <TableHead className="text-yellow-500">Nome</TableHead>
        <TableHead className="text-yellow-500">Data</TableHead>
        <TableHead className="text-yellow-500">Qtd</TableHead>
        <TableHead className="text-yellow-500">Valor por cota</TableHead>
        <TableHead className="text-yellow-500">Valor Total</TableHead>
        <TableHead className="text-yellow-500">Ação</TableHead>
      </TableRow>
    </TableHeader>
  );
}
