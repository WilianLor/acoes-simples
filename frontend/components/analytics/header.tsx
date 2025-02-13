"use client";

import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StatsCards } from "./stats-cards";

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5 text-yellow-500" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-yellow-500">AÇÃO: RBT</h1>
          {/* <div className="flex items-center gap-2 text-sm">
            <span className="text-white">R$ 9,99</span>
            <span className="text-green-500">+10,38%</span>
            <span className="text-green-500">+ 0,92 Hoje</span>
          </div> */}
          <span className="text-xs text-zinc-400">4 de nov. 20:10 UTC-3</span>
        </div>
      </div>
      <div className="flex gap-2 items-center">

        <StatsCards />
        <Button variant="ghost" size="icon">
          <LogOut className="h-5 w-5 text-yellow-500" />
        </Button>
      </div>
    </header>
  );
}

export default DashboardHeader;