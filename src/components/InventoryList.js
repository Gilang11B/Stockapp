import React, { useState } from 'react';

const InventoryList = ({ items, onUpdateItem, onRemoveItem }) => {
    const [selectedItem, setSelectedItem] = useState(null);  // Menyimpan item yang akan di-update
    const [updatedName, setUpdatedName] = useState('');  // Menyimpan nama item yang baru
    const [updatedQuantity, setUpdatedQuantity] = useState(0);  // Menyimpan jumlah yang baru

    const handleEditClick = (item) => {
        setSelectedItem(item);  // Menyimpan item yang dipilih untuk di-update
        setUpdatedName(item.name);  // Set nilai awal dari nama
        setUpdatedQuantity(item.quantity);  // Set nilai awal dari jumlah
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        const updatedItem = { ...selectedItem, name: updatedName, quantity: updatedQuantity };
        const itemIndex = items.indexOf(selectedItem);
        onUpdateItem(itemIndex, updatedItem);  // Memperbarui item
        setSelectedItem(null);  // Mengosongkan form setelah update
    };

    // Fungsi untuk memformat angka dengan pemisah ribuan
    const formatQuantity = (quantity) => {
        return quantity.toLocaleString('id-ID'); // Format ke bahasa Indonesia
    };

    return (
        <div className="inventory-list">
            <h2>DAFTAR STOK</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Item</th>
                        <th>Jumlah</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan="3" style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
                                Maaf, stok saat ini sudah kosong. Silahkan di update untuk penyetokan kembali.
                            </td>
                        </tr>
                    ) : (
                        items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    {formatQuantity(item.quantity)} {item.unit || ''} {/* Menambahkan unit */}
                                </td>
                                <td>
                                    <button onClick={() => handleEditClick(item)} className="update-button">Update</button>
                                    <button onClick={() => onRemoveItem(index)} className="remove-button">Hapus</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {selectedItem && (
                <div className="modal">
                    <form onSubmit={handleUpdateSubmit}>
                        <h3>Update Item</h3>
                        <label>
                            Nama Item:
                            <input
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                        </label>
                        <label>
                            Jumlah:
                            <input
                                type="number"
                                value={updatedQuantity}
                                onChange={(e) => setUpdatedQuantity(Number(e.target.value))}
                            />
                        </label>
                        <button type="submit">Simpan Perubahan</button>
                        <button onClick={() => setSelectedItem(null)}>Batal</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default InventoryList;
