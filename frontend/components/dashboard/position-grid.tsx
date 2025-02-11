"use client";

import { PositionCard } from "./position-card";
import { PositionCardSkeleton } from "./position-card-skeleton";
import { IStockList } from "@/types/stockList.interface";

export interface PositionGridProps {
  stocks: IStockList[];
}

export const PositionGrid = ({ stocks }: PositionGridProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {stocks && stocks.length > 0
        ? stocks.map((position, index) => (
            <PositionCard key={`position-${index}`} {...position} />
          ))
        : Array(14)
            .fill(0)
            .map((_, index) => (
              <PositionCardSkeleton key={`skeleton-${index}`} />
            ))}
    </div>
  );
};
