import type { Product } from "../../types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div>
      <div className="rounded-lg">
        <img
          height={400}
          width={300}
          alt={product.name}
          src={product.imageUrl}
          className="rounded-lg w-full"
        />
      </div>
      <div className="flex flex-col p-2">
        <span className="font-murecho text-sm text-[#5A6573] font-normal inline-block mb-0.5">
          Fabrilife
        </span>
        <h2 className="line-clamp-2 font-medium font-murecho text-base leading-[22px] text-[#1A2B3D] mb-2">
          {product.name}
        </h2>
        <p className="font-murecho text-xl leading-[22px] font-medium text-[#1882FF] flex gap-x-[3px] items-center">
          <span>৳</span> {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
