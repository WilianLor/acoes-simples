import { DashboardHeader } from "@/components/dashboard/header";
import { SearchBar } from "@/components/dashboard/search-bar";
import { PositionGrid } from "@/components/dashboard/position-grid";


export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-black p-10">
            <DashboardHeader />
            <SearchBar />
            <PositionGrid />
        </main>
    );
}