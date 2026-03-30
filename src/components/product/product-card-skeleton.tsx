/**
 * ProductCardSkeleton - Skeleton loader matching ProductCard design
 */
export function ProductCardSkeleton() {
  return (
    <div>
      <div className="rounded-lg bg-gray-200 aspect-[4/3] mb-2 animate-pulse"></div>
      <div className="flex flex-col p-2">
        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
        <div className="h-5 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-6 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
