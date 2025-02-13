"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TableHeaderComponent } from "./table-header";
import { TableRowSkeleton } from "./table-row-skeleton";
import {
  IListTransaction,
  TransactionTypeDisplayEnum,
  TransactionTypeEnum,
} from "../../types/list-transaction.interface";
import { dateHourFormater } from "@/lib/service/formaters";
import PaginationComponent from "./pagination";

interface TransactionsTableProps {
  isLoading?: boolean;
  data?: IListTransaction;
  onChangePage: (page: number) => void;
  page: number;
  pageQtd: number;
}

export const TransactionsTable = ({
  onChangePage,
  page,
  pageQtd,
  data,
  isLoading,
}: TransactionsTableProps) => (
  <div className="rounded-md border border-zinc-800 flex flex-col gap-6 pb-6 transition-all">
    <Table>
      <TableHeaderComponent />
      <TableBody>
        {data && !isLoading
          ? data.transactions &&
            data.transactions.map((transaction, index) => (
              <TableRow
                key={index}
                className={`border-zinc-800 hover:bg-zinc-900 ${
                  index % 2 === 0 ? "bg-zinc-900" : "bg-black"
                }`}
              >
                <TableCell className="font-medium text-white">
                  {transaction.stock?.name} ({transaction.stock?.stock})
                </TableCell>
                <TableCell className="text-white">
                  {dateHourFormater(`${transaction.date}`)}
                </TableCell>
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
                  {transaction.type === TransactionTypeEnum.buy ? (
                    <span className={"text-green-500"}>
                      {TransactionTypeDisplayEnum.buy}
                    </span>
                  ) : (
                    <span className={"text-red-500"}>
                      {TransactionTypeDisplayEnum.sale}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          : Array(15)
              .fill(0)
              .map((_, index) => (
                <TableRowSkeleton key={`skeleton-${index}`} />
              ))}
      </TableBody>
    </Table>
    <PaginationComponent
      onChangePage={onChangePage}
      page={page}
      pageQtd={pageQtd}
    />
  </div>
);
