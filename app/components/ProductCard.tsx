"use client";
import { useState } from "react";
import { Product } from "../services/types";
import { useSuperStore } from "../store/superStore";
import {
  addToShoppingList,
  deleteProduct,
  getProducts,
  getShoppingList,
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
    return shoppingList?.some((p) => p._id === productId);
  };

  const handleAddToShoppingList = async (product: Product) => {
    try {
      const newProduct = { ...product, isPurchased: false };
      await addToShoppingList(newProduct);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error removing from shopping list:", error);
    }
  };

  return (
    <li
      key={product._id}
      className={`px-3 ${!isProductInShoppingList(product._id) ? "bg-white-300":"bg-gray-300"} w-5/5 rounded-md shadow-md flex justify-between items-center`}
      style={{ border: " 1px solid #E3E3E3", borderRadius: "11px" }}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="flex flex-col py-1">
            <span
              className={`text-lg font-semibold`}
              style={{ color: "#009456" }}
              onClick={() => {
                setShowAll(!showAll);
              }}
            >
              {product.name}
            </span>
            {!isProductInShoppingList(product._id) &&(
            <span className="text-xs font-semibold text-gray-300">
              {product.quantity}
            </span>)}
          </div>

          {product.price !== undefined && (
            <span className="text-lg font-semibold text-white">
              EUR$ {product.price.toFixed(2)}
            </span>
          )}
        </div>
        {showAll && (
          <div className="flex flex-row justify-between">
            <div>Editar</div>
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
      {isProductInShoppingList(product._id) ? (
        <label className="text-black">Agregado</label>
      ) : (
        <button
          onClick={() => handleAddToShoppingList(product)}
          className={`m-2 h-6 w-6 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300`}
        >
          +
        </button>
      )}
    </li>
  );
}
