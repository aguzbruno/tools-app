"use client";
import { useEffect, useRef, useState } from "react";
import { useSuperStore } from "../../store/superStore";
import Link from "next/link";
import {
  clearShoppingList,
  getProducts,
  getShoppingList,
  removeFromShoppingList,
  saveShoppingHistory,
} from "../../services/superService";
import { Product } from "../../services/types";
import toast, { Toaster } from "react-hot-toast";
import ListProductCard from "./ProductCard/ListProductCard/ListProductCard";
import Loader from "./Loader";
export default function ProductList() {
  const products = useSuperStore((state) => state.products);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const setShoppingList = useSuperStore((state) => state.setShoppingList);
  const {isLoading} = useSuperStore()
  
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

  const groupByCategory = (products: Product[]) => {
    return products.reduce((acc, product) => {
      const category = product.category || "Otros";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };
  const groupedProducts = groupByCategory(products);
  const { Otros, ...restCategories } = groupedProducts;
  // Estado para manejar las categorías abiertas
  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>({});

  // Función para alternar la apertura/cierre de una categoría
  const toggleCategory = (category: string) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  useEffect(() => {
    fetchProducts();
    fetchShoppingList();
  }, []);

  return ( !isLoading &&(
    <div>
      <Toaster />
      <div className="flex flex-row gap-3 items-center mb-4">
        <p
          className="text-xs font-bold text-gray-300 "
          style={{ color: "C4C4C4" }}
        >
          LISTA DE PRODUCTOS
        </p>
        <Link href="/super/add">
          <button
            className="px-2 font-extrabold bg-blue-500 text-xs text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            style={{ backgroundColor: "#303030" }}
          >
            +
          </button>
        </Link>
      </div>
      <ul className="space-y-2 mb-16">
        {Object.keys(restCategories).map((category) => {
          const productsInCategory = restCategories[category];
          const totalProducts = productsInCategory.length;

          // Contar cuántos productos de esta categoría están en la lista de compras
          const purchasedProducts = productsInCategory.filter((product) =>
            shoppingList.some(
              (shoppingItem) => shoppingItem._id === product._id
            )
          ).length;

          return (
            <li key={category}>
              <div className="flex justify-between items-center">
                <div
                  className="flex flex-row cursor-pointer mb-2"
                  onClick={() => toggleCategory(category)}
                  style={{ userSelect: "none" }}
                >
                  <h3 className="font-bold category-header ">{category}</h3> - (
                  {purchasedProducts}/{totalProducts})
                </div>
              </div>
              {openCategories[category] && (
                <ul className="flex flex-col product-list gap-2">
                  {restCategories[category].map((product) => (
                    <ListProductCard product={product} key={product._id} />
                  ))}
                </ul>
              )}
            </li>
          );
        })}
        {Otros && (
          <li key="Otros">
            <div className="flex justify-between items-center">
              <h3
                className="font-bold category-header cursor-pointer"
                onClick={() => toggleCategory("Otros")}
              >
                Otros
              </h3>
            </div>
            {openCategories["Otros"] && (
              <ul className="flex flex-col product-list gap-2">
                {Otros.map((product) => (
                  <ListProductCard product={product} key={product._id} />
                ))}
              </ul>
            )}
          </li>
        )}
      </ul>
    </div>)
  );
}
