'use client';
// components/ShoppingHistory.tsx
import { useEffect, useState } from 'react';
import { Product, IShoppingHistory } from '../../services/types';
import { getShoppingHistory } from '../../services/superService';

const ShoppingHistoryComponent = () => {
  const [history, setHistory] = useState<IShoppingHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getShoppingHistory();
        setHistory(data);
      } catch (error) {
        setError('Error fetching history');
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Historial de Compras</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {history.length === 0 && !error && <p>No hay historial de compras.</p>}
        {history.map((entry) => (
          <li key={entry._id} className="mb-4">
            <strong className="block mb-2">{new Date(entry.timestamp).toLocaleString()}</strong>
            <ul className="list-disc list-inside ml-4">
              {entry.products.map((product) => (
                <li key={product._id} className="mb-1">
                  {product.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingHistoryComponent;
