import { useEffect, useState } from "react";
import "@/styles/Favorite.css";
// import { RestaurantItem } from "@/components/Restaurant/RestaurantItem";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
// Simulación: reemplaza esto por tu servicio real de favoritos
const getFavoriteRestaurants = async (): Promise<RestaurantSummaryDto[]> => {
  // Aquí deberías llamar a tu API real
  return [];
};

const Favorite: React.FC = () => {
  const [favorites, setFavorites] = useState<RestaurantSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getFavoriteRestaurants()
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Hubo un problema al cargar tus favoritos.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando favoritos...</div>;
  if (error) return <div className="text-red-500 font-semibold">{error}</div>;
  if (!favorites || favorites.length === 0) {
    return <div className="text-gray-500 font-semibold">No tienes restaurantes favoritos.</div>;
  }

  return (
    <div className="favorite-section mb-12">
      <h2 className="favorite-title text-2xl font-bold mb-4 text-white text-left pl-2">Tus Favoritos</h2>
      <div className="favorite-cards-row flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-[#ff6600]/60 pl-2">
        {favorites.map((restaurant) => (
          <div
            key={restaurant.id}
            className="favorite-card min-w-[270px] max-w-[300px] bg-white rounded-2xl shadow-lg flex flex-col items-center p-4 transition hover:scale-105 cursor-pointer"
            onClick={() => window.location.href = `/restaurants/${restaurant.id}`}
            style={{ boxShadow: '0 4px 16px 0 #ffecd2' }}
          >
            <img
              src={restaurant.imageUrl || "https://cdn.clarosports.com/clarosports/2023/10/Sin-titulo-2023-10-05T165044.275.jpg"}
              alt={restaurant.name}
              className="favorite-card-img w-48 h-32 object-cover rounded-xl mb-3"
            />
            <div className="favorite-card-name font-bold text-lg text-black mb-1 w-full text-left">{restaurant.name}</div>
            <div className="favorite-card-category text-sm text-gray-600 w-full text-left mb-1">{restaurant.category.replace("_", " ")}</div>
            <div className="favorite-card-reviews text-xs text-gray-500 w-full text-left">{restaurant.totalReviews} reviews</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
