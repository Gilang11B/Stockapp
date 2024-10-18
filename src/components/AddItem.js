import React, { useState } from 'react';

const AddItem = ({ onAddItem }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem({ name, quantity });
        setName('');
        setQuantity(0);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Tambah Item</h2>
            <label>
                Nama Item:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Jumlah:
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="0"
                    required
                />
            </label>
            <button type="submit">Tambah Item</button>
        </form>
    );
};

export default AddItem;
