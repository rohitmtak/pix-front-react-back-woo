import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WishlistButton from "@/components/WishlistButton";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Error } from "@/components/ui/error";
import { useProduct } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";

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
  const [isColorLoading, setIsColorLoading] = useState(false);

  // Fetch product details from API
  const {
    data: productResponse,
    isLoading,
    isError,
    error
  } = useProduct(Number(id));

  const product = productResponse?.data;

  // Debug logging for variations
  useEffect(() => {
    if (product) {
      console.log('Product loaded:', product);
      console.log('Variations:', product.variations);
      console.log('Attributes:', product.attributes);
    }
  }, [product]);

  // Set default selected color and size when product loads
  useEffect(() => {
    if (product) {
      // Set default color from product attributes
      const colorAttribute = product.attributes.find(attr => 
        attr.name.toLowerCase().includes('color') || 
        attr.name.toLowerCase().includes('colour')
      );
      if (colorAttribute && colorAttribute.options.length > 0) {
        setSelectedColor(colorAttribute.options[0]);
      }

      // Set default size from product attributes
      const sizeAttribute = product.attributes.find(attr => 
        attr.name.toLowerCase().includes('size')
      );
      if (sizeAttribute && sizeAttribute.options.length > 0) {
        setSelectedSize(sizeAttribute.options[0]);
      }
    }
  }, [product]);

  // Reset image index when color changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-36">
          <div className="container mx-auto px-16 py-16">
            <Loading size="lg" text="Loading product..." className="py-16" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (isError || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-36">
          <div className="container mx-auto px-16 py-16">
            <Error
              title={isError ? "Error Loading Product" : "Product not found"}
              message={isError 
                ? error?.message || "Failed to load product. Please try again."
                : "The product you're looking for doesn't exist."
              }
              onRetry={isError ? () => window.location.reload() : undefined}
              retryText="Retry"
            />
            <div className="mt-6 text-center">
              <Button onClick={() => navigate("/collection")}>
                Back to Collection
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get current variation data for pricing - only call when product exists
  const getCurrentVariation = () => {
    if (!product || !product.variations || product.variations.length === 0) {
      return null;
    }

    return product.variations.find(variation => 
      variation.attributes?.some(attr => 
        (attr.name.toLowerCase().includes('color') || attr.name.toLowerCase().includes('colour')) &&
        attr.option.toLowerCase() === selectedColor.toLowerCase()
      ) &&
      variation.attributes?.some(attr => 
        attr.name.toLowerCase().includes('size') &&
        attr.option.toLowerCase() === selectedSize.toLowerCase()
      )
    );
  };

  const currentVariation = product ? getCurrentVariation() : null;

  const handleWishlistToggle = (productId: string, isWishlisted: boolean) => {
    setIsWishlisted(isWishlisted);
    // TODO: Implement wishlist API call
    console.log(`Product ${productId} wishlist toggled to ${isWishlisted}`);
  };

  const handleColorSelection = (color: string) => {
    if (color === selectedColor) return; // Don't do anything if same color selected
    
    setIsColorLoading(true);
    setSelectedColor(color);
    setCurrentImageIndex(0); // Reset to first image when color changes
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      setIsColorLoading(false);
    }, 300);
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  // Get available sizes and colors from product attributes
  const sizeAttribute = product?.attributes?.find(attr => 
    attr.name.toLowerCase().includes('size')
  );
  const colorAttribute = product?.attributes?.find(attr => 
    attr.name.toLowerCase().includes('color') || 
    attr.name.toLowerCase().includes('colour')
  );

  const sizes = sizeAttribute?.options || [];
  const colors = colorAttribute?.options || [];

  // Get images for the selected color variant
  const getImagesForColor = (color: string) => {
    if (!product || !product.variations || product.variations.length === 0) {
      return product?.images || []; // Return main product images if no variations
    }

    // Find variation that matches the selected color
    const colorVariation = product.variations.find(variation => 
      variation.attributes?.some(attr => 
        (attr.name.toLowerCase().includes('color') || attr.name.toLowerCase().includes('colour')) &&
        attr.option.toLowerCase() === color.toLowerCase()
      )
    );

    // If variation has images, use those; otherwise fall back to main product images
    if (colorVariation && colorVariation.images && colorVariation.images.length > 0) {
      return colorVariation.images;
    }

    return product.images || [];
  };

  // Get current images based on selected color
  const currentImages = product ? getImagesForColor(selectedColor) : [];

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
                {currentImages.length > 0 ? (
                  <>
                    <img
                      src={currentImages[currentImageIndex]?.src}
                      alt={currentImages[currentImageIndex]?.alt || product.name}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      key={`${selectedColor}-${currentImageIndex}`} // Force re-render when color changes
                    />
                    {isColorLoading && (
                      <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                        <Loading size="md" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
                
                {/* Wishlist Button */}
                <div className="absolute top-4 right-4">
                  <WishlistButton
                    productId={product.id.toString()}
                    isWishlisted={isWishlisted}
                    onToggle={handleWishlistToggle}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white/90"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {currentImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto">
                  {currentImages.map((image, index) => (
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
                        src={image.src}
                        alt={image.alt || `${product.name} view ${index + 1}`}
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
              <div className="pb-6 border-b border-gray-200">
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
                    {product.name}
                  </h1>
                  <WishlistButton
                    productId={product.id.toString()}
                    isWishlisted={isWishlisted}
                    onToggle={handleWishlistToggle}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white/90 shrink-0"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <p 
                    className="text-black font-normal text-xl"
                    style={{
                      fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                      fontWeight: 400,
                      color: 'rgba(0,0,0,1)'
                    }}
                  >
                    ₹{currentVariation?.price || product.price}
                  </p>
                  {(currentVariation?.sale_price || product.sale_price) && 
                   (currentVariation?.sale_price !== currentVariation?.price || product.sale_price !== product.price) && (
                    <p 
                      className="text-gray-500 line-through text-lg"
                      style={{
                        fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                      }}
                    >
                      ₹{currentVariation?.regular_price || product.regular_price}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              {product.short_description && (
                <div>
                  <p 
                    className="text-gray-700"
                    style={{
                      fontSize: '16px',
                      fontFamily: 'Jost, -apple-system, Roboto, Jost, sans-serif',
                      lineHeight: '24px'
                    }}
                  >
                    {product.short_description}
                  </p>
                </div>
              )}

              {/* Size Selection */}
              {sizes.length > 0 && (
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
                        <path d="M608 128H32c-17.67 0-32 14.33-32 32v192c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V160c0-17.67-14.33-32-32-32zm0 224H32V160h80v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h64v56c0 4.42 3.58 8 8 8h16c4.42 0 8-3.58 8-8v-56h80v192z"></path>
                      </svg>
                      Size Chart
                    </button>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {sizes.map((size) => {
                      // Check if this size variant is available for the selected color
                      const sizeVariation = product?.variations?.find(variation => 
                        variation.attributes?.some(attr => 
                          (attr.name.toLowerCase().includes('color') || attr.name.toLowerCase().includes('colour')) &&
                          attr.option.toLowerCase() === selectedColor.toLowerCase()
                        ) &&
                        variation.attributes?.some(attr => 
                          attr.name.toLowerCase().includes('size') &&
                          attr.option.toLowerCase() === size.toLowerCase()
                        )
                      );
                      
                      const isAvailable = !sizeVariation || sizeVariation.stock_status === 'instock';
                      
                      return (
                        <button
                          key={size}
                          onClick={() => handleSizeSelection(size)}
                          disabled={!isAvailable}
                          className={cn(
                            "w-12 h-12 rounded-full border-2 transition-all duration-300 ease-in-out text-sm font-medium flex items-center justify-center",
                            selectedSize === size
                              ? "border-black bg-black text-white"
                              : "border-gray-300 hover:border-gray-400 text-gray-700",
                            !isAvailable && "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
                          )}
                          title={`${size}${!isAvailable ? ' - Out of Stock' : ''}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {colors.length > 0 && (
                <div>
                  <h3 className="text-base font-medium mb-3">
                    Color{selectedColor && (
                      <>
                        : <span className="font-normal text-gray-600">{selectedColor}</span>
                        {currentVariation && (
                          <span className="ml-2 text-sm text-green-600">
                            • Available
                          </span>
                        )}
                      </>
                    )}
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {colors.map((color) => {
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
                      
                      // Check if this color variant is available
                      const colorVariation = product?.variations?.find(variation => 
                        variation.attributes?.some(attr => 
                          (attr.name.toLowerCase().includes('color') || attr.name.toLowerCase().includes('colour')) &&
                          attr.option.toLowerCase() === color.toLowerCase()
                        )
                      );
                      
                      const isAvailable = !colorVariation || colorVariation.stock_status === 'instock';
                      const hasVariationImages = colorVariation && colorVariation.images && colorVariation.images.length > 0;
                      
                      return (
                        <button
                          key={color}
                          onClick={() => handleColorSelection(color)}
                          disabled={!isAvailable || isColorLoading}
                          className={cn(
                            "w-8 h-8 rounded-full border-2 transition-all duration-300 ease-in-out relative",
                            selectedColor === color
                              ? "border-black scale-110" // Black border and slightly larger when selected
                              : "border-gray-300 hover:border-gray-400",
                            !isAvailable && "opacity-50 cursor-not-allowed",
                            isColorLoading && "opacity-50 cursor-not-allowed"
                          )}
                          title={`${color}${!isAvailable ? ' - Out of Stock' : ''}${hasVariationImages ? ' - Has variant images' : ''}`} // Show color name and stock status on hover
                        >
                          <div 
                            className="absolute inset-1 rounded-full"
                            style={{
                              backgroundColor: hexColor,
                            }}
                          />
                          {!isAvailable && (
                            <div className="absolute inset-0 rounded-full bg-gray-400 opacity-60" />
                          )}
                          {hasVariationImages && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                          )}
                          {isColorLoading && (
                            <Loading size="sm" className="absolute inset-0 rounded-full" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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
                  className="w-full text-sm font-normal border-2 border-black text-black hover:bg-gray-50"
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
                      {product.description || product.short_description || "No description available."}
                    </p>
                  </div>
                )}

                {activeTab === 'details' && (
                  <div>
                    <ul className="space-y-2">
                      {product?.attributes?.map((attribute, index) => (
                        <li 
                          key={index}
                          className="text-gray-700"
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px'
                          }}
                        >
                          <strong>{attribute.name}:</strong> {attribute.options.join(', ')}
                        </li>
                      )) || []}
                      <li 
                        className="text-gray-700"
                        style={{
                          fontSize: '14px',
                          lineHeight: '20px'
                        }}
                      >
                        <strong>Stock Status:</strong> {product?.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                      </li>
                      {product?.average_rating && (
                        <li 
                          className="text-gray-700"
                          style={{
                            fontSize: '14px',
                            lineHeight: '20px'
                          }}
                        >
                          <strong>Rating:</strong> {product.average_rating}/5 ({product.rating_count} reviews)
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div>
                    <p className="text-gray-700 text-sm">
                      Product material and care information will be displayed here.
                      This information is typically provided by the manufacturer.
                    </p>
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
