import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantName from '../components/Restaurant/RestaurantName';
import ImageCarousel from '../components/Restaurant/ImageCarousel';
import CommentCard from '../components/Restaurant/CommentCard';
import RatingSection from '../components/Restaurant/RatingSection';
import MenuItemCard from '../components/Restaurant/MenuItemCard';
import '../styles/RestaurantDetailPage.css';
import '../styles/RestaurantName.css';
import '../styles/ImageCarousel.css';
import '../styles/CommentCard.css';
import '../styles/RatingSection.css';
import '../styles/MenuItemCard.css';
import '../styles/Navbar.css';
import '../styles/Footer.css';
import Footer from '../components/Home/Footer';
import type { RestaurantResponseDto } from '@/interfaces/Restaurant/RestaurantResponseDto';
import type { CommentResponseDto } from '@/interfaces/Comment/CommentResponseDto';
import type { MenuResponseDto } from '@/interfaces/Menu/MenuResponseDto';
import type { DishSummaryDto } from '@/interfaces/Dish/DishSummaryDto';
import type { ReviewResponseDto } from '@/interfaces/Review/ReviewResponseDto';
import type { DishCategory } from '@/interfaces/Dish/DishCategory';

// Importa tus servicios de API (ajusta las rutas si es necesario)
import { getRestaurantById } from '@/services/Restaurant/getRestaurantById';
import { getRestaurantMenu } from '@/services/Restaurant/getRestaurantMenu';
import { getRestaurantComments } from '@/services/Restaurant/getRestaurantComments';
import { getRestaurantReviews } from '@/services/Restaurant/getRestaurantReviews';
import { getMe } from '@/services/User/getMe';
import { getDishCategories } from '@/services/Dish/getDishCategories';

interface RestaurantPageData {
  restaurant: RestaurantResponseDto;
  images: string[];
  comments: CommentResponseDto[];
  menu: MenuResponseDto;
  dishes: DishSummaryDto[];
  reviews: ReviewResponseDto[];
}

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurantId = id ? parseInt(id, 10) : null;

  const [restaurantData, setRestaurantData] = useState<RestaurantPageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDishCategory, setCurrentDishCategory] = useState<DishCategory | "Todas las categorías">("Todas las categorías");
  const [availableDishCategories, setAvailableDishCategories] = useState<DishCategory[]>([]);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [showEditMenuCard, setShowEditMenuCard] = useState<boolean>(false);

const loadRestaurantData = useCallback(async () => {
  if (restaurantId === null || isNaN(restaurantId)) {
    setError("ID de restaurante inválido.");
    setLoading(false);
    return;
  }

  setLoading(true);
  setError(null);
  try {
    const [
      restaurantDetails,
      restaurantComments,
      restaurantMenu,
      restaurantReviews,
      dishCategories,
      userData
    ] = await Promise.all([
      getRestaurantById(restaurantId),
      getRestaurantComments(restaurantId, 0, 10),
      getRestaurantMenu(restaurantId),
      getRestaurantReviews(restaurantId, 0, 10),
      getDishCategories(),
      getMe()
    ]);

    const images = restaurantDetails.imageUrl
      ? [restaurantDetails.imageUrl]
      : ['https://cdn.clarosports.com/clarosports/2023/10/Sin-titulo-2023-10-05T165044.275.jpg'];

    const dishes = restaurantMenu.dishes || [];

    setRestaurantData({
      restaurant: restaurantDetails,
      images,
      comments: restaurantComments.content || [],
      menu: restaurantMenu,
      dishes,
      reviews: restaurantReviews.content || [],
    });

    setAvailableDishCategories(dishCategories);
    setIsOwner(userData.id === restaurantDetails.ownerId);

  } catch (err) {
    console.error("Error fetching restaurant data:", err);
    setError((err instanceof Error ? err.message : "No se pudo cargar la información del restaurante. Por favor, inténtalo de nuevo más tarde."));
  } finally {
    setLoading(false);
  }
}, [restaurantId]);

  useEffect(() => {
    loadRestaurantData();
  }, [loadRestaurantData]);

  if (loading) {
    return <div className="loading-state">Cargando información del restaurante...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  if (!restaurantData) {
    return <div className="no-data-state">No se encontró información del restaurante.</div>;
  }

  // Calcular promedio de rating
  const totalRating = restaurantData.reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = restaurantData.reviews.length > 0 ? totalRating / restaurantData.reviews.length : 0;

  // Filtrar platillos por categoría
  const filteredDishes = currentDishCategory === "Todas las categorías"
    ? restaurantData.dishes
    : restaurantData.dishes.filter(dish => dish.category === currentDishCategory);

  return (
    <div className="restaurant-page-container">
        <div className="restaurant-name-overlay">
          <RestaurantName name={restaurantData.restaurant.name} />
        </div>
        <ImageCarousel images={restaurantData.images} />

      <div className="content-section">
        <div className="comments-ratings-section">
          {/* Comments Section */}
          <div className="comments-block">
            <h2 className="section-title">Comentarios</h2>
            <div className="comments-list">
              {restaurantData.comments.length > 0 ? (
                restaurantData.comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))
              ) : (
                <p className="no-data-message">No hay comentarios aún.</p>
              )}
            </div>
          </div>
          {/* Rating Section */}
          <div className="rating-block">
            <RatingSection averageRating={averageRating} />
          </div>
        </div>

        <h2 className="menu-title">Menu</h2>

        {/* Dynamic Dish Category Filter Buttons */}
        <div className="category-filter-wrapper">
          <button
            className={`category-button ${currentDishCategory === 'Todas las categorías' ? 'active' : ''}`}
            onClick={() => setCurrentDishCategory('Todas las categorías')}
          >
            Todas las categorías
          </button>
          {availableDishCategories.map(category => (
            <button
              key={category}
              className={`category-button ${currentDishCategory === category ? 'active' : ''}`}
              onClick={() => setCurrentDishCategory(category)}
            >
              {category.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="menu-items-grid">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <MenuItemCard key={dish.id} dish={dish} />
            ))
          ) : (
            <p className="no-data-message">No hay platillos en esta categoría.</p>
          )}
        </div>
        {isOwner && (
          <div className="edit-menu-section">
            <button
              className="edit-menu-button"
              onClick={() => setShowEditMenuCard(prev => !prev)}
            >
              {showEditMenuCard ? "Cerrar Edición de Menú" : "Editar Menú"}
            </button>

            {showEditMenuCard && (
              <div className="edit-menu-card">
                {/* Aquí irá tu componente embebido de edición */}
                <p>Aquí puedes editar el menú del restaurante.</p>
                {/* Puedes reemplazar esto con tu propio componente */}
              </div>
            )}
          </div>)}
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;