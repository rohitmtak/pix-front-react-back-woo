import { cn } from "@/lib/utils";
import WishlistButton from "./WishlistButton";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  category?: string;
  alt?: string;
  className?: string;
  showWishlist?: boolean;
  isWishlisted?: boolean;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}

const ProductCard = ({
  id,
  imageUrl,
  title,
  price,
  category,
  alt = "",
  className,
  showWishlist = true,
  isWishlisted = false,
  onWishlistToggle
}: ProductCardProps) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Product Image Container */}
      <div className="relative w-full group">
        <Link to={`/product/${id}`} className="block w-full">
          <div className="relative w-full aspect-[421/553] overflow-hidden">
            <img
              src={imageUrl}
              alt={alt || title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Wishlist Button */}
        {/* {showWishlist && (
          <div className="absolute top-2.5 right-2.5">
            <WishlistButton
              productId={id}
              isWishlisted={isWishlisted}
              onToggle={onWishlistToggle}
              className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white/90"
            />
          </div>
        )} */}
      </div>

      {/* Product Info */}
      <div className="flex justify-between items-start pb-8 px-1.5">
        {/* Left side - Product details */}
        <div className="flex-1">
          {/* Category */}
          {category && (
            <span className="text-gray-600 font-jost text-sm uppercase tracking-wide block">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-black text-sm">
            <span style={{
              fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: 'rgba(34,34,34,1)'
            }}>
              {title}
            </span>
          </h3>

          {/* Price */}
          <p className="text-black font-normal text-sm">
            <span style={{
              fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: 'rgba(0,0,0,1)'
            }}>
              {price}
            </span>
          </p>
        </div>

        {/* Right side - Wishlist button */}
        {showWishlist && (
          <div className="ml-4 flex-shrink-0">
            <WishlistButton
              productId={id}
              isWishlisted={isWishlisted}
              onToggle={onWishlistToggle}
              className="bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
