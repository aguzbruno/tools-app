"use client";
import { useEffect, useState } from "react";
import { useSuperStore } from "../store/superStore";
import Link from "next/link";
import {
  clearShoppingList,
  getProducts,
  getShoppingList,
  removeFromShoppingList,
  saveShoppingHistory
} from "../services/superService";
import { Product,ShoppingListProduct } from "../services/types";
import Bomb from '../assets/bomb.svg'
import Image from "next/image";
import ProductCardDetail from "./ProductCardDetail";
import Save from '../assets/save.svg'
const SuperList = () => {
  const products = useSuperStore((state) => state.products);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const setShoppingList = useSuperStore((state) => state.setShoppingList);

  const handleSaveHistory = async () => {
    await saveShoppingHistory(shoppingList);
  };
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

 
  const groupByCategory = (products: Product[]) => {
    return products.reduce((acc, product) => {
      const category = product.category || 'Otros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  };
  const groupedProducts = groupByCategory(products);
  const groupedShopProducts = groupByCategory(shoppingList);
  const { OtrosShopp, ...restCategoriesShopp } = groupedShopProducts;
  const { Otros, ...restCategories } = groupedProducts;
   // Estado para manejar las categorías abiertas
   const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});

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

  return (
    <div className="container mx-auto px-4 py-6">
      

      <div className="mb-6">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-col">
        <p className="text-xs font-bold text-gray-300 " style={{color:"C4C4C4"}}>
         LISTA DEL SUPER
        </p>
        <div className="flex items-center gap-2">
        <p className="text-md font-bold text-gray-500 " style={{color:"C4C4C4"}}>
         ESTIMADO :</p> €{shoppingList.reduce((acc, product) => acc + (product.price || 0), 0).toFixed(2)}
         </div>
        </div>
        <div className="flex gap-3">
        <Image
             onClick={() => handleSaveHistory()}
            className="cursor-pointer"
            height={20}
            width={20}
            src={Save}
            alt="Guardar"
          />
          <Image onClick={handleClearShoppingList} className="cursor-pointer" src={Bomb} alt="vaciar" width={20} height={20} />
          </div>
          </div>
        
        <ul className="space-y-2">
        {Object.keys(restCategoriesShopp).map((category) => {
           const productsInCategory = restCategoriesShopp[category];
           const totalProducts = productsInCategory.length;
 
           // Contar cuántos productos de esta categoría están en la lista de compras
           const purchasedProducts = productsInCategory.filter((product) => 
             shoppingList.some((shoppingItem) => shoppingItem._id === product._id)
           ).length;
           
          return(<li key={category}>
            <div className="flex justify-between items-center">
            <div className="flex flex-row cursor-pointer" style={{ userSelect: 'none' }}>
            <h3 className="font-bold category-header text-xs  " >{category}</h3>
                </div>
              
             
            </div>

              <ul className="flex flex-col product-list gap-2">
                {restCategoriesShopp[category]?.map((product) => (
                  <ProductCardDetail product={product} key={product._id} isShoppingList={true} />
                ))}
              </ul>
            
          </li>)
          }
        )}
          {/* {shoppingList?.length > 0 ?
            (shoppingList.map((product:ShoppingListProduct) => (
              <ProductCardDetail  isShoppingList={true} product={product} key={product._id} />
            ))):(<label className="text-sm text-black">No hay productos en la lista</label>)} */}
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
        {Object.keys(restCategories).map((category) => {
           const productsInCategory = restCategories[category];
           const totalProducts = productsInCategory.length;
 
           // Contar cuántos productos de esta categoría están en la lista de compras
           const purchasedProducts = productsInCategory.filter((product) => 
             shoppingList.some((shoppingItem) => shoppingItem._id === product._id)
           ).length;
           
          return(<li key={category}>
            <div className="flex justify-between items-center">
            <div className="flex flex-row cursor-pointer mb-2" onClick={() => toggleCategory(category)} style={{ userSelect: 'none' }}>
            <h3 className="font-bold category-header " >{category}</h3> - ({purchasedProducts}/{totalProducts})
                </div>
              
             
            </div>
            {openCategories[category] && (
              <ul className="flex flex-col product-list gap-2">
                {restCategories[category].map((product) => (
                  <ProductCardDetail product={product} key={product._id} />
                ))}
              </ul>
            )}
          </li>)
          }
        )}
        {Otros && (
          <li key="Otros">
            <div className="flex justify-between items-center">
              <h3 className="font-bold category-header cursor-pointer"  onClick={() => toggleCategory('Otros')}>Otros</h3>
            </div>
            {openCategories['Otros'] && (
              <ul className="flex flex-col product-list gap-2">
                {Otros.map((product) => (
                  <ProductCardDetail product={product} key={product._id} />
                ))}
              </ul>
            )}
          </li>
        )}
      </ul>
      </div>
    </div>
  );
};

export default SuperList;
