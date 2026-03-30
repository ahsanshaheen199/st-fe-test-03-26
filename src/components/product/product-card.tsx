import { memo, useState, useCallback, useMemo } from "react";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

// Validate URL is safe (prevent javascript: and data: URLs)
function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    // Only allow http and https protocols
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function ProductCardComponent({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // Format price once (could also be done at data level)
  const formattedPrice = useMemo(
    () => product.price.toLocaleString(),
    [product.price]
  );

  // Validate image URL
  const isImageValid = !imageError && isValidImageUrl(product.imageUrl);
  const imageSrc = isImageValid ? product.imageUrl : "";
  const imageAlt = product.name ? `Product: ${product.name}` : "Product image";

  return (
    <article role="article">
      <figure className="rounded-lg">
        {isImageValid ? (
          <img
            role="img"
            height={400}
            width={300}
            alt={imageAlt}
            src={imageSrc}
            className="rounded-lg w-full"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        ) : (
          <div
            role="img"
            aria-label={imageAlt}
            className="rounded-lg w-full bg-surface-hover flex items-center justify-center"
            style={{ aspectRatio: "3/4" }}
          >
            <span className="text-text-muted text-4xl">📦</span>
          </div>
        )}
      </figure>
      <div className="flex flex-col p-2">
        <span className="font-murecho text-sm text-[#5A6573] font-normal inline-block mb-0.5">
          Fabrilife
        </span>
        <h2 className="line-clamp-2 font-medium font-murecho text-base leading-[22px] text-[#1A2B3D] mb-2">
          {product.name}
        </h2>
        <p className="font-murecho text-xl leading-[22px] font-medium text-[#1882FF] flex gap-x-[3px] items-center">
          <span>৳</span> {formattedPrice}
        </p>
      </div>
    </article>
  );
}

// Memoize to prevent unnecessary re-renders
export const ProductCard = memo(ProductCardComponent);
