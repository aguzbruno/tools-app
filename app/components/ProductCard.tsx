'use client'
import { useState } from "react";
import { Product } from "../services/types"
import { useSuperStore } from "../store/superStore";
import {
  addToShoppingList,
  deleteProduct,
  getProducts,
} from "../services/superService";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showAll, setShowAll] = useState(false);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const setShoppingList = useSuperStore((state) => state.setShoppingList);

  const isProductInShoppingList = (productId: string) => {
    return shoppingList.some((p) => p._id === productId);
  };

  const handleAddToShoppingList = async (product: Product) => {
    try {
      const updatedShoppingList = await addToShoppingList(product._id);
      setShoppingList(updatedShoppingList.data);
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      const updateProducts = await deleteProduct(productId);
      const products = await getProducts();
      setProducts(products)
    } catch (error) {
      console.error("Error removing from shopping list:", error);
    }
  };

  return (
    <li
      key={product._id}
      className="px-3 bg-gray-800 rounded-md shadow-md flex justify-between items-center"
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center gap-4">
          <span className="text-lg font-semibold text-blue-400" onClick={() => { setShowAll(!showAll) }}>
            {product.name}
          </span>
          <span className="text-lg font-semibold text-white">
            {product.quantity}
          </span>
          {product.price !== undefined && (
            <span className="text-lg font-semibold text-white">
              EUR$ {product.price.toFixed(2)}
            </span>
          )}
        </div>
        {showAll && (
          <div className="flex flex-row justify-between">
            <div>
              Editar
            </div>
            <div>
              <button
                onClick={() => handleRemoveProduct(product._id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
      {!isProductInShoppingList(product._id) ? (
        <button
          onClick={() => handleAddToShoppingList(product)}
          className={`m-2 h-6 w-6 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300`}
          disabled={isProductInShoppingList(product._id)}
        >
          +
        </button>
      ) : (
        <label className="text-sm">Agregado</label>
      )}
    </li>
  );
}
