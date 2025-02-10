"use client";

import { Button } from "@/components/ui/button";

export function TimeframeSelector() {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        className="bg-yellow-500 hover:bg-yellow-600 text-black"
      >
        1 dia
      </Button>
      <Button 
        variant="outline" 
        className="bg-zinc-800 hover:bg-zinc-700 text-white"
      >
        5 dias
      </Button>
      <Button 
        variant="outline" 
        className="bg-zinc-800 hover:bg-zinc-700 text-white"
      >
        1 mês
      </Button>
      <Button 
        variant="outline" 
        className="bg-zinc-800 hover:bg-zinc-700 text-white"
      >
        3 meses
      </Button>
    </div>
  );
}