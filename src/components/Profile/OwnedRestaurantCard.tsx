import { useEffect, useState } from "react";
import { RestaurantItem } from "@/components/Restaurant/RestaurantItem";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
import Api from "@/services/api";
import "@/styles/OwnerRestaurantCard.css";
import { useInView } from "@/hooks/useInView";

const PAGE_SIZE = 4;

const fetchOwnedRestaurants = async (): Promise<RestaurantSummaryDto[]> => {
  const res = await Api.get<{ content: RestaurantSummaryDto[] }>("/user/owned-restaurants");
  return res.data.content || [];
};

const OwnedRestaurantCard = () => {
  const [restaurants, setRestaurants] = useState<RestaurantSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const [ref, inView] = useInView<HTMLDivElement>();

  useEffect(() => {
    fetchOwnedRestaurants()
      .then(setRestaurants)
      .catch(() => setError("No se pudo cargar tus restaurantes."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="owner-restaurants-loading">Cargando...</div>;
  if (error) return <div className="owner-restaurants-error">No se pudo cargar tus restaurantes</div>;
  if (!restaurants.length) return (
    <div ref={ref} className={`owner-restaurants-empty${inView ? " animate" : ""}`}>
      <p className="owner-restaurants-question">¿Tienes un restaurante?</p>
      <button className="owner-restaurants-register-btn" onClick={() => window.location.href = '/register-restaurant'}>
        Regístrate ahora
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
    <section className="owner-restaurants-section">
      {rows.map((row, idx) => (
        <div key={idx} className="owner-restaurants-row">
          {row.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ))}
      {showCount < restaurants.length && (
        <button
          className="owner-restaurants-loadmore"
          onClick={() => setShowCount((c) => c + PAGE_SIZE)}
        >
          Cargar más
        </button>
      )}
    </section>
  );
};

export default OwnedRestaurantCard;