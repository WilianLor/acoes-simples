"use client";

import {
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TableHeaderComponent() {
    return (
        <TableHeader className="bg-zinc-900">
            <TableRow className="border-zinc-800 hover:bg-zinc-900">
                <TableHead className="text-yellow-500">
                    <Button variant="ghost" className="p-0 text-yellow-500 hover:text-yellow-600">
                        Nome <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead className="text-yellow-500">
                    <Button variant="ghost" className="p-0 text-yellow-500 hover:text-yellow-600">
                        Data <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </TableHead>
                <TableHead className="text-yellow-500">Qtd</TableHead>
                <TableHead className="text-yellow-500">Valor por cota</TableHead>
                <TableHead className="text-yellow-500">Valor Total</TableHead>
                <TableHead className="text-yellow-500">Ação</TableHead>
            </TableRow>
        </TableHeader>
    );
}