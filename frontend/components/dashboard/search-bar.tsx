"use client";

import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

interface SearchBarProps {
  fetch: (search?: string) => Promise<void>;
}

export const SearchBar = ({ fetch }: SearchBarProps) => {
  const search = debounce(fetch, 500);

  return (
    <div className="mb-8">
      <h2 className="text-xl text-white mb-4">Pesquisar</h2>
      <Input
        className="bg-zinc-800 border-zinc-700 text-white"
        placeholder="Search..."
        onChange={(event) => search(event.target.value)}
      />
    </div>
  );
};
