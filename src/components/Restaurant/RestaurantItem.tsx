import type { RestaurantSummaryDto } from "@/interfaces/Restaurant/RestaurantSummaryDto";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import "@/styles/RestaurantItem.css"

interface Props {
    restaurant: RestaurantSummaryDto;
}

export const RestaurantItem: React.FC<Props> = ({ restaurant }) => {
    const navigate = useNavigate();

    return (

        <div>
            <Card
                className="w-[300px] cursor-pointer hover:shadow-md transition text-white bg-[#ff6600]"
                onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
                <div  className="restauratItemCard-content">
                    {restaurant.name}
                </div>
                <img
                src={restaurant.imageUrl || "https://cdn.clarosports.com/clarosports/2023/10/Sin-titulo-2023-10-05T165044.275.jpg"} // usa `restaurant.imageUrl` si existe
                />
                <CardContent className="restauratItemCard-content">
                    <p className="text-sm text-black">
                    {restaurant.category.replace("_", " ")} – {restaurant.totalReviews} reviews
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};