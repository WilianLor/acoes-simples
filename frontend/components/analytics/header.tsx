"use client";

import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StatsCards, StatsCardsProps } from "./stats-cards";
import { signOut } from "next-auth/react";

interface DashboardHeaderProps extends StatsCardsProps {
  stockName?: string;
  stock?: string;
}

const DashboardHeader = ({
  stockName,
  stock,
  ...statsCardsProps
}: DashboardHeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5 text-yellow-500" />
          </Button>
        </Link>
        {stockName && (
          <div>
            <h1 className="text-2xl font-bold text-yellow-500">
              AÇÃO: {stock}
            </h1>
            <span className="text-xs text-zinc-400">{stockName}</span>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <StatsCards {...statsCardsProps} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-5 w-5 text-yellow-500" />
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
