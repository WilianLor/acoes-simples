"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function TableRowSkeleton() {
    return (
        <TableRow className="border-zinc-800 hover:bg-zinc-900">
            <TableCell><Skeleton className="h-5 w-16 bg-zinc-800" /></TableCell>
            <TableCell><Skeleton className="h-5 w-24 bg-zinc-800" /></TableCell>
            <TableCell><Skeleton className="h-5 w-12 bg-zinc-800" /></TableCell>
            <TableCell><Skeleton className="h-5 w-24 bg-zinc-800" /></TableCell>
            <TableCell><Skeleton className="h-5 w-24 bg-zinc-800" /></TableCell>
            <TableCell><Skeleton className="h-5 w-16 bg-zinc-800" /></TableCell>
        </TableRow>
    );
}