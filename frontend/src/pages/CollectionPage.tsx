import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import GridLayoutToggle from "@/components/GridLayoutToggle";
import { cn } from "@/lib/utils";

// Mock product data based on the design
const mockProducts = [
  {
    id: "1",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/6714f073aacab712b21f60fbf4e61031c285fc0d?width=841",
    title: "Camilla",
    price: "₹120000",
    category: "Signature Collection",
    alt: "Signature Collection Product 1",
    isWishlisted: false
  },
  {
    id: "2",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/0efc5ea89a5ee8e0294affd324731a2314beb84b?width=841",
    title: "Amethyst",
    price: "₹120000",
    category: "Signature Collection",
    alt: "Signature Collection Product 2",
    isWishlisted: false
  },
  {
    id: "3",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/bdbf39600435e40a6f9b6e8648985bdc886f117b?width=841",
    title: "Irisa",
    price: "₹120000",
    category: "Signature Collection",
    alt: "Signature Collection Product 3",
    isWishlisted: true
  },
  {
    id: "4",
    imageUrl: "https://api.builder.io/api/v1/image/assets/TEMP/70502f0f5e1eb5199d05b1e35468e1ad7c937629?width=841",
    title: "Grace",
    price: "₹120000",
    category: "Signature Collection",
    alt: "Signature Collection Product 4",
    isWishlisted: true
  }
];

const CollectionPage = () => {
  const [gridLayout, setGridLayout] = useState(4);
  const [products, setProducts] = useState(mockProducts);

  const handleWishlistToggle = (productId: string, isWishlisted: boolean) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, isWishlisted }
          : product
      )
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-36">
        {/* Page Title */}
        <div className="flex justify-center pt-8 pb-6">
          <h1
            className="text-black text-center font-normal uppercase"
            style={{
              width: '635px',
              fontSize: '25px',
              fontWeight: 400,
              color: 'rgba(0,0,0,1)'
            }}
          >
            <span>SIGNATURE Collection</span>
          </h1>
        </div>

        {/* Horizontal Line */}
        {/* <div className="px-16 pb-4">
          <svg
            width="1800"
            height="1"
            viewBox="0 0 1800 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path d="M0 1L1800 1" stroke="black" strokeWidth="2" />
          </svg>
        </div> */}

        {/* Filter and Layout Controls */}
        <div className="px-16 pb-8">
          <div
            className="flex justify-between items-center"
          >
            {/* Filter Label */}
            <div>
              <span
                className="text-black text-center font-normal uppercase"
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  lineHeight: '20px',
                  color: 'rgba(0,0,0,1)'
                }}
              >
                FILTER
              </span>
            </div>

            {/* Grid Layout Toggle */}
            <GridLayoutToggle
              currentLayout={gridLayout}
              onLayoutChange={setGridLayout}
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-16 pb-16">
          <ProductGrid
            products={products}
            columns={gridLayout}
            onWishlistToggle={handleWishlistToggle}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CollectionPage;
