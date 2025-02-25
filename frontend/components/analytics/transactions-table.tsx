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
import {
  ITransaction,
  TransactionTypeEnum,
} from "@/types/list-transaction.interface";

const TransactionsTable = ({ data }: { data: ITransaction[] }) => {
  return (
    <div>
      <h2 className="text-xl text-yellow-500 mb-4">Movimentações</h2>
      <div className="rounded-md border border-zinc-800">
        <Table>
          <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800">
              <TableHead className="text-yellow-500">Qtd</TableHead>
              <TableHead className="text-yellow-500">Preço pro Cota</TableHead>
              <TableHead className="text-yellow-500">Preço Total</TableHead>
              <TableHead className="text-yellow-500">Tipo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction, index) => (
              <TableRow
                key={index}
                className={`border-zinc-800 ${
                  transaction.type === TransactionTypeEnum.buy
                    ? "bg-green-950/20"
                    : "bg-red-950/20"
                }`}
              >
                <TableCell className="text-white">
                  {transaction.quantity}
                </TableCell>
                <TableCell className="text-white">
                  R$ {transaction.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-white">
                  R$ {(transaction.quantity * transaction.price).toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`${
                      transaction.type === TransactionTypeEnum.buy
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === TransactionTypeEnum.buy ? "C" : "V"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionsTable;
