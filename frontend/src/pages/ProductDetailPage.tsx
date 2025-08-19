import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock product data
const mockProductDetails = {
  "1": {
    id: "1",
    title: "Camilla",
    price: "₹120000",
    description: "Exquisite craftsmanship meets timeless elegance in this signature piece from our premium collection.",
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/6714f073aacab712b21f60fbf4e61031c285fc0d?width=841",
      "https://api.builder.io/api/v1/image/assets/TEMP/0efc5ea89a5ee8e0294affd324731a2314beb84b?width=841",
      "https://api.builder.io/api/v1/image/assets/TEMP/bdbf39600435e40a6f9b6e8648985bdc886f117b?width=841"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    details: [
      "Premium fabric composition",
      "Hand-finished details",
      "Made in India",
      "Dry clean only"
    ],
    materials: [
      "100% Pure Silk",
      "Hand-embroidered details",
      "Premium lining fabric",
      "Dry clean only",
      "Store in garment bag"
    ]
  },
  "2": {
    id: "2",
    title: "Amethyst",
    price: "₹120000",
    description: "A masterpiece that embodies sophistication and luxury in every thread.",
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/0efc5ea89a5ee8e0294affd324731a2314beb84b?width=841",
      "https://api.builder.io/api/v1/image/assets/TEMP/6714f073aacab712b21f60fbf4e61031c285fc0d?width=841"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    details: [
      "Premium fabric composition",
      "Hand-finished details",
      "Made in India",
      "Dry clean only"
    ],
    materials: [
      "Premium Cotton Blend",
      "Hand-crafted embellishments",
      "Breathable lining",
      "Gentle hand wash",
      "Iron on low heat"
    ]
  }
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'materials'>('description');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  // Get product details
  const product = mockProductDetails[id as keyof typeof mockProductDetails];

  // Set default selected color to the first color in the array
  useEffect(() => {
    if (product && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product, selectedColor]);

  // Set default selected size to the first size in the array
  useEffect(() => {
    if (product && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedSize]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/collection")}>
            Back to Collection
          </Button>
        </div>
      </div>
    );
  }

  const handleWishlistToggle = (productId: string, isWishlisted: boolean) => {
    setIsWishlisted(isWishlisted);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-36">
        <div className="container mx-auto px-16 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Product Gallery */}
            <div className="space-y-8">
              {/* Main Image */}
              <div className="relative aspect-[421/553] overflow-hidden bg-gray-100">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Wishlist Button */}
                {/* <div className="absolute top-4 right-4">
                  <WishlistButton
                    productId={product.id}
                    isWishlisted={isWishlisted}
                    onToggle={handleWishlistToggle}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white/90"
                  />
                </div> */}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-all",
                        currentImageIndex === index
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${product.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Title and Price */}
              <div className="pb-6 border-b border-gray-200"> {/* mb-6 */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h1 
                    className="text-black font-normal uppercase text-2xl flex-1 min-w-0"
                    style={{
                      fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                      fontWeight: 400,
                      lineHeight: '32px',
                      color: 'rgba(0,0,0,1)'
                    }}
                  >
                    {product.title}
                  </h1>
                  <WishlistButton
                    productId={product.id}
                    isWishlisted={isWishlisted}
                    onToggle={handleWishlistToggle}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white/90 shrink-0"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  />
                </div>
                
                <p 
                  className="text-black font-normal text-xl"
                  style={{
                    fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                    fontWeight: 400,
                    color: 'rgba(0,0,0,1)'
                  }}
                >
                  {product.price}
                </p>
              </div>

              {/* Description */}
              {/* <div>
                <p 
                  className="text-gray-700"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                    lineHeight: '24px'
                  }}
                >
                  {product.description}
                </p>
              </div> */}

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium">Size</h3>
                  <button
                    onClick={() => setIsSizeChartOpen(true)}
                    className="flex items-center gap-2 text-base text-gray-600 hover:text-black transition-colors duration-200"
                  >
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      stroke="currentColor" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 640 512"
                    >
                      <path d="M608 128H32c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32zm0 224H32V160h80v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h80v192z"></path>
                    </svg>
                    Size Chart
                  </button>
                </div>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-[36px] h-[36px] rounded-full border transition-all duration-300 ease-in-out flex items-center justify-center text-sm",
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-base font-medium mb-3">
                  Color{selectedColor && (
                    <>
                      : <span className="font-normal text-gray-600">{selectedColor}</span>
                    </>
                  )}
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => {
                    // Map color names to actual hex values
                    const colorMap: { [key: string]: string } = {
                      "Black": "#000000",
                      "White": "#FFFFFF",
                      "Navy": "#000080",
                      "Red": "#FF0000",
                      "Blue": "#0000FF",
                      "Green": "#008000",
                      "Yellow": "#FFFF00",
                      "Pink": "#FFC0CB",
                      "Purple": "#800080",
                      "Orange": "#FFA500",
                      "Brown": "#A52A2A",
                      "Gray": "#808080"
                    };
                    
                    const hexColor = colorMap[color] || "#CCCCCC"; // Default gray if color not found
                    
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-[28px] h-[28px] rounded-full border transition-all duration-300 ease-in-out relative",
                          selectedColor === color
                            ? "border-black" // Black border always at original size
                            : "border-gray-300 hover:border-gray-400"
                        )}
                        title={color} // Show color name on hover
                      >
                        {/* Inner color circle that scales down when selected */}
                        <div 
                          className={cn(
                            "absolute inset-0 rounded-full transition-transform duration-300 ease-in-out",
                            selectedColor === color
                              ? "scale-75" // Scale down to 75% when selected
                              : "scale-100" // Full size when not selected
                          )}
                          style={{
                            backgroundColor: hexColor,
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8 flex gap-4">
                <Button 
                  className="w-full text-sm font-normal bg-black text-white hover:bg-gray-800"
                  disabled={!selectedSize || !selectedColor}
                >
                  ADD TO CART
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-sm font-normal border-black text-black hover:bg-gray-50"
                >
                  BUY NOW
                </Button>
              </div>

              {/* Product Details Tabs */}
              <div className="mt-8">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6 gap-8">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={cn(
                      "py-3 text-sm font-medium transition-colors duration-200",
                      activeTab === 'description'
                        ? "text-black border-b-2 border-black"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('details')}
                    className={cn(
                      "py-3 text-sm font-medium transition-colors duration-200",
                      activeTab === 'details'
                        ? "text-black border-b-2 border-black"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className={cn(
                      "py-3 text-sm font-medium transition-colors duration-200",
                      activeTab === 'materials'
                        ? "text-black border-b-2 border-black"
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    Materials & Care
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'description' && (
                  <div>
                    <p 
                      className="text-gray-700"
                      style={{
                        fontSize: '16px',
                        fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                        lineHeight: '24px'
                      }}
                    >
                      {product.description}
                    </p>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div>
                    <ul className="space-y-2">
                      {product.details.map((detail, index) => (
                        <li 
                          key={index}
                          className="text-gray-700"
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px'
                          }}
                        >
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div>
                    <ul className="space-y-2">
                      {product.materials.map((material, index) => (
                        <li 
                          key={index}
                          className="text-gray-700"
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px'
                          }}
                        >
                          • {material}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50 transition-opacity duration-300"
            onClick={() => setIsSizeChartOpen(false)}
          />
          
          {/* Size Chart Panel */}
          <div
            className={cn(
              "fixed top-0 right-0 w-[400px] h-screen z-50 transition-transform duration-300 bg-white shadow-2xl",
              isSizeChartOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Size Chart</h2>
              <button
                onClick={() => setIsSizeChartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Size Chart Content */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">How to Measure</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Use a measuring tape to measure your body. For the most accurate fit, have someone help you measure.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Bust: Measure around the fullest part</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Waist: Measure around the narrowest part</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Hips: Measure around the fullest part</span>
                  </div>
                </div>
              </div>

              {/* Size Table */}
              <div>
                <h3 className="text-lg font-medium mb-4">Size Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 font-medium">Size</th>
                        <th className="text-left py-2 font-medium">Bust (cm)</th>
                        <th className="text-left py-2 font-medium">Waist (cm)</th>
                        <th className="text-left py-2 font-medium">Hips (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">XS</td>
                        <td className="py-2">76-81</td>
                        <td className="py-2">58-63</td>
                        <td className="py-2">81-86</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">S</td>
                        <td className="py-2">81-86</td>
                        <td className="py-2">63-68</td>
                        <td className="py-2">86-91</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">M</td>
                        <td className="py-2">86-91</td>
                        <td className="py-2">68-73</td>
                        <td className="py-2">91-96</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-2">L</td>
                        <td className="py-2">91-96</td>
                        <td className="py-2">73-78</td>
                        <td className="py-2">96-101</td>
                      </tr>
                      <tr>
                        <td className="py-2">XL</td>
                        <td className="py-2">96-101</td>
                        <td className="py-2">78-83</td>
                        <td className="py-2">101-106</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
