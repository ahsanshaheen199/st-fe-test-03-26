import { Suspense } from "react";
import type { PaginatedResponse, Product } from "../../types/product";
import { api } from "../../services/api";
import { ProductsGrid } from "./products-grid";
import { ProductsGridSkeleton } from "./products-grid-skeleton";
import { ProductsErrorFallback } from "./products-error-fallback";
import { ErrorBoundary } from "../error-boundary";
import { useSearchParams } from "../../hooks/useSearchParams";

export function ProductListWrapper() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const currentPage = searchParams.get("page") || 1;
  const category = searchParams.get("category");
  const limit = searchParams.get("limit") || 10;

  const productsPromise: Promise<PaginatedResponse<Product>> =
    api.fetchProducts({
      page: Number(currentPage) || 1,
      search: searchValue || undefined,
      category: category || undefined,
      limit: Number(limit) || 10,
    });

  return (
    <div className="w-full">
      <ErrorBoundary
        fallback={
          <ProductsErrorFallback
            error={new Error("Failed to load products. Please try again.")}
          />
        }
      >
        <Suspense
          fallback={<ProductsGridSkeleton count={Number(limit) || 10} />}
        >
          <ProductsGrid productsPromise={productsPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
