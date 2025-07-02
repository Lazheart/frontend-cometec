import React from 'react';
import '../../styles/RestaurantName.css';

interface RestaurantNameProps {
  name: string;
}

const RestaurantName: React.FC<RestaurantNameProps> = ({ name }) => {
  return (
    <h1 className="restaurant-name-heading">
      {name}
    </h1>
  );
};

export default RestaurantName;
