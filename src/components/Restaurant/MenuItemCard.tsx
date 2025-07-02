import React from 'react';
import type { DishSummaryDto } from '../../interfaces/Dish/DishSummaryDto';
import '../../styles/MenuItemCard.css';

interface MenuItemCardProps {
  dish: DishSummaryDto;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ dish }) => {
  // Use dish.imageUrl if available, otherwise use a placeholder
  return (
    <div className="menu-item-card">
      <img src={dish.name} className="menu-item-image" />

      <div className="menu-item-details">
        <h3 className="menu-item-name">{dish.name}</h3>
        <p className="menu-item-price">${dish.price.toFixed(2)}</p>
        <p className="menu-item-description">{dish.description}</p>
        <p className="menu-item-category">Category: {dish.category}</p>
      </div>
    </div>
  );
};

export default MenuItemCard;
