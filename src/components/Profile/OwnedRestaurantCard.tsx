import { useState, useEffect } from "react";
import { RestaurantItem } from "@/components/Restaurant/RestaurantItem";
import { RegisterRestaurantCard } from "@/components/Restaurant/RegisterRestaurantCard"; // importa aquí
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
import Api from "@/services/api";
import "@/styles/OwnerRestaurantCard.css";

const fetchOwnedRestaurants = async (): Promise<RestaurantSummaryDto[]> => {
  const res = await Api.get<{ content: RestaurantSummaryDto[] }>("/user/owned-restaurants");
  return res.data.content || [];
};

const OwnedRestaurantCard = () => {
  const [restaurants, setRestaurants] = useState<RestaurantSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRegisterCard, setShowRegisterCard] = useState(false); // NUEVO

  useEffect(() => {
    fetchOwnedRestaurants()
      .then(setRestaurants)
      .catch(() => setError("No se pudo cargar tus restaurantes."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="owner-restaurants-loading">Cargando...</div>;
  if (error) return <div className="owner-restaurants-error">No se pudo cargar tus restaurantes</div>;

  return (
    <div className="owner-restaurants-container w-full flex flex-col items-center">
      <div className="flex flex-row items-center justify-center w-full mb-8 gap-8">
        <button
          className="bg-[#ff6600] text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow hover:bg-orange-700 transition"
          title="Agregar restaurante"
          onClick={() => setShowRegisterCard(true)}
        >
          +
        </button>
        {showRegisterCard && (
          <RegisterRestaurantCard onClose={() => setShowRegisterCard(false)} />
        )}
      </div>
      {/* Lista de restaurantes del usuario */}
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {restaurants.length === 0 && !loading && <p>No tienes restaurantes registrados.</p>}
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {/* ...paginación o carga infinita si aplica... */}
    </div>
  );
};

export default OwnedRestaurantCard;
