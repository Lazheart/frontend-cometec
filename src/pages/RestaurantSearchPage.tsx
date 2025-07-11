import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Restaurant {
  id: number;
  name: string;
  location?: string;
  category?: string;
  imageUrl?: string;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const categories = [
  { value: '', label: 'Todas' },
  { value: 'Italiana', label: 'Italiana' },
  { value: 'Mexicana', label: 'Mexicana' },
  { value: 'Japonesa', label: 'Japonesa' },
  { value: 'Vegana', label: 'Vegana' },
  // Puedes reemplazar esto por una consulta real a /categories
];

const RestaurantSearchPage: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchName = query.get('name') || '';
  const searchCategory = query.get('category') || '';

  // Handlers para filtros
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setPage(0);
    navigate(`/restaurants/search?name=${encodeURIComponent(newName)}&category=${encodeURIComponent(searchCategory)}`);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setPage(0);
    navigate(`/restaurants/search?name=${encodeURIComponent(searchName)}&category=${encodeURIComponent(newCategory)}`);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      try {
        const params: Record<string, string | number> = { page, size };
        if (searchName) params.name = searchName;
        if (searchCategory) params.category = searchCategory;
        const response = await axios.get('/restaurants/search', { params });
        const data = response.data as Page<Restaurant>;
        setRestaurants(Array.isArray(data.content) ? data.content : []);
        setTotalPages(data.totalPages ?? 0);
        setTotalElements(data.totalElements ?? 0);
      } catch (e) {
        console.error('Error fetching restaurants:', e);
        setRestaurants([]);
        setTotalPages(0);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [searchName, searchCategory, page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    setPage(0);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2>Resultados de búsqueda</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nombre del restaurante"
          value={searchName}
          onChange={handleNameChange}
          style={{ flex: 2, padding: 8 }}
        />
        <select
          value={searchCategory}
          onChange={handleCategoryChange}
          style={{ flex: 1, padding: 8 }}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <select value={size} onChange={handleSizeChange} style={{ flex: 1, padding: 8 }}>
          {[5, 10, 20, 50].map(s => (
            <option key={s} value={s}>{s} por página</option>
          ))}
        </select>
      </div>
      {loading && <div>Cargando...</div>}
      {!loading && Array.isArray(restaurants) && restaurants.length === 0 && <div>No se encontraron restaurantes.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {Array.isArray(restaurants) && restaurants.map(r => (
          <div key={r.id ? `rest-${r.id}` : Math.random()} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, background: '#fff', boxShadow: '0 2px 8px #0001' }}>
            {r.imageUrl && <img src={r.imageUrl} alt={r.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 6, marginBottom: 8 }} />}
            <div style={{ fontWeight: 600, fontSize: 18 }}>{r.name}</div>
            <div style={{ fontSize: 14, color: '#888' }}>{r.location || ''}</div>
            <div style={{ fontSize: 13, color: '#aaa' }}>{r.category || ''}</div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 24, gap: 12 }}>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 0} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', background: page === 0 ? '#eee' : '#fff' }}>Anterior</button>
          <span>Página {page + 1} de {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page + 1 >= totalPages} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', background: (page + 1 >= totalPages) ? '#eee' : '#fff' }}>Siguiente</button>
        </div>
      )}
      <div style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
        Total de restaurantes: {totalElements}
      </div>
    </div>
  );
};

export default RestaurantSearchPage;
