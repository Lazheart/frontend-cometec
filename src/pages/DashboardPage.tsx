import type { RestaurantCategory } from "@/interfaces/Restaurant/RestaurantCategory";
import React, { useEffect } from "react";
import { refreshCookieToken } from "@/utils/token";
import Best from "../components/Dashboard/Best";
import Favorite from "../components/Dashboard/Favorite";
import { CategoryListInfinite } from "../components/Dashboard/CategoryListInfinite";


const categoryTitles: Record<RestaurantCategory, string> = {
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

export const DashboardPage: React.FC = () => {
  useEffect(() => {
    refreshCookieToken(); // Refresca el token cada vez que se entra a Dashboard
  }, []);

  const categories = Object.entries(categoryTitles);

  return (
    <div className="dashboard-wrapper paddings flexCenter">
      <div className="dashboard-best-container flexCenter innerWidth mb-10">
        <Best />
      </div>
      <div className="dashboard-favorite-container flexStart innerWidth mb-10">
        <Favorite />
      </div>
      <div className="dashboard-categories-container flexColStart innerWidth">
        {categories.map(([catKey, catTitle]) => (
          <div key={catKey} className="dashboard-category-section w-full mb-8">
            <CategoryListInfinite category={catKey as RestaurantCategory} title={catTitle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
