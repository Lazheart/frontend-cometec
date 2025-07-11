import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Restaurant {
  id: number;
  name: string;
  location?: string;
  category?: string;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

const categories = [
  { value: '', label: 'Todas' },
  { value: 'Italiana', label: 'Italiana' },
  { value: 'Mexicana', label: 'Mexicana' },
  { value: 'Japonesa', label: 'Japonesa' },
  { value: 'Vegana', label: 'Vegana' },
  // Puedes reemplazar esto por una consulta real a /categories
];

const SearchRestaurants: React.FC = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [data, setData] = useState<Page<Restaurant> | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number> = { page, size };
      if (name) params.name = name;
      if (category) params.category = category;
      const response = await axios.get('/restaurants/search', { params });
      const data = response.data as Page<Restaurant>;
      setData(data);
    } catch (e) {
      console.error('Error fetching restaurants:', e);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
  }, [name, category, page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(Number(e.target.value));
    setPage(0);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2>Búsqueda de Restaurantes</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nombre del restaurante"
          value={name}
          onChange={e => { setName(e.target.value); setPage(0); }}
          style={{ flex: 2, padding: 8 }}
        />
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setPage(0); }}
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
      {data && (
        <>
          <div>
            {data.content.length === 0 ? (
              <div>No se encontraron restaurantes.</div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {data.content.map(r => (
                  <li key={r.id} style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 8, padding: 12 }}>
                    <strong>{r.name}</strong>
                    <div style={{ fontSize: 13, color: '#888' }}>{r.location || ''}</div>
                    <div style={{ fontSize: 12, color: '#aaa' }}>{r.category || ''}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', background: page === 0 ? '#eee' : '#fff' }}
            >Anterior</button>
            <span>Página {data.number + 1} de {data.totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page + 1 >= data.totalPages}
              style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', background: (page + 1 >= data.totalPages) ? '#eee' : '#fff' }}
            >Siguiente</button>
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
            Total de restaurantes: {data.totalElements}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchRestaurants;
