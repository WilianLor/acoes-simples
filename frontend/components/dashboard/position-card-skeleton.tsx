"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PositionCardSkeleton() {
    return (
        <Card className="bg-zinc-900 border-zinc-800 p-4">
            <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-6 w-16 bg-zinc-800" />
                <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-6 w-24 bg-zinc-800" />
                    <Skeleton className="h-4 w-28 bg-zinc-800" />
                </div>
            </div>
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-16 bg-zinc-800" />
                    <Skeleton className="h-6 w-12 bg-zinc-800" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-6 w-20 bg-zinc-800" />
                    <Skeleton className="h-4 w-24 bg-zinc-800" />
                </div>
            </div>
        </Card>
    );
}