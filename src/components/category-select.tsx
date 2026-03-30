import { useSearchParams } from "../hooks/useSearchParams";
import { useCallback } from "react";
import { updateSearchParams } from "../utils/url";

interface CategorySelectProps {
  placeholder?: string;
}

// Whitelist of valid categories
const VALID_CATEGORIES = [
  "",
  "electronics",
  "clothing",
  "home",
  "outdoors",
] as const;

export function CategorySelect({
  placeholder = "All Categories",
}: CategorySelectProps) {
  const searchParams = useSearchParams();
  const categoryValue = searchParams.get("category") || "";
  const selectId = "category-select";

  const handleChange = useCallback(
    (value: string) => {
      // Validate category value
      if (
        !VALID_CATEGORIES.includes(value as (typeof VALID_CATEGORIES)[number])
      ) {
        console.warn(`Invalid category value: ${value}`);
        return;
      }

      // Only update if value actually differs from current URL
      if (value === categoryValue) {
        return;
      }

      updateSearchParams((params) => {
        if (value === "") {
          params.delete("category");
        } else {
          params.set("category", value);
        }
        // Reset page when category changes
        params.delete("page");
      });
    },
    [categoryValue],
  );

  return (
    <>
      <label htmlFor={selectId} className="sr-only">
        Filter by category
      </label>
      <select
        id={selectId}
        value={categoryValue}
        onChange={(e) => handleChange(e.target.value)}
        className="glass-panel px-4 py-3 text-text-main outline-none text-base cursor-pointer appearance-none"
        aria-label="Filter by category"
      >
        <option value="" className="bg-surface">
          {placeholder}
        </option>
        <option value="electronics" className="bg-surface">
          Electronics
        </option>
        <option value="clothing" className="bg-surface">
          Clothing
        </option>
        <option value="home" className="bg-surface">
          Home
        </option>
        <option value="outdoors" className="bg-surface">
          Outdoors
        </option>
      </select>
    </>
  );
}
