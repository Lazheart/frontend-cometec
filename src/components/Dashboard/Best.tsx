import React, { useEffect, useState } from "react";
import { getTopRestaurants } from "@/services/Restaurant/getTopRestaurants";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";

const categoryTitles: Record<string, string> = {
  ITALIAN: "Italiana",
  MEXICAN: "Mexicana",
  CHINESE: "China",
  JAPANESE: "Japonesa",
  AMERICAN: "Americana",
  INDIAN: "Hindú",
  THAI: "Tailandesa",
  MEDITERRANEAN: "Mediterranea",
  FAST_FOOD: "Comida Rápida",
  SEAFOOD: "Mariscos",
  STEAKHOUSE: "Parrilla",
  VEGETARIAN: "Vegetariana",
  VEGAN: "Vegana",
  BAKERY: "Panadería",
  CAFE: "Cafetería",
  BAR: "Bar",
  PUB: "Pub",
  FINE_DINING: "Alta Cocina",
  CASUAL_DINING: "Casual Dining",
  FOOD_TRUCK: "Food Truck",
  OTHER: "Otro",
};

const Best: React.FC = () => {
  const [restaurants, setRestaurants] = useState<RestaurantSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTopRestaurants()
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Hubo un problema. Intenta más tarde.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando mejores restaurantes...</div>;
  if (error) return <div className="text-red-500 font-semibold">{error}</div>;
  if (!restaurants || restaurants.length === 0) {
    return <div className="text-gray-500 font-semibold">No hay mejores restaurantes disponibles.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#ff6600]">Best Restaurants</h2>
      <div className="flex gap-6 flex-wrap">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-md p-4 w-72 flex flex-col items-center">
            <img
              src={restaurant.imageUrl || "https://cdn.clarosports.com/clarosports/2023/10/Sin-titulo-2023-10-05T165044.275.jpg"}
              alt={restaurant.name}
              className="w-48 h-32 object-cover rounded-md mb-2"
            />
            <div className="font-semibold text-lg text-[#ff6600]">{restaurant.name}</div>
            <div className="text-sm text-gray-600">{categoryTitles[restaurant.category] || restaurant.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Best;
