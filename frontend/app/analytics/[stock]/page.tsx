import { DashboardHeader } from "@/components/analytics/header";
import { PriceChart } from "@/components/analytics/price-chart";
import { TransactionsTable } from "@/components/analytics/transactions-table";
import { TimeframeSelector } from "@/components/analytics/timeframe-selector";
import { AddButton } from "@/components/dashboard/add-investment/add-button";

export default function DashboardDetailsPage() {
  return (
    <main className="h-screen bg-black p-6">
      <DashboardHeader />
      <div className="grid grid-cols-4 gap-10">
        <TransactionsTable />
        <div className="flex flex-col col-span-3 gap-10">
          <TimeframeSelector />
          <PriceChart />
        </div>
      </div>
      <AddButton />
    </main>
  );
}
