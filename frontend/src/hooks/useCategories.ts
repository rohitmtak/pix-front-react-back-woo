import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';

// Hook for fetching all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 20 * 60 * 1000, // 20 minutes
  });
};
