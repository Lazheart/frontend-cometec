import { useEffect, useState } from "react";
import { getRestaurantsByCategory } from "@/services/Restaurant/getRestaurantsByCategory";
import type { RestaurantCategory } from "@/interfaces/Restaurant/RestaurantCategory";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
import { RestaurantItem } from "./RestaurantItem";
import { Card, CardContent , CardHeader, CardTitle } from "@/components/ui/card";
import '@/styles/RestaurantItem.css'


interface Props {
  category: RestaurantCategory;
  title: string;
  showMoreLink?: string;
}

export const RestaurantListGroup: React.FC<Props> = ({
  category,
  title,
  showMoreLink,
}) => {
  const [restaurants, setRestaurants] = useState<RestaurantSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRestaurantsByCategory(category, 0, 4) // Mostrar solo los primeros 4
      .then((data) => setRestaurants(data.content))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) {
    return (
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <div className="listcard-outer-container">
      <Card className="listcard-main-card">
        {/* Encabezado */}
        <CardHeader className="flex justify-between items-center px-6">
          <CardTitle className="listCard-content ">{title}</CardTitle>

          {showMoreLink && (
            <a href={showMoreLink}  className="inline-block bg-[#ff6600] !text-white text-sm px-4 py-2 rounded-md hover:bg-[#e65c00] transition whitespace-nowrap">
              Ver más
            </a>
          )}
        </CardHeader>
        {/* Contenido horizontal */}
        <CardContent className="flex gap-4 overflow-x-auto py-4">
          {restaurants.map((restaurant) => (
            <RestaurantItem key={restaurant.id} restaurant={restaurant} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
