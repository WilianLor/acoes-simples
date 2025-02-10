"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const transactions = [
  { quantity: 4, price: 10.00, total: 40.00, type: "V" },
  { quantity: 4, price: 10.00, total: 40.00, type: "C" },
  { quantity: 4, price: 10.00, total: 40.00, type: "V" },
  { quantity: 4, price: 10.00, total: 40.00, type: "C" },
  { quantity: 4, price: 10.00, total: 40.00, type: "V" },
  { quantity: 4, price: 10.00, total: 40.00, type: "C" },
  { quantity: 4, price: 10.00, total: 40.00, type: "V" },
  { quantity: 4, price: 10.00, total: 40.00, type: "C" },
  { quantity: 4, price: 10.00, total: 40.00, type: "V" },
];

export function TransactionsTable() {
  return (
    <div>
      <h2 className="text-xl text-yellow-500 mb-4">Movimentações</h2>
      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800">
              <TableHead className="text-yellow-500">Qtd</TableHead>
              <TableHead className="text-yellow-500">Preço pro Cota</TableHead>
              <TableHead className="text-yellow-500">Preço</TableHead>
              <TableHead className="text-yellow-500">Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={index}
                className={`border-zinc-800 ${transaction.type === "C"
                  ? "bg-green-950/20"
                  : "bg-red-950/20"
                  }`}
              >
                <TableCell className="text-white">{transaction.quantity}</TableCell>
                <TableCell className="text-white">R$ {transaction.price.toFixed(2)}</TableCell>
                <TableCell className="text-white">R$ {transaction.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`${transaction.type === "C" ? "text-green-500" : "text-red-500"
                    }`}>
                    {transaction.type}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Button
          variant="link"
          className="text-yellow-500 hover:text-yellow-600"
          asChild
        >
          <Link href="/log" className="flex items-center gap-2">
            Ver Detalhado
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}