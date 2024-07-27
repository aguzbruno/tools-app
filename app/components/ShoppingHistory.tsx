// components/ShoppingHistory.tsx
import { useEffect, useState } from 'react';
import { IShoppingHistory } from '../api/models/ShoppingHistory';
import { Product } from '../services/types';
import { getProductDetails } from '../services/superService';

const ShoppingHistory = () => {
  const [history, setHistory] = useState<IShoppingHistory[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Product>>({});

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch('/api/shopping-history');
      const data: IShoppingHistory[] = await response.json(); // Aquí aseguramos que data es de tipo IShoppingHistory[]
      setHistory(data);

      // Obtener detalles de productos
      const productIds: string[] = data.flatMap((entry) => entry.products); // Asegúrate de que el tipo sea string[]
      const uniqueProductIds = [...new Set(productIds)];
      const products = await getProductDetails(uniqueProductIds);
      const productsById = products.reduce((acc: Record<string, Product>, product: Product) => {
        acc[product._id] = product;
        return acc;
      }, {});

      setProductsMap(productsById);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Historial de Compras</h2>
      <ul>
        {history.map((entry) => (
          <li key={entry._id.toString()}>
            <strong>{new Date(entry.timestamp).toLocaleString()}</strong>
            <ul>
              {entry.products.map((productId) => {
                const product = productsMap[productId.toString()];
                return product ? (
                  <li key={product._id.toString()}>{product.name}</li>
                ) : null; // Manejar caso donde el producto no se encuentra
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingHistory;
