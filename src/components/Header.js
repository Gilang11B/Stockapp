import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onOpenAddItemModal, onOpenUpdateStockModal }) => {
    return (
        <header style={headerStyle}>
            <h1 style={{ textAlign: 'center' }}>WAREHOUSE EMPTY BAG STOCK</h1>
            <nav style={navStyle}>
                <button onClick={onOpenAddItemModal} style={headerButtonStyle}>
                    Tambah Item
                </button>
                <button onClick={onOpenUpdateStockModal} style={headerButtonStyle}>
                    Kurangi Stok
                </button>
            </nav>
        </header>
    );
};

// Styling untuk header
const headerStyle = {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
};

const linkStyle = {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#007bff',
};

const headerButtonStyle = {
    margin: '0 10px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
};

export default Header;
