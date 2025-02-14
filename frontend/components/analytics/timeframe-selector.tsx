"use client";

import { Button } from "@/components/ui/button";
import { TimeFrameType } from "@/types/time-frame-selection.interface";

const TimeframeSelector = ({
  selected,
  onSelect,
}: {
  selected: TimeFrameType;
  onSelect: (opt: TimeFrameType) => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        aria-selected={selected === "week"}
        onClick={() => selected !== "week" && onSelect("week")}
        className="bg-zinc-800 hover:bg-zinc-700 text-white aria-selected:bg-yellow-500 aria-selected:hover:bg-yellow-600 aria-selected:text-black"
      >
        1 semana
      </Button>
      <Button
        variant="outline"
        aria-selected={selected === "1mo"}
        onClick={() => selected !== "1mo" && onSelect("1mo")}
        className="bg-zinc-800 hover:bg-zinc-700 text-white aria-selected:bg-yellow-500 aria-selected:hover:bg-yellow-600 aria-selected:text-black"
      >
        1 mês
      </Button>
      <Button
        variant="outline"
        aria-selected={selected === "2mo"}
        onClick={() => selected !== "2mo" && onSelect("2mo")}
        className="bg-zinc-800 hover:bg-zinc-700 text-white aria-selected:bg-yellow-500 aria-selected:hover:bg-yellow-600 aria-selected:text-black"
      >
        2 meses
      </Button>
      <Button
        variant="outline"
        aria-selected={selected === "3mo"}
        onClick={() => selected !== "3mo" && onSelect("3mo")}
        className="bg-zinc-800 hover:bg-zinc-700 text-white aria-selected:bg-yellow-500 aria-selected:hover:bg-yellow-600 aria-selected:text-black"
      >
        3 meses
      </Button>
    </div>
  );
};

export default TimeframeSelector;
