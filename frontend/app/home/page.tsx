import { DashboardHeader } from "@/components/dashboard/header";
import { SearchBar } from "@/components/dashboard/search-bar";
import { PositionGrid } from "@/components/dashboard/position-grid";
import { AddButton } from "@/components/dashboard/add-investment/add-button";

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-black p-10">
            <DashboardHeader />
            <SearchBar />
            <PositionGrid />
            <AddButton />
        </main>
    );
}