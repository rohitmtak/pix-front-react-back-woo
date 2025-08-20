import { config } from '@/config/env';

// Use relative URL for API calls when using Vite proxy
const API_BASE_URL = import.meta.env.DEV ? '/api' : config.api.baseUrl;

export interface Product {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  stock_status: string;
  average_rating: string;
  rating_count: number;
  variations?: Array<{
    id: number;
    attributes: Array<{
      name: string;
      option: string;
    }>;
    price: string;
    regular_price: string;
    sale_price: string;
    stock_status: string;
    images: Array<{
      id: number;
      src: string;
      alt: string;
      name: string;
    }>;
  }>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image?: {
    src: string;
    alt: string;
  };
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
}

// Generic API call function with CORS handling
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      method: options?.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers,
      },
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'include', // Include credentials for CORS
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    
    // If it's a CORS error, provide a helpful message
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('CORS error: Unable to connect to the API. Please check if the backend server is running and CORS is properly configured.');
    }
    
    throw error;
  }
}

// Products API
export const productsApi = {
  // Get all products with pagination and filters
  getProducts: async (params?: {
    page?: number;
    per_page?: number;
    category?: number;
    search?: string;
  }): Promise<ProductsResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.category) searchParams.append('category', params.category.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    const queryString = searchParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<ProductsResponse>(endpoint);
  },

  // Get single product by ID
  getProduct: async (id: number): Promise<ProductResponse> => {
    return apiCall<ProductResponse>(`/products/${id}`);
  },
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getCategories: async (): Promise<CategoriesResponse> => {
    return apiCall<CategoriesResponse>('/categories');
  },

  // Get products by category ID
  getProductsByCategory: async (
    categoryId: number,
    params?: {
      page?: number;
      per_page?: number;
    }
  ): Promise<ProductsResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    
    const queryString = searchParams.toString();
    const endpoint = `/categories/${categoryId}/products${queryString ? `?${queryString}` : ''}`;
    
    return apiCall<ProductsResponse>(endpoint);
  },
};

// Health check
export const healthCheck = async (): Promise<{ status: string; message: string }> => {
  return apiCall<{ status: string; message: string }>('/health');
};
