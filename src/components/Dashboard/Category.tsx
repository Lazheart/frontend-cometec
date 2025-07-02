import { useEffect, useState } from "react";
import "@/styles/Category.css";
// import { RestaurantItem } from "@/components/Restaurant/RestaurantItem";
import type { RestaurantCategory } from "@/interfaces/Restaurant/RestaurantCategory";
import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
import { getRestaurantsByCategory } from "@/services/Restaurant/getRestaurantsByCategory";

interface Props {
  category: RestaurantCategory;
  title: string;
}

const Category: React.FC<Props> = ({ category, title }) => {
  const [restaurants, setRestaurants] = useState<RestaurantSummaryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRestaurantsByCategory(category, 0, 10)
      .then((data) => {
        setRestaurants(data.content);
        setLoading(false);
      })
      .catch(() => {
        setError("Hubo un problema al cargar la categoría.");
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div>Cargando {title}...</div>;
  if (error) return <div className="text-red-500 font-semibold">{error}</div>;
  if (!restaurants || restaurants.length === 0) {
    return <div className="text-gray-500 font-semibold">No hay restaurantes en esta categoría.</div>;
  }

  return (
    <section className="category-section">
      <h2 className="category-title">{title}</h2>
      <div className="category-cards-row">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="category-card"
            onClick={() => window.location.href = `/restaurants/${restaurant.id}`}
          >
            <img
              src={restaurant.imageUrl || "https://cdn.clarosports.com/clarosports/2023/10/Sin-titulo-2023-10-05T165044.275.jpg"}
              alt={restaurant.name}
              className="category-card-img"
            />
            <div className="category-card-name">{restaurant.name}</div>
            <div className="category-card-category">{restaurant.category.replace("_", " ")}</div>
            <div className="category-card-reviews">{restaurant.totalReviews} reviews</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
