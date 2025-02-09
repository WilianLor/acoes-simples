"use client";

import { Card } from "@/components/ui/card";
import { IStockList } from "@/types/stockList.interface";
import Link from "next/link";

export function PositionCard({averagePrice, positionValue, quantity, stock }: IStockList) {
  return (
    <Link href={`/analytics/${stock}`}>
      <Card className="bg-zinc-900 border-zinc-800 p-4 w-fit transition-all transform duration-200 hover:-translate-y-1 cursor-pointer">
        <div className="flex justify-between items-start mb-4 gap-14">
          <span className="text-yellow-500 font-bold text-3xl">{stock}</span>
          <div className="flex flex-col items-end">
            <span className="text-white font-bold text-lg">{positionValue}</span>
            <span className="text-xs text-yellow-500">Valor da posição</span>
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-yellow-500 text-sm">Cotas</span>
            <span className="text-white font-bold text-lg">{quantity}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-white font-bold text-lg">{averagePrice}</span>
            <span className="text-xs text-yellow-500">Preço Médio</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}