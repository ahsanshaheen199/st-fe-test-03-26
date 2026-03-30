import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "../../hooks/useSearchParams";
import { useMemo, useCallback } from "react";
import { updateSearchParams } from "../../utils/url";

interface PaginationProps {
  totalPages: number;
}

/**
 * Pagination - Numbered pagination with circular buttons
 */
export function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();

  // Parse and validate current page from URL
  const currentPage = useMemo(() => {
    const pageParam = searchParams.get("page");
    if (!pageParam) return 1;

    const page = Number(pageParam);
    // Validate page is a number and within valid range
    if (isNaN(page) || page < 1 || page > totalPages) {
      return 1;
    }
    return page;
  }, [searchParams, totalPages]);

  // Generate page numbers to show (memoized)
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show current page and adjacent pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  const onPageChange = useCallback((value: number) => {
    // Validate page number
    if (isNaN(value) || value < 1) {
      console.warn(`Invalid page number: ${value}`);
      return;
    }

    updateSearchParams((params) => {
      // Update page param
      if (value > 1) {
        params.set("page", value.toString());
      } else {
        params.delete("page");
      }
    });
  }, []);

  return (
    <div className="flex justify-center items-center gap-2 pt-4">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E8F3FF] text-[#1882FF] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1882FF] hover:text-white transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-text-muted"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;
        const pageNumber = page as number;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isActive
                ? "bg-[#1882FF] text-white"
                : "bg-[#E8F3FF] text-[#1882FF] hover:bg-[#1882FF] hover:text-white"
            }`}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E8F3FF] text-[#1882FF] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1882FF] hover:text-white transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
