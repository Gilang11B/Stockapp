import React, { useState } from 'react';

function StockForm({ onUpdateItem, onRemoveItem }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [action, setAction] = useState('add');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (action === 'add') {
            onUpdateItem(name, { name, quantity });
        } else if (action === 'remove') {
            onRemoveItem(name);
        }
        setName('');
        setQuantity(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Tambah atau Kurangi Stok Barang</h3>
            <input
                type="text"
                value={name}
                placeholder="Nama Barang"
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                value={quantity}
                placeholder="Jumlah"
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
            />
            <select value={action} onChange={(e) => setAction(e.target.value)}>
                <option value="add">Tambah</option>
                <option value="remove">Kurangi</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default StockForm;
