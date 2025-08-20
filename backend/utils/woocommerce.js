console.log('=== WOOCOMMERCE UTILS LOADED ===');

const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

// Initialize WooCommerce API
const WooCommerce = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: 'wc/v3'
});

// Transform WooCommerce product data to match frontend expectations
const transformProduct = (wcProduct) => {
  return {
    id: wcProduct.id,
    name: wcProduct.name,
    description: wcProduct.description,
    shortDescription: wcProduct.short_description,
    price: wcProduct.price,
    regularPrice: wcProduct.regular_price,
    salePrice: wcProduct.sale_price,
    onSale: wcProduct.on_sale,
    images: wcProduct.images?.map(img => ({
      id: img.id,
      src: img.src,
      alt: img.alt,
      name: img.name
    })) || [],
    categories: wcProduct.categories?.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug
    })) || [],
    stockStatus: wcProduct.stock_status,
    stockQuantity: wcProduct.stock_quantity,
    weight: wcProduct.weight,
    dimensions: {
      length: wcProduct.dimensions?.length,
      width: wcProduct.dimensions?.width,
      height: wcProduct.dimensions?.height
    },
    attributes: wcProduct.attributes?.map(attr => ({
      id: attr.id,
      name: attr.name,
      options: attr.options
    })) || [],
    variations: wcProduct.variations || [],
    type: wcProduct.type,
    slug: wcProduct.slug,
    dateCreated: wcProduct.date_created,
    dateModified: wcProduct.date_modified
  };
};

// Transform WooCommerce category data
const transformCategory = (wcCategory) => {
  return {
    id: wcCategory.id,
    name: wcCategory.name,
    slug: wcCategory.slug,
    description: wcCategory.description,
    count: wcCategory.count,
    image: wcCategory.image ? {
      id: wcCategory.image.id,
      src: wcCategory.image.src,
      alt: wcCategory.image.alt
    } : null,
    parent: wcCategory.parent
  };
};

// Get products with transformation
const getProducts = async (params = {}) => {
  try {
    const response = await WooCommerce.get('products', params);
    return {
      success: true,
      data: response.data.map(transformProduct),
      total: parseInt(response.headers['x-wp-total'] || 0),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || 0)
    };
  } catch (error) {
    throw error;
  }
};

// Get single product with transformation
const getProduct = async (id) => {
  try {
    const response = await WooCommerce.get(`products/${id}`);
    const product = response.data;
    
    console.log(`Product ${id} type:`, product.type);
    console.log(`Product ${id} variations count:`, product.variations?.length);
    
    // Fetch variations if this is a variable product
    let variations = [];
    if (product.type === 'variable' && product.variations && product.variations.length > 0) {
      try {
        console.log(`Fetching variations for product ${id}...`);
        const variationsResponse = await WooCommerce.get(`products/${id}/variations`);
        console.log(`Variations response:`, variationsResponse.data.length, 'variations found');
        
        variations = variationsResponse.data.map(variation => {
          console.log(`Variation ${variation.id}:`, {
            attributes: variation.attributes,
            images: variation.images?.length || 0,
            price: variation.price
          });
          
          return {
            id: variation.id,
            attributes: variation.attributes?.map(attr => ({
              name: attr.name,
              option: attr.option
            })) || [],
            price: variation.price,
            regular_price: variation.regular_price,
            sale_price: variation.sale_price,
            stock_status: variation.stock_status,
            images: variation.images?.map(img => ({
              id: img.id,
              src: img.src,
              alt: img.alt,
              name: img.name
            })) || []
          };
        });
        
        console.log(`Processed ${variations.length} variations`);
      } catch (variationError) {
        console.error(`Failed to fetch variations for product ${id}:`, variationError.message);
        console.error('Variation error details:', variationError);
      }
    } else {
      console.log(`Product ${id} is not variable or has no variations`);
    }
    
    // Manually construct the product response to avoid overriding variations
    const transformedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      short_description: product.short_description,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      images: product.images?.map(img => ({
        id: img.id,
        src: img.src,
        alt: img.alt,
        name: img.name
      })) || [],
      categories: product.categories?.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug
      })) || [],
      stock_status: product.stock_status,
      stock_quantity: product.stock_quantity,
      weight: product.weight,
      dimensions: {
        length: product.dimensions?.length,
        width: product.dimensions?.width,
        height: product.dimensions?.height
      },
      attributes: product.attributes?.map(attr => ({
        id: attr.id,
        name: attr.name,
        options: attr.options
      })) || [],
      variations: variations, // Use our custom variations array
      type: product.type,
      slug: product.slug,
      date_created: product.date_created,
      date_modified: product.date_modified,
      average_rating: product.average_rating,
      rating_count: product.rating_count
    };
    
    console.log(`Final product has ${transformedProduct.variations.length} variations`);
    
    return {
      success: true,
      data: transformedProduct
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error.message);
    throw error;
  }
};

// Get categories with transformation
const getCategories = async (params = {}) => {
  try {
    const response = await WooCommerce.get('products/categories', params);
    return {
      success: true,
      data: response.data.map(transformCategory)
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  WooCommerce,
  transformProduct,
  transformCategory,
  getProducts,
  getProduct,
  getCategories
};
