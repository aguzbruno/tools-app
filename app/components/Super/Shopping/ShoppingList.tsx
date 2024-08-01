"use client";
import { useEffect, useState } from "react";
import { clearShoppingList, getProducts, getShoppingList, saveShoppingHistory } from "../../../services/superService";
import ShoppingListHeader from "./ShoppingListHeader";
import CategoryToggleButtons from "./CategoryToggleButtons";
import CategoryItem from "./CategoryItem";
import { useSuperStore } from "@/app/store/superStore";
import { ShoppingListProduct } from "@/app/services/types";


interface OpenCategories {
  [key: string]: boolean;
}

export default function ShoppingList() {
  const products = useSuperStore((state) => state.products);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const setShoppingList = useSuperStore((state) => state.setShoppingList);

  const [openCategories, setOpenCategories] = useState<OpenCategories>({});
  const [categoryOrder, setCategoryOrder] = useState<string[]>([]);
  const [showOpenButton, setShowOpenButton] = useState<boolean>(true);
  const [hideBought, setHideBought] = useState<boolean>(false); // Estado para ocultar productos comprados

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  const fetchShoppingList = async () => {
    const shoppingList = await getShoppingList();
    setShoppingList(shoppingList);
  };

  const groupByCategory = (products: ShoppingListProduct[]) => {
    return products.reduce((acc, product) => {
      const category = product.category || "Otros";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, ShoppingListProduct[]>);
  };

  const groupedShopProducts = groupByCategory(shoppingList);
  const { OtrosShopp, ...restCategoriesShopp } = groupedShopProducts;

  const toggleCategory = (category: string) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  // Nueva función para abrir o cerrar todas las categorías
  const toggleAllCategories = (open: boolean) => {
    const newOpenCategories: OpenCategories = {};
    Object.keys(restCategoriesShopp).forEach((category) => {
      newOpenCategories[category] = open;
    });
    setOpenCategories(newOpenCategories);
    setShowOpenButton(!open); // Actualizar el estado del botón
  };

  useEffect(() => {
    fetchProducts();
    fetchShoppingList();
  }, []);

  useEffect(() => {
    const savedOrder = localStorage.getItem("categoryOrder");
    if (savedOrder) {
      setCategoryOrder(JSON.parse(savedOrder));
    } else {
      setCategoryOrder(Object.keys(restCategoriesShopp));
    }
  }, [shoppingList]);

  const handleHideBoughtChange = (isChecked: boolean) => {
    setHideBought(isChecked);
  };

  return (
    <div className="mb-6">
      <ShoppingListHeader shoppingList={shoppingList} />
      <CategoryToggleButtons 
        showOpenButton={showOpenButton} 
        toggleAllCategories={toggleAllCategories} 
        onHideBoughtChange={handleHideBoughtChange} 
      />

      <ul className="space-y-2 mt-8">
        {categoryOrder.map((category) => {
          const productsInCategory = restCategoriesShopp[category];
          const visibleProducts = hideBought ? productsInCategory.filter(product => !product.isPurchased) : productsInCategory;

          return (
            <CategoryItem
              key={category}
              category={category}
              productsInCategory={visibleProducts}
              openCategories={openCategories}
              toggleCategory={toggleCategory}
              categoryOrder={categoryOrder}
              setCategoryOrder={setCategoryOrder}
              index={categoryOrder.indexOf(category)}
            />
          );
        })}
      </ul>
    </div>
  );
}
