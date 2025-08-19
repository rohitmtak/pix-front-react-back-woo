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
  const getGridCols = () => {
    switch (columns) {
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      default:
        return "grid-cols-4";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        className={cn(
          "grid gap-3 w-full",
          getGridCols()
        )}
        // style={{ 
        //   width: '1792px',
        //   height: '629px'
        // }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            price={product.price}
            category={product.category}
            alt={product.alt}
            isWishlisted={product.isWishlisted}
            onWishlistToggle={onWishlistToggle}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
