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
    return {
      success: true,
      data: transformProduct(response.data)
    };
  } catch (error) {
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
