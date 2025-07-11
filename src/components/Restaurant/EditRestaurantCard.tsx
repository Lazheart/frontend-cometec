import type { RestaurantResponseDto } from "@/interfaces/Restaurant/RestaurantResponseDto";
import type { RestaurantCategory } from "@/interfaces/Restaurant/RestaurantCategory";
import { useState } from "react";

interface Props {
  restaurant: RestaurantResponseDto;
  onSave: (updated: RestaurantResponseDto) => void;
}

const EditRestaurantCard: React.FC<Props> = ({ restaurant, onSave }) => {
  const [name, setName] = useState(restaurant.name);
  const [category, setCategory] = useState<RestaurantCategory>(restaurant.category);

  const handleSave = () => {
    const updatedRestaurant = { ...restaurant, name, category };
    onSave(updatedRestaurant);
  };

  // Utilidad para mostrar bonito el texto
  const formatCategory = (cat: RestaurantCategory): string =>
    cat
      .toLowerCase()
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="edit-card">
      <h3>Editar detalles del restaurante</h3>
      <label>Nombre</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>Categoría</label>
      <select value={category} onChange={(e) => setCategory(e.target.value as RestaurantCategory)}>
        {(Object.keys(Object()) as RestaurantCategory[]).map((cat) => (
          <option key={cat} value={cat}>
            {formatCategory(cat)}
          </option>
        ))}
      </select>

      <button onClick={handleSave}>Guardar cambios</button>
    </div>
  );
};
export default EditRestaurantCard;
