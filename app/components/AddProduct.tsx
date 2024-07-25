'use client'
import { useState } from 'react';
import { createProduct } from '../services/superService';
import { useRouter } from 'next/navigation';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState<number | undefined>(undefined);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProduct({
        name,
        quantity,
        price: price,
      });
      router.push('/super');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto px-4 py-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Agregar Producto</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Unidad / Peso</label>
        <input
          id="quantity"
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Cantidad"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-lg font-medium text-gray-700">Precio (opcional)</label>
        <input
          id="price"
          type="number"
          value={price || ''}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Precio"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
      >
        Agregar Producto
      </button>
    </form>
  );
};

export default AddProduct;
