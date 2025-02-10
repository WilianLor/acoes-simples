"use client";

import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LogHeader() {
  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5 text-yellow-500" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-yellow-500">Todas as Movimentações</h1>
      </div>
      <Button variant="ghost" size="icon">
        <LogOut className="h-5 w-5 text-yellow-500" />
      </Button>
    </header>
  );
}