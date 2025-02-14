"use client";

import { ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import axiosAuth from "@/lib/service/axiosAuth";
import { saveAs } from "file-saver";
import { toast } from "@/hooks/use-toast";

export function LogHeader() {
  const handleDownloadXlsx = async () => {
    try {
      const result = await axiosAuth.get<Buffer>("/transaction/xlsx", {
        responseType: "blob",
      });

      const blob = new Blob([result?.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "transações.xlsx");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro:",
        description:
          (error as any)?.response.data.message || "Erro ao baixar xlsx",
      });
    }
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <Link href="/home">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5 text-yellow-500" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-yellow-500">
          Todas as Movimentações
        </h1>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <Button
          variant="outline"
          aria-selected={true}
          onClick={handleDownloadXlsx}
          className="bg-zinc-800 hover:bg-zinc-700 text-white aria-selected:bg-yellow-500 aria-selected:hover:bg-yellow-600 aria-selected:text-black"
        >
          Exportar XLSX
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
        >
          <LogOut size={25} className="text-amber-400" />
        </Button>
      </div>
    </header>
  );
}
