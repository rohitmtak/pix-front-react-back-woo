import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
  category?: string;
  alt?: string;
  isWishlisted?: boolean;
}

interface ProductGridProps {
  products: Product[];
  columns?: number;
  className?: string;
  onWishlistToggle?: (productId: string, isWishlisted: boolean) => void;
}

const ProductGrid = ({ 
  products, 
  columns = 4, 
  className,
  onWishlistToggle 
}: ProductGridProps) => {
  const getLayoutConfig = () => {
    switch (columns) {
      case 2:
        return { width: "w-[49%]", gap: "2%" }; // 2 columns with 2% gap
      case 3:
        return { width: "w-[32%]", gap: "1.5%" }; // 3 columns with 1.5% gap
      case 4:
        return { width: "w-[24%]", gap: "1%" }; // 4 columns with 1% gap
      default:
        return { width: "w-[24%]", gap: "1%" }; // Default to 4 columns
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        className={cn(
          "flex flex-wrap w-full",
          "transition-all duration-1000 ease-in-out"
        )}
        style={{ gap: getLayoutConfig().gap }}
      >
        {products.map((product) => (
          <div 
            key={product.id}
            className={cn(
              getLayoutConfig().width,
              "transition-all duration-1000 ease-in-out"
            )}
          >
            <ProductCard
              id={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              // category={product.category}
              alt={product.alt}
              isWishlisted={product.isWishlisted}
              onWishlistToggle={onWishlistToggle}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
