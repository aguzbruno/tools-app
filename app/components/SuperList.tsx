"use client";
import { useEffect, useState } from "react";
import { useSuperStore } from "../store/superStore";
import Link from "next/link";
import {
  clearShoppingList,
  getProducts,
  getShoppingList,
  removeFromShoppingList
} from "../services/superService";
import { Product,ShoppingListProduct } from "../services/types";
import ProductCard from "./ProductCard";
import ShopProduct from "./ShoppProduct";
import Bomb from '../assets/bomb.svg'
import Image from "next/image";

const SuperList = () => {
  const products = useSuperStore((state) => state.products);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const setShoppingList = useSuperStore((state) => state.setShoppingList);

  const handleClearShoppingList = async () => {
    try {
      await clearShoppingList();
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error('Error clearing shopping list:', error);
    }
  };
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
      setShoppingList(shoppingList);
    } catch (error) {
      console.error("Error fetching shopping list:", error);
    }
  };

 




  
  useEffect(() => {
    fetchProducts();
    fetchShoppingList();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      

      <div className="mb-6">
        <div className="flex flex-row justify-between items-center mb-4">
        <p className="text-xs font-bold text-gray-300 " style={{color:"C4C4C4"}}>
         LISTA DEL SUPER
        </p>
        
          <Image onClick={handleClearShoppingList} className="cursor-pointer" src={Bomb} alt="vaciar" width={20} height={20} />
          </div>
        
        <ul className="space-y-2">
          {shoppingList?.length > 0 ?
            (shoppingList.map((product:ShoppingListProduct) => (
              <ShopProduct product={product} key={product._id} />
            ))):(<label className="text-sm text-black">No hay productos en la lista</label>)}
        </ul>
      </div>

      <div>
         <div className="flex flex-row gap-3 items-center mb-4">
         <p className="text-xs font-bold text-gray-300 " style={{color:"C4C4C4"}}>
         LISTA DE PRODUCTOS
        </p>
        <Link href="/super/add">
          <button className="px-2 font-extrabold bg-blue-500 text-xs text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300" style={{backgroundColor:"#303030"}}>
          +  
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
