import { useEffect, useState } from "react";
import { useSuperStore } from "../../../store/superStore";
import { clearShoppingList, getProducts, getShoppingList, saveShoppingHistory } from "../../../services/superService";
import ShoppingListHeader from "./ShoppingListHeader";
import CategoryToggleButtons from "./CategoryToggleButtons";
import CategoryItem from "./CategoryItem";
import { ShoppingListProduct } from "../../../services/types";
import Loader from "../Loader";
import UpIcon from "../../assets/up.svg";
import DownIcon from "../../assets/down.svg";

interface OpenCategories {
  [key: string]: boolean;
}

export default function ShoppingList() {
  const {shoppingList,setIsLoading,isLoading,setShoppingList,setProducts} = useSuperStore();
  const [openCategories, setOpenCategories] = useState<OpenCategories>({});
  const [categoryOrder, setCategoryOrder] = useState<string[]>([]);
  const [showOpenButton, setShowOpenButton] = useState<boolean>(true);
  const [hideBought, setHideBought] = useState<boolean>(false); // Estado para ocultar productos comprados

  const fetchProducts = async () => {
    
    const products = await getProducts();
    setProducts(products);
    setIsLoading(false)
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
    isLoading ? (<Loader/>):(
    <div className="mb-6">
      <ShoppingListHeader shoppingList={shoppingList} />
      <CategoryToggleButtons 
        showOpenButton={showOpenButton} 
        toggleAllCategories={toggleAllCategories} 
        onHideBoughtChange={handleHideBoughtChange} 
      />

      <ul className="space-y-2">
        {categoryOrder.map((category,index) => {
          const productsInCategory = restCategoriesShopp[category];
          const visibleProducts = hideBought ? productsInCategory.filter(product => !product.isPurchased) : productsInCategory;

          // Calcular el número de productos comprados y total en la categoría
          const totalProducts = productsInCategory?.length;
          const boughtProducts = productsInCategory?.filter(product => product.isPurchased)?.length;

          return (
            <CategoryItem
              key={category}
              category={category}
              productsInCategory={visibleProducts}
              openCategories={openCategories}
              toggleCategory={toggleCategory}
              totalProducts={totalProducts}
              boughtProducts={boughtProducts} // Pasamos la información al componente CategoryItem
              categoryOrder={categoryOrder}
              setCategoryOrder={setCategoryOrder}
              index={index}
            />
          );
        })}
      </ul>
    </div>)
  );
}
