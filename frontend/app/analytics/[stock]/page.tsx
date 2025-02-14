"use client";

import DashboardHeader from "@/components/analytics/header";
import PriceChart from "@/components/analytics/price-chart";
import TimeframeSelector from "@/components/analytics/timeframe-selector";
import TransactionsTable from "@/components/analytics/transactions-table";
import { AddButton } from "@/components/dashboard/add-investment/add-button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import axiosAuth from "@/lib/service/axiosAuth";
import {
  IHistoricalDataPrice,
  IStockAnalytics,
} from "@/types/stock-analytics.interface";
import { TimeFrameType } from "@/types/time-frame-selection.interface";
import { useParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const DashboardDetailsPage = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrameType>("3mo");
  const [stockInfo, setStockInfo] = useState<IStockAnalytics>();
  const params = useParams<{ stock: string }>();

  const fetchData = async () => {
    try {
      const result = await axiosAuth.get<IStockAnalytics>(
        `stock/${params.stock}?range=3mo&interval=1d`
      );

      setStockInfo(result.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro:",
        description:
          (error as any)?.response.data.message ||
          "Erro ao requisitar informações",
      });
    }
  };

  const filterHistoricalData = (
    historicalData: IHistoricalDataPrice[],
    timeFrame: TimeFrameType
  ) => {
    const now = new Date();
    let timeLimit;

    switch (timeFrame) {
      case "week":
        timeLimit = new Date(now.setDate(now.getDate() - 7));
        break;
      case "1mo":
        timeLimit = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "2mo":
        timeLimit = new Date(now.setMonth(now.getMonth() - 2));
        break;
      case "3mo":
        timeLimit = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        timeLimit = now;
    }

    return historicalData.filter(
      (item) => new Date(item.date * 1000) >= timeLimit
    );
  };

  useEffect(() => {
    fetchData();
  }, [params.stock]);

  const filteredData =
    stockInfo && stockInfo.quote.historicalDataPrice
      ? filterHistoricalData(stockInfo.quote.historicalDataPrice, timeFrame)
      : [];

  return (
    <main className="h-screen bg-black p-6">
      {stockInfo ? (
        <Fragment>
          <DashboardHeader
            stockName={stockInfo.quote?.longName || stockInfo.quote?.shortName}
            stock={stockInfo.quote?.symbol}
            averagePrice={stockInfo.averagePrice}
            quantity={stockInfo.quantity}
            currentPrice={stockInfo.quote.regularMarketPrice}
            positionValue={
              stockInfo.quantity * stockInfo.quote.regularMarketPrice
            }
          />
          <div className="grid grid-cols-4 gap-10">
            <TransactionsTable data={stockInfo.transactions} />
            <div className="flex flex-col col-span-3 gap-10">
              <TimeframeSelector selected={timeFrame} onSelect={setTimeFrame} />
              {filteredData.length > 0 ? (
                <PriceChart
                  data={filteredData}
                  coin={stockInfo.quote.currency}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p>Falha ao Carregar Dados Históricos da {params.stock}</p>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      ) : (
        <div className="grid grid-cols-4 gap-10">
          <Skeleton className="h-[600px] w-full bg-zinc-800" />
          <div className="flex flex-col col-span-3 gap-10">
            <Skeleton className="h-[700px] w-full bg-zinc-800" />
          </div>
        </div>
      )}
      <AddButton />
    </main>
  );
};

export default DashboardDetailsPage;
