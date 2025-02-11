"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddInvestmentDialog } from "./add-investment-dialog";
import { useState } from "react";

export interface AddButtonProps {
  refetch?: () => Promise<void>;
}

export const AddButton = ({ refetch }: AddButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-yellow-500 hover:bg-yellow-600"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <AddInvestmentDialog
        open={open}
        onOpenChange={setOpen}
        refetch={refetch}
      />
    </>
  );
};
