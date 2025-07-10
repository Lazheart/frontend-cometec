import { useEffect, useRef, useState, useCallback } from "react";
import type { RestaurantCategory } from "@/interfaces/Restaurant/RestaurantCategory";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
import { getRestaurantsByCategory } from "@/services/Restaurant/getRestaurantsByCategory";
import { RestaurantItem } from "@/components/Restaurant/RestaurantItem";

interface Props {
  category: RestaurantCategory;
  title: string;
}

export const CategoryListInfinite: React.FC<Props> = ({ category, title }) => {
  const [restaurants, setRestaurants] = useState<RestaurantSummaryDto[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const fetchRestaurants = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getRestaurantsByCategory(category, page);
      setRestaurants((prev) => [...prev, ...data.content]);
      setHasMore(!data.last);
      setLoading(false);
    } catch (e) {
        console.error("Error fetching restaurants:", e);
      setError("Hubo un error al cargar los restaurantes. Intenta más tarde.");
      setLoading(false);
    }
  }, [category, page, loading, hasMore]);

  useEffect(() => {
    setRestaurants([]);
    setPage(1);
    setHasMore(true);
  }, [category]);

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
  }, [page, category]);

  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
  }, [loading, hasMore]);

  return (
    <section className="mb-10">
      <h3 className="text-xl font-bold mb-3 text-[#ff6600]">{title}</h3>
      <div className="flex gap-4 flex-wrap">
        {restaurants.map((r, idx) => (
          <div
            key={r.id}
            ref={idx === restaurants.length - 1 ? lastElementRef : undefined}
          >
            <RestaurantItem restaurant={r} />
          </div>
        ))}
      </div>
      {loading && <div>Cargando más restaurantes...</div>}
      {error && <div className="text-red-500 font-semibold">{error}</div>}
      {!loading && !hasMore && restaurants.length === 0 && (
        <div className="text-gray-500 font-semibold">No hay restaurantes en esta categoría.</div>
      )}
    </section>
  );
};
