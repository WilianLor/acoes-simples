"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { SearchBar } from "@/components/dashboard/search-bar";
import { PositionGrid } from "@/components/dashboard/position-grid";
import { AddButton } from "@/components/dashboard/add-investment/add-button";
import { useEffect, useState } from "react";
import { IStockList } from "@/types/stockList.interface";
import axiosAuth from "@/lib/service/axiosAuth";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [stocks, setStocks] = useState<IStockList[]>([]);

  const fetchData = async () => {
    try {
      const result = await axiosAuth.get<IStockList[]>("/stock");

      setStocks(result.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro:",
        description:
          (error as any)?.response.data.message ||
          "Erro ao adicionar movimentação",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-black p-10">
      <DashboardHeader />
      <SearchBar />
      <PositionGrid stocks={stocks} />
      <AddButton refetch={fetchData} />
    </main>
  );
}
