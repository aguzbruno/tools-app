"use client";
import { useEffect, useState } from "react";
import { useSuperStore } from "../store/superStore";
import Link from "next/link";
import {
  getProducts,
  getShoppingList,
  addToShoppingList,
  removeFromShoppingList
} from "../services/superService";
import { Product } from "../services/types";
import ProductCard from "./ProductCard";

const SuperList = () => {
  const products = useSuperStore((state) => state.products);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const setShoppingList = useSuperStore((state) => state.setShoppingList);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchShoppingList = async () => {
    try {
      const shoppingList = await getShoppingList();
      setShoppingList(shoppingList.data);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

 

  const handleRemoveFromShoppingList = async (productId: string) => {
    try {
      const updatedShoppingList = await removeFromShoppingList(productId);
      setShoppingList(updatedShoppingList.data);
    } catch (error) {
      console.error("Error removing from shopping list:", error);
    }
  };


  
  useEffect(() => {
    fetchProducts();
    fetchShoppingList();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-row justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Supermercado</h1>
      
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Lista del Supermercado
        </h2>
        <ul className="space-y-4">
          {shoppingList.length > 0 ?
            (shoppingList.map((product) => (
              <li
                key={product._id}
                className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-blue-600">
                    {product.name}
                  </span>
                  <span className="text-lg font-semibold text-gray-600">
                    {product.quantity}
                  </span>
                  {product.price !== undefined && (
                    <span className="text-lg font-semibold text-gray-600">
                      EUR$ {product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveFromShoppingList(product._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
                >
                  Eliminar
                </button>
              </li>
            ))):(<label className="text-sm text-black">No hay productos en la lista</label>)}
        </ul>
      </div>

      <div>
         <div className="flex flex-row gap-3">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Lista de Productos
        </h2>
        <Link href="/super/add">
          <button className="px-3  py-2 bg-blue-500 text-xs text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
            Agregar
          </button>
        </Link>
        </div>
        <ul className="space-y-2">
          {products.length > 0 &&
            products?.map((product) => (
             <ProductCard product={product} key={product._id} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SuperList;
