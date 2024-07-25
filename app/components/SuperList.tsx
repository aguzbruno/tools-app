"use client";
import { useEffect, useState } from "react";
import { useSuperStore } from "../store/superStore";
import Link from "next/link";
import { getProduct, getProducts } from "../services/superService";

interface Product {
  id: number;
  name: string;
  quantity: string;
  price?: number; // El campo precio es opcional
}

const SuperList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [shoppingList, setShoppingList] = useState<Product[]>([]);
  const addToShoppingList = useSuperStore((state) => state.addToShoppingList);
  const removeFromShoppingList = useSuperStore((state) => state.removeFromShoppingList);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch shopping list
    const fetchShoppingList = async () => {
      try {
        const response = await fetch('/api/shopping-list');
        const data = await response.json();
        setShoppingList(data);
      } catch (error) {
        console.error('Error fetching shopping list:', error);
      }
    };

    fetchProducts();
    fetchShoppingList();
  }, []);

  const handleAddToShoppingList = (product: Product) => {
    addToShoppingList(product);
    setShoppingList((prev) => [...prev, product]);
  };

  const handleRemoveFromShoppingList = (productId: number) => {
    removeFromShoppingList(productId);
    setShoppingList((prev) => prev.filter((p) => p.id !== productId));
  };

  const isProductInShoppingList = (productId: number) => {
    return shoppingList.some((p) => p.id === productId);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-row justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Supermercado</h1>
        <Link href="/super/add">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
            Agregar Producto
          </button>
        </Link>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lista del Supermercado</h2>
        <ul className="space-y-4">
          {shoppingList.map((product) => (
            <li
              key={product.id}
              className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-blue-600">{product.name}</span>
                <span className="text-lg font-semibold text-gray-600">{product.quantity}</span>
                {product.price !== undefined && (
                  <span className="text-lg font-semibold text-gray-600">
                    EUR$ {product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleRemoveFromShoppingList(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Lista de Productos</h2>
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-4 bg-gray-800 rounded-md shadow-md flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-blue-400">{product.name}</span>
                <span className="text-lg font-semibold text-white">{product.quantity}</span>
                {product.price !== undefined && (
                  <span className="text-lg font-semibold text-gray-300">
                    EUR$ {product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {!isProductInShoppingList(product.id) ? (
                <button
                  onClick={() => handleAddToShoppingList(product)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                >
                  + Agregar
                </button>
              ) : (
                <span className="text-white">Agregado</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuperList;
