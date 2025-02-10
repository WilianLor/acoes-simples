"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { TableHeaderComponent } from "./table-header";
import { TableRowSkeleton } from "./table-row-skeleton";
import axiosAuth from "@/lib/service/axiosAuth";
import { IListTransaction, TransactionTypeDisplayEnum, TransactionTypeEnum } from "../../types/list-transaction.interface";
import { toast } from "@/hooks/use-toast";
import { dateHourFormater } from "@/lib/service/formaters";
import PaginationComponent from "./pagination";

const QUANTIDADE_PAGINA = 15

export function TransactionsTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IListTransaction>()
  const [page, setPage] = useState(1);
  const [pageQtd, setPageQtd] = useState(1);
  const fetchData = async (pag?: number) => {
    setIsLoading(true);
    try {
      const resp = await axiosAuth.get<IListTransaction>(`/transaction?limit=${QUANTIDADE_PAGINA}${pag ? "&skip=" + (pag * QUANTIDADE_PAGINA) : ""}`)
      setPageQtd(Math.floor(resp.data.count / QUANTIDADE_PAGINA) || 1);
      setData(resp.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Erro - Data",
        description: "Falha ao carregar as informações, Recarregue!",
      });
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="rounded-md border border-zinc-800 flex flex-col gap-6 pb-6 transition-all">
      <Table>
        <TableHeaderComponent />
        <TableBody>
          {data && !isLoading
            ? data.count !== 0 && data.transactions.length > 0 ? (
              data.transactions.map((transaction, index) => (
                <TableRow
                  key={index}
                  className={`border-zinc-800 hover:bg-zinc-900 ${index % 2 === 0 ? 'bg-zinc-900' : 'bg-black'
                    }`}
                >
                  <TableCell className="font-medium text-white">{transaction.stockId}</TableCell>
                  <TableCell className="text-white">{dateHourFormater(`${transaction.date}`)}</TableCell>
                  <TableCell className="text-white">{transaction.quantity}</TableCell>
                  <TableCell className="text-white">R$ {transaction.price.toFixed(2)}</TableCell>
                  <TableCell className="text-white">R$ {(transaction.quantity * transaction.price).toFixed(2)}</TableCell>
                  <TableCell>
                    {transaction.type === TransactionTypeEnum.buy ?
                      <span className={"text-green-500"}>
                        {TransactionTypeDisplayEnum.buy}
                      </span>
                      : <span className={"text-red-500"}>
                        {TransactionTypeDisplayEnum.sale}
                      </span>
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className="mx-auto">VAZIO</div>
            )
            : (
              Array(15).fill(0).map((_, index) => (
                <TableRowSkeleton key={`skeleton-${index}`} />
              ))
            )}
          {!isLoading && data &&
            data.transactions.length < QUANTIDADE_PAGINA &&
            Array(QUANTIDADE_PAGINA - data.transactions.length)
              .fill(0)
              .map((_, index) => (
                <TableRow key={`placeholder-${index}`} className="h-[37px] border-none">
                  <TableCell colSpan={6} />
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <PaginationComponent onChangePage={(p) => { setPage(p); fetchData(p) }} page={page} pageQtd={pageQtd} />
    </div>
  );
}