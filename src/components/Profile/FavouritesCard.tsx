import { useEffect, useState } from "react";
import { getFavouriteRestaurants } from "@/services/User/getFavouriteRestaurants";
import type { RestaurantResponseDto } from "@/interfaces/Restaurant/RestaurantResponseDto";
import "@/styles/FavouritesCard.css";
import { useInView } from "@/hooks/useInView";

const PAGE_SIZE = 4;

const FavouritesCard = () => {
  const [restaurants, setRestaurants] = useState<RestaurantResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [ref, inView] = useInView<HTMLDivElement>();

  useEffect(() => {
    getFavouriteRestaurants(0, 50)
      .then((res) => setRestaurants(res.content || []))
      .catch(() => setError("No se pudieron cargar tus restaurantes favoritos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="favourites-loading">Cargando...</div>;
  if (error) return <div className="favourites-error">No se pudieron cargar tus restaurantes favoritos</div>;
  if (!restaurants.length) return (
    <div ref={ref} className={`owner-restaurants-empty${inView ? " animate" : ""}`}>
      <p className="owner-restaurants-question">¿Aún no tienes favoritos?</p>
      <button className="owner-restaurants-register-btn" onClick={() => window.location.href = '/dashboard'}>
        Explora restaurantes
      </button>
    </div>
  );

  // Distribución 2x2
  const visibleRestaurants = restaurants.slice(0, showCount);
  const rows = [];
  for (let i = 0; i < visibleRestaurants.length; i += 2) {
    rows.push(visibleRestaurants.slice(i, i + 2));
  }

  return (
    <section className="favourites-section">
      {rows.map((row, idx) => (
        <div key={idx} className="favourites-row">
          {row.map((restaurant) => (
            <div key={restaurant.id} className="favourites-card favourites-card-animate" onClick={() => window.location.href = `/restaurant/${restaurant.id}` }>
              <div className="favourites-card-title">{restaurant.name}</div>
              <div className="favourites-card-category">{restaurant.category?.replace("_", " ")} – {restaurant.totalReviews} reviews</div>
              <div className="favourites-card-location">Ubicación: lat {restaurant.locationDto?.latitud}, lng {restaurant.locationDto?.longitud}</div>
            </div>
          ))}
        </div>
      ))}
      {showCount < restaurants.length && (
        <button
          className="favourites-loadmore"
          onClick={() => setShowCount((c) => c + PAGE_SIZE)}
        >
          Cargar más
        </button>
      )}
    </section>
  );
};

export default FavouritesCard;
