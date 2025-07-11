import { useState, useCallback } from 'react';

interface UsePaginationOptions<T> {
  initialPage?: number;
  pageSize?: number;
  onLoadMore: (page: number, pageSize: number) => Promise<T[]>;
}

interface UsePaginationReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  loadMore: () => Promise<void>;
  reset: () => void;
}

export const usePagination = <T>({
  initialPage = 1,
  pageSize = 10,
  onLoadMore,
}: UsePaginationOptions<T>): UsePaginationReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newData = await onLoadMore(currentPage, pageSize);
      
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newData]);
        setCurrentPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, currentPage, pageSize, onLoadMore]);

  const reset = useCallback(() => {
    setData([]);
    setLoading(false);
    setError(null);
    setHasMore(true);
    setCurrentPage(initialPage);
  }, [initialPage]);

  return {
    data,
    loading,
    error,
    hasMore,
    currentPage,
    loadMore,
    reset,
  };
}; 