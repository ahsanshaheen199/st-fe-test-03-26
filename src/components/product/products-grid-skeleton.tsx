import { ProductCardSkeleton } from "./product-card-skeleton";

interface ProductsGridSkeletonProps {
  count?: number;
}

export function ProductsGridSkeleton({ count = 8 }: ProductsGridSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Skeleton grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>

      {/* Skeleton for pagination - matches Pagination component structure */}
      <div className="flex justify-center items-center gap-2 pt-4">
        {/* Previous button skeleton */}
        <div className="w-8 h-8 rounded-full bg-[#E8F3FF] animate-pulse"></div>

        {/* Page numbers skeleton */}
        <div className="w-8 h-8 rounded-full bg-[#E8F3FF] animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-[#1882FF] animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-[#E8F3FF] animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-[#E8F3FF] animate-pulse"></div>

        {/* Next button skeleton */}
        <div className="w-8 h-8 rounded-full bg-[#E8F3FF] animate-pulse"></div>
      </div>
    </div>
  );
}
