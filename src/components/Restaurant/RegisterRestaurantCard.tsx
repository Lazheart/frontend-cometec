import { useState } from "react";
import { createRestaurant } from "@/services/Restaurant/createRestaurant";
import type { RestaurantCategory } from "@/interfaces/Restaurant/RestaurantCategory";
import "@/styles/RegisterRestaurantCard.css";

const categories: RestaurantCategory[] = [
  "ITALIAN", "MEXICAN", "CHINESE", "JAPANESE", "AMERICAN",
  "INDIAN", "THAI", "MEDITERRANEAN", "FAST_FOOD", "SEAFOOD",
  "STEAKHOUSE", "VEGETARIAN", "VEGAN", "BAKERY", "CAFE",
  "BAR", "PUB", "FINE_DINING", "CASUAL_DINING", "FOOD_TRUCK", "OTHER"
];

export const RegisterRestaurantCard = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<RestaurantCategory>("OTHER");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !latitude || !longitude) {
      alert("Completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      await createRestaurant({
        name,
        category,
        locationCreateDto: {
          latitud: parseFloat(latitude),
          longitud: parseFloat(longitude)
        }
      });
      alert("Restaurante registrado correctamente");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error al registrar el restaurante.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-restaurant-overlay">
      <div className="register-restaurant-card">
        <h2>Registrar Restaurante</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value as RestaurantCategory)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Latitud"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="number"
          placeholder="Longitud"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <div className="actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </div>
    </div>
  );
};
