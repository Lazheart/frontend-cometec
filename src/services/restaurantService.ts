import api from './api';
import type { RestaurantSummaryDto } from '../interfaces/Restaurant/RestaurantSummmaryDto';

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const restaurantService = {
  // Obtener restaurantes con paginación
  async getRestaurants(page: number = 1, pageSize: number = 10): Promise<RestaurantSummaryDto[]> {
    try {
      const response = await api.get<PaginatedResponse<RestaurantSummaryDto>>('/restaurants', {
        params: {
          page,
          pageSize,
        },
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw new Error('Error al cargar restaurantes');
    }
  },

  // Obtener restaurantes por ubicación
  async getRestaurantsByLocation(
    latitude: number, 
    longitude: number, 
    radius: number = 5000,
    page: number = 1, 
    pageSize: number = 10
  ): Promise<RestaurantSummaryDto[]> {
    try {
      const response = await api.get<PaginatedResponse<RestaurantSummaryDto>>('/restaurants/nearby', {
        params: {
          lat: latitude,
          lng: longitude,
          radius,
          page,
          pageSize,
        },
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
      throw new Error('Error al cargar restaurantes cercanos');
    }
  },

  // Buscar restaurantes por nombre
  async searchRestaurants(
    query: string,
    page: number = 1, 
    pageSize: number = 10
  ): Promise<RestaurantSummaryDto[]> {
    try {
      const response = await api.get<PaginatedResponse<RestaurantSummaryDto>>('/restaurants/search', {
        params: {
          q: query,
          page,
          pageSize,
        },
      });
      
      return response.data.data;
    } catch (error) {
      console.error('Error searching restaurants:', error);
      throw new Error('Error al buscar restaurantes');
    }
  },

  // Obtener restaurante por ID
  async getRestaurantById(id: number) {
    try {
      const response = await api.get(`/restaurants/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw new Error('Error al cargar el restaurante');
    }
  },
}; 