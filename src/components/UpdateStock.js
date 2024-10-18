import React, { useState } from 'react';

const UpdateStock = ({ items, onUpdateItem }) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [quantityToRemove, setQuantityToRemove] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        const itemIndex = items.findIndex(item => item.name === selectedItem);
        if (itemIndex >= 0) {
            const updatedItem = {
                ...items[itemIndex],
                quantity: items[itemIndex].quantity - quantityToRemove,
            };
            onUpdateItem(itemIndex, updatedItem);
            setSelectedItem('');
            setQuantityToRemove(0);
        }
    };

    return (
        <div className="update-stock">
            <h2>Pengurangan Stok</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="item">Pilih Barang:</label>
                    <select
                        id="item"
                        value={selectedItem}
                        onChange={(e) => setSelectedItem(e.target.value)}
                        required
                    >
                        <option value="" disabled>Pilih barang...</option>
                        {items.map((item, index) => (
                            <option key={index} value={item.name}>
                                {item.name} - Kuantitas: {item.quantity} {item.unit}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Jumlah Pengurangan:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantityToRemove}
                        onChange={(e) => setQuantityToRemove(Number(e.target.value))}
                        min="1"
                        max={items.find(item => item.name === selectedItem)?.quantity}
                        required
                    />
                </div>
                <button type="submit">Kurangi Stok</button>
            </form>
        </div>
    );
};

export default UpdateStock;
