import { Product } from "@/app/services/types";
import { useSuperStore } from "@/app/store/superStore";
import { useEffect, useState } from "react";
import ProductPrice from "../ProductDisplay/ProductPrice";
import Image from "next/image";
import EditIcon from "../../../../assets/edit.svg";
import DeleteIcon from "../../../../assets/delete.svg";
import {
  addToShoppingList,
  deleteProduct,
  getProducts,
  getShoppingList,
  updateProduct,
} from "@/app/services/superService";
import ProductEdit from "./ProductEdit";

interface ListProductCardProps {
  product: Product;
}
export default function ListProductCard({ product }: ListProductCardProps) {
  const { shoppingList, setProducts, setShoppingList } = useSuperStore();

  const [showAll, setShowAll] = useState(false);
  const isProductInShoppingList = (productId: string) => {
    return shoppingList?.some((p) => p._id === productId);
  };
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, [isEditing]);

  const handleRemoveProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  const handleAddToShoppingList = async (product: Product) => {
    try {
      const newProduct = {
        ...product,
        isPurchased: false,
        purchaseDetails: "",
      };
      await addToShoppingList(newProduct);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };

  return (!isEditing ? (
    <li
      className={`px-3 py-2 rounded-md shadow-md flex justify-between items-center ${
        !isProductInShoppingList(product._id) ? "bg-white" : "bg-gray-300"
      }`}
      style={{
        border: "1px solid #E3E3E3",
        borderRadius: "11px",
      }}
    >
      <div className="flex flex-row gap-4 items-center w-3/5">
        <div className="flex flex-col py-1">
          <div
            className={`text-lg font-semibold`}
            style={{ color: "#009456" }}
            onClick={() => setShowAll(!showAll)}
          >
            <p className="cursor-pointer">{product.name}</p>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            {product.brand} - {product.unit}
          </span>
        </div>
      </div>
      {product.price !== undefined && <ProductPrice price={product.price} />}
      <div className="flex gap-1 items-center">
        <>
          {showAll ? (
            <div className="flex flex-row justify-between">
              <Image
                src={EditIcon}
                height={25}
                width={25}
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
                alt="Editar"
              />
              <Image
                src={DeleteIcon}
                height={25}
                width={25}
                className="cursor-pointer"
                onClick={() => handleRemoveProduct(product._id)}
                alt="Eliminar"
              />
            </div>
          ) : isProductInShoppingList(product._id) ? (
            <label className="text-black">Agregado</label>
          ) : (
            <button
              onClick={() => handleAddToShoppingList(product)}
              className="h-6 w-6 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              +
            </button>
          )}
        </>
      </div>
    </li>):(<ProductEdit product={product} onCancel={()=>setIsEditing(false)}  />)
  );
}
