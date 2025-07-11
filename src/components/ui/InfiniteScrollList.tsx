import React from 'react';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import { usePagination } from '../../hooks/usePagination';

interface InfiniteScrollListProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => Promise<void>;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: string) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  className?: string;
  itemClassName?: string;
}

function InfiniteScrollList<T>({
  data,
  loading,
  error,
  hasMore,
  onLoadMore,
  renderItem,
  renderLoading,
  renderError,
  renderEmpty,
  className = '',
  itemClassName = '',
}: InfiniteScrollListProps<T>) {
  const { targetRef } = useInfiniteScroll(onLoadMore, {
    enabled: hasMore && !loading,
    rootMargin: '100px',
  });

  const defaultLoading = () => (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600">Cargando...</span>
    </div>
  );

  const defaultError = (error: string) => (
    <div className="text-center py-4 text-red-500">
      <p>Error: {error}</p>
      <button 
        onClick={onLoadMore}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reintentar
      </button>
    </div>
  );

  const defaultEmpty = () => (
    <div className="text-center py-8 text-gray-500">
      <p>No hay elementos para mostrar</p>
    </div>
  );

  if (error) {
    return renderError ? renderError(error) : defaultError(error);
  }

  if (data.length === 0 && !loading) {
    return renderEmpty ? renderEmpty() : defaultEmpty();
  }

  return (
    <div className={className}>
      {data.map((item, index) => (
        <div key={index} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      ))}
      
      {loading && (renderLoading ? renderLoading() : defaultLoading())}
      
      {hasMore && (
        <div ref={targetRef} className="h-4" />
      )}
    </div>
  );
}

export default InfiniteScrollList; 