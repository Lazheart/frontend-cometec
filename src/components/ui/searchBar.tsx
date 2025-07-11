import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../styles/Navbar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RestaurantSearchResult {
    id: number;
    name: string;
    location?: string;
}

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<RestaurantSearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim().length > 0) {
            try {
                const response = await axios.get(`/restaurants/search`, {
                    params: { name: value }
                });
                const data = Array.isArray(response.data) ? response.data : [];
                setResults(data);
                setShowResults(true);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setResults([]);
                setShowResults(false);
            }
        } else {
            setResults([]);
            setShowResults(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim().length > 0) {
            navigate(`/restaurants/search?name=${encodeURIComponent(query.trim())}`);
            setShowResults(false);
        }
    };

    return (
        <div className="search-bar" style={{ position: 'relative' }}>
            <FaSearch className="search-icon" />
            <input
                type="text"
                placeholder="Buscar..."
                className="search-input"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => query && setShowResults(true)}
            />
            {showResults && results.length > 0 && (
                <div className="search-results" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #eee',
                    zIndex: 10,
                    borderRadius: '0 0 8px 8px',
                    maxHeight: 250,
                    overflowY: 'auto',
                }}>
                    {results.map((restaurant, idx) => (
                        <div key={restaurant.id || idx} className="search-result-item" style={{ padding: 10, borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                            <span style={{ fontWeight: 500 }}>{restaurant.name}</span>
                            <br />
                            <span style={{ fontSize: 12, color: '#888' }}>{restaurant.location || ''}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
