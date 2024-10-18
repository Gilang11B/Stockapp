import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Cari item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;
