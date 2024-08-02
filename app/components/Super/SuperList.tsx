"use client";
import { useSuperStore } from "../../store/superStore";
import Loader from "./Loader";
import ShoppingList from "./Shopping/ShoppingList";
import ProductList from "./ProductList";

const SuperList = () => {
  return (
    <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col">
        <ShoppingList></ShoppingList>
        <ProductList></ProductList>
        </div>
    </div>
  );
};

export default SuperList;
