import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  searchRestaurantsByName,
  searchRestaurantsByCategory,
  searchRestaurantsByNameAndCategory,
    type RestaurantSearchResult,
} from "@/services/Restaurant/searchRestaurant";
import RestaurantSearchCard from "@/components/Restaurant/RestaurantSearchCard";

const RestaurantSearchPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<RestaurantSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const name = searchParams.get("name") || "";
    const category = searchParams.get("category") || "";
    setLoading(true);
    setError(null);
    let fetchFn: Promise<RestaurantSearchResult[]>;
    if (name && category) {
      fetchFn = searchRestaurantsByNameAndCategory(name, category);
    } else if (name) {
      fetchFn = searchRestaurantsByName(name);
    } else if (category) {
      fetchFn = searchRestaurantsByCategory(category);
    } else {
      setResults([]);
      setLoading(false);
      return;
    }
    fetchFn
      .then((data) => {
        setResults(data);
      })
      .catch(() => setError("Error al buscar restaurantes"))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <div className="restaurant-search-page innerWidth flexCenter paddings flex-col">
      <h1 className="page-title">Resultados de Búsqueda</h1>
      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {results.length === 0 && !loading && <p>No se encontraron restaurantes.</p>}
        {results.map((restaurant) => (
          <RestaurantSearchCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantSearchPage;
