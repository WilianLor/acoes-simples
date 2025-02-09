"use client";

import { useEffect, useState } from "react";
import { PositionCard } from "./position-card";
import { PositionCardSkeleton } from "./position-card-skeleton";
import axiosAuth from "@/lib/service/axiosAuth";
import { IStockList } from "@/types/stockList.interface";

export function PositionGrid() {
  const [stocks, setStocks] = useState<IStockList[]>()

  const fetchData = async () => {
    try {
      const result = await axiosAuth.get<IStockList[]>('/stock')
      setStocks(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {stocks && stocks.length > 0
        ? stocks.map((position, index) => (
          <PositionCard key={`position-${index}`} {...position} />
        ))
        : Array(14).fill(0).map((_, index) => (
          <PositionCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
}