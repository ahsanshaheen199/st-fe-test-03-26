import { use } from "react";
import type { Product, PaginatedResponse } from "../../types/product";
import { ProductCard } from "./product-card";
import { Pagination } from "./pagination";
import { EmptyState } from "./empty-state";

interface ProductsGridProps {
  productsPromise: Promise<PaginatedResponse<Product>>;
}

export function ProductsGrid({ productsPromise }: ProductsGridProps) {
  const { data: products, totalPages } = use(productsPromise);

  // Handle empty state
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
