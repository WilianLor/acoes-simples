"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

const PaginationComponent = ({ page, onChangePage, pageQtd }: { page: number, onChangePage: (p: number) => void, pageQtd: number }) => {
  return (
    <Pagination>
      <PaginationContent defaultValue={page}>
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious onClick={() => page !== 1 && onChangePage(page - 1)} />
        </PaginationItem>
        {page === pageQtd && page >= 3 && <PaginationItem className="cursor-pointer">
          <PaginationLink onClick={() => onChangePage(page - 2)}>{page - 2}</PaginationLink>
        </PaginationItem>}
        {page !== 1 && <PaginationItem className="cursor-pointer" value={page - 1}>
          <PaginationLink onClick={() => onChangePage(page - 1)}>{page - 1}</PaginationLink>
        </PaginationItem>}
        <PaginationItem>
          <PaginationLink isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {page !== pageQtd && <PaginationItem className="cursor-pointer">
          <PaginationLink onClick={() => onChangePage(page + 1)}>{page + 1}</PaginationLink>
        </PaginationItem>}
        {page === 1 && <PaginationItem className="cursor-pointer">
          <PaginationLink onClick={() => onChangePage(page + 2)}>{page + 2}</PaginationLink>
        </PaginationItem>}
        {page !== pageQtd && page !== pageQtd - 1 && !(page === 1 && pageQtd <= 3) && <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>}
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={() => page !== pageQtd && onChangePage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent;