import type { RestaurantSummaryDto } from '../../interfaces/Restaurant/RestaurantSummmaryDto';

interface RestaurantCardProps {
  restaurant: RestaurantSummaryDto;
  onClick?: (restaurant: RestaurantSummaryDto) => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
  className = '',
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(restaurant);
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {restaurant.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-1">⭐</span>
            <span>{restaurant.totalReviews} reseñas</span>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Propietario:</span> {restaurant.ownerName}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Ubicación:</span> {restaurant.locationDto.address}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {restaurant.locationDto.city}, {restaurant.locationDto.country}
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Ver detalles →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard; 