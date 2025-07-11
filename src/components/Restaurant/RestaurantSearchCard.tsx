import React from "react";
import type { RestaurantSearchResult } from "@/services/Restaurant/searchRestaurant";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  restaurant: RestaurantSearchResult;
}

const RestaurantSearchCard: React.FC<Props> = ({ restaurant }) => {
  return (
    <Card className="w-[300px] cursor-pointer hover:shadow-md transition text-white bg-[#ff6600]">
      <CardContent className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-bold">{restaurant.name}</h2>
        <p className="text-sm text-black">Categoría: {restaurant.category.replace("_", " ")}</p>
        <p className="text-sm text-black">Reseñas: {restaurant.reviews.length}</p>
      </CardContent>
    </Card>
  );
};

export default RestaurantSearchCard;

