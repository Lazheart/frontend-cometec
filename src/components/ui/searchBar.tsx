import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../../styles/Navbar.css';

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
            type="text"
            placeholder="Buscar..."
            className="search-input"
        />
        </div>
    );
};

export default SearchBar;
