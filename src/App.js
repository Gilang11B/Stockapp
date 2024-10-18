import React, { useState, useEffect } from 'react'; // Tambahkan useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import InventoryList from './components/InventoryList';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import AddItem from './components/AddItem';
import UpdateStock from './components/UpdateStock';
import Modal from './components/Modal';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { utils, writeFile } from 'xlsx'; // Tambahkan ini
import './App.css';

// Daftarkan elemen Chart.js
Chart.register(...registerables);

function App() {
  const [items, setItems] = useState([]);  // State untuk item
  const [searchTerm, setSearchTerm] = useState('');  // State untuk pencarian
  const [difference, setDifference] = useState(0);  // State untuk selisih stok
  const [isAddItemModalOpen, setAddItemModalOpen] = useState(false);  // Modal tambah item
  const [isUpdateStockModalOpen, setUpdateStockModalOpen] = useState(false);  // Modal update stok

  // Fungsi untuk menyimpan items ke local storage
  const saveItemsToLocalStorage = (items) => {
    localStorage.setItem('items', JSON.stringify(items));
  };

  // Fungsi untuk mengambil items dari local storage saat aplikasi dimuat
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems)); // Ambil data dari local storage
    }
  }, []); // Hanya dijalankan saat pertama kali aplikasi dimuat

  const handleAddItem = (item) => {
    const newItems = [...items, item];
    setItems(newItems);
    saveItemsToLocalStorage(newItems); // Simpan ke local storage
    setAddItemModalOpen(false);
  };

  const handleUpdateItem = (index, updatedItem) => {
    const newItems = [...items];
    const originalQuantity = newItems[index].quantity;
    newItems[index] = updatedItem;

    if (originalQuantity > updatedItem.quantity) {
      const diff = originalQuantity - updatedItem.quantity;
      setDifference((prevDifference) => prevDifference + diff);
    } else {
      setDifference((prevDifference) => prevDifference - (updatedItem.quantity - originalQuantity));
    }

    setItems(newItems);
    saveItemsToLocalStorage(newItems); // Simpan ke local storage
    setUpdateStockModalOpen(false);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    saveItemsToLocalStorage(newItems); // Simpan ke local storage
  };

  // Filter data untuk pencarian item
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Data untuk grafik Chart.js
  const chartData = {
    labels: filteredItems.map(item => item.name),
    datasets: [
      {
        label: 'Jumlah Stok',
        data: filteredItems.map(item => item.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };
  // Fungsi untuk mengekspor ke Excel
  const exportToExcel = () => {
    const ws = utils.json_to_sheet(items); // Ubah data items menjadi sheet Excel
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Daftar Stok");

    // Buat dan unduh file Excel
    writeFile(wb, "Laporan_Stok.xlsx");
  };

  return (
    <Router>
      <div className="container mt-5">
        <Header
          onOpenAddItemModal={() => setAddItemModalOpen(true)}
          onOpenUpdateStockModal={() => setUpdateStockModalOpen(true)}
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="inventory-container">
          <div className="inventory-list">
            <InventoryList
              items={filteredItems}
              onUpdateItem={handleUpdateItem}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div className="chart-container mt-5">
            <h3>Grafik Jumlah Stok</h3>
            <h4 style={{ textAlign: 'center', color: '#555' }}>Selisih Stok: {difference}</h4>
            <Bar data={chartData} />
          </div>
        </div>
        <Routes>
          <Route path="/add" element={<AddItem onAddItem={handleAddItem} />} />
          <Route path="/update" element={<UpdateStock items={items} onUpdateItem={handleUpdateItem} />} />
        </Routes>
        <Footer />

        {/* Modal untuk Tambah Item */}
        <Modal isOpen={isAddItemModalOpen} onClose={() => setAddItemModalOpen(false)}>
          <AddItem onAddItem={handleAddItem} />
        </Modal>

        {/* Modal untuk Kurangi Stok */}
        <Modal isOpen={isUpdateStockModalOpen} onClose={() => setUpdateStockModalOpen(false)}>
          <UpdateStock items={items} onUpdateItem={handleUpdateItem} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
