import { useState, useEffect } from 'react';

interface Sale {
  id: number;
  name: string;
  price: number;
  delivery: number;
  TOTAL: number;
}

interface FormData {
  id: number | null;
  name: string;
  price: string;
  delivery: string;
}

const SalesManager: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [formData, setFormData] = useState<FormData>({ id: null, name: '', price: '', delivery: '' });
  const [error, setError] = useState<string | null>(null);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/sales');
      if (!res.ok) throw new Error('Failed to fetch sales');
      const rawData = await res.json();

      const data: Sale[] = rawData.map((item: any) => ({
        id: Number(item.id),
        name: item.name,
        price: Number(parseFloat(item.price)),
        delivery: Number(parseFloat(item.delivery)),
        TOTAL: Number(parseFloat(item.TOTAL)),
      }));

      const isValid = data.every(
        (sale) =>
          typeof sale.id === 'number' &&
          typeof sale.name === 'string' &&
          typeof sale.price === 'number' &&
          !isNaN(sale.price) &&
          typeof sale.delivery === 'number' &&
          !isNaN(sale.delivery) &&
          typeof sale.TOTAL === 'number' &&
          !isNaN(sale.TOTAL),
      );

      if (!isValid) throw new Error('Invalid sales data format');

      setSales(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, name, price, delivery } = formData;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/api/sales/${id}` : 'http://localhost:3000/api/sales';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price: parseFloat(price), delivery: parseFloat(delivery) }),
      });
      if (!res.ok) throw new Error(`Failed to ${id ? 'update' : 'create'} sale`);
      const data: Sale = await res.json();
      if (id) {
        setSales(sales.map(sale => (sale.id === id ? data : sale)));
      } else {
        setSales([...sales, data]);
      }
      setFormData({ id: null, name: '', price: '', delivery: '' });
      setSelectedSale(null);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/sales/${id}`, { 
        method: 'DELETE' 
    });
      if (!res.ok) throw new Error('Failed to delete sale');
      setSales(sales.filter(sale => sale.id !== id));
      setSelectedSale(null);
      setFormData({ id: null, name: '', price: '', delivery: '' });
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEdit = (sale: Sale) => {
    setSelectedSale(sale);
      setFormData({
        id: sale.id,
        name: sale.name,
        price: sale.price.toString(),
        delivery: sale.delivery.toString(),
      });
  };

  const handleResetForm = () => {
    setFormData({ id: null, name: '', price: '', delivery: '' });
    setSelectedSale(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-3xl font-bold mb-4 text-center">Inventory Manager</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-8 bg-gray-300 p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-2 border rounded"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Delivery</label>
          <input
            type="number"
            value={formData.delivery}
            onChange={e => setFormData({ ...formData, delivery: e.target.value })}
            className="w-full p-2 border rounded"
            step="0.01"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {formData.id ? 'Update Product' : 'Add Product'}
        </button>
        {formData.id && (
            <button
                onClick={() => handleResetForm()}
                className="bg-yellow-500 text-white ms-2 px-4 py-2 rounded hover:bg-yellow-600"
              >
                Reset
              </button>)
            }
      </form>

      {/* Sales List */}
      <div className="grid gap-4">
        {sales.map(sale => (
          <div key={sale.id} className="p-4 bg-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{sale.name}</h2>
            <p>Price: ${sale.price.toFixed(2)}</p>
            <p>Delivery: ${sale.delivery.toFixed(2)}</p>
            <p>Total: ${sale.TOTAL.toFixed(2)}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(sale)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(sale.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesManager;