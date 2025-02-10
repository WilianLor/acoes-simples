import { LogHeader } from "@/components/log/header";
import { TransactionsTable } from "@/components/log/transactions-table";
import { AddButton } from "@/components/dashboard/add-investment/add-button";

export default function LogPage() {
    return (
        <main className="min-h-screen bg-black p-6">
            <LogHeader />
            <TransactionsTable />
            {/* <Pagination /> */}
            <AddButton />
        </main>
    );
}