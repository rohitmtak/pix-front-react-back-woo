import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { productsApi, categoriesApi, Product, ProductsResponse } from '@/lib/api';

// Hook for fetching products with pagination
export const useProducts = (params?: {
  page?: number;
  per_page?: number;
  category?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for infinite scroll products
export const useInfiniteProducts = (params?: {
  per_page?: number;
  category?: number;
  search?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['infinite-products', params],
    queryFn: ({ pageParam = 1 }) =>
      productsApi.getProducts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage: ProductsResponse) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook for fetching a single product
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
};

// Hook for fetching products by category
export const useProductsByCategory = (
  categoryId: number,
  params?: {
    page?: number;
    per_page?: number;
  }
) => {
  return useQuery({
    queryKey: ['products-by-category', categoryId, params],
    queryFn: () => categoriesApi.getProductsByCategory(categoryId, params),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Hook for infinite scroll products by category
export const useInfiniteProductsByCategory = (
  categoryId: number,
  params?: {
    per_page?: number;
  }
) => {
  return useInfiniteQuery({
    queryKey: ['infinite-products-by-category', categoryId, params],
    queryFn: ({ pageParam = 1 }) =>
      categoriesApi.getProductsByCategory(categoryId, { ...params, page: pageParam }),
    getNextPageParam: (lastPage: ProductsResponse) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
