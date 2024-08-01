"use client";
import { useSuperStore } from "../../store/superStore";
import Loader from "./Loader";
import ShoppingList from "./Shopping/ShoppingList";
import ProductList from "./ProductList";

const SuperList = () => {
  const shoppingList = useSuperStore((state) => state.shoppingList);
  return (
    <div className="container mx-auto px-4 py-6">
      {!shoppingList ? (
        <Loader/>
      ) : (
        <div className="flex flex-col">
        <ShoppingList></ShoppingList>
        <ProductList></ProductList>
        </div>
      )}
    </div>
  );
};

export default SuperList;
