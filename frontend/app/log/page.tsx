"use client";

import { LogHeader } from "@/components/log/header";
import { TransactionsTable } from "@/components/log/transactions-table";
import { AddButton } from "@/components/dashboard/add-investment/add-button";
import { useEffect, useState } from "react";
import { IListTransaction } from "@/types/list-transaction.interface";
import axiosAuth from "@/lib/service/axiosAuth";
import { toast } from "@/hooks/use-toast";

const LIMIT = 15;

export default function LogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IListTransaction>();
  const [page, setPage] = useState(1);
  const [pageQtd, setPageQtd] = useState(1);

  const onChangePage = (newPage: number) => setPage(newPage);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const resp = await axiosAuth.get<IListTransaction>("/transaction", {
        params: {
          skip: page ? (page - 1) * LIMIT : 0,
          limit: LIMIT,
        },
      });

      setPageQtd(Math.ceil(resp.data.count / LIMIT) || 1);
      setData(resp.data);
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro - Data",
        description: "Falha ao carregar as informações, Recarregue!",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <main className="min-h-screen bg-black p-6">
      <LogHeader />
      <TransactionsTable
        onChangePage={onChangePage}
        page={page}
        pageQtd={pageQtd}
        data={data}
        isLoading={isLoading}
      />
      <AddButton refetch={fetchData} />
    </main>
  );
}
