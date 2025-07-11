import React from "react";
import type { DishSummaryDto } from "@/interfaces/Dish/DishSummaryDto";

interface Props {
  dishes: DishSummaryDto[];
}

const EditMenuCard: React.FC<Props> = ({ dishes }) => {
  return (
    <div className="edit-card">
      <h3>Editar carta</h3>
      {dishes.length === 0 ? (
        <p>No hay platillos aún.</p>
      ) : (
        dishes.map((dish) => (
          <div key={dish.id} className="dish-item">
            <strong>{dish.name}</strong> - S/.{dish.price.toFixed(2)}
          </div>
        ))
      )}
      <button>+ Agregar nuevo platillo</button>
    </div>
  );
};

export default EditMenuCard;