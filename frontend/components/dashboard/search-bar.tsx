"use client";

import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="mb-8">
      <h2 className="text-xl text-white mb-4">Pesquisar</h2>
      <Input 
        className="bg-zinc-800 border-zinc-700 text-white"
        placeholder="Search..."
      />
    </div>
  );
}