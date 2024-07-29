// components/ProductDisplay.tsx
'use client'
import React, { useState } from "react";
import { Product, ShoppingListProduct } from "../../../services/types";
import Image from "next/image";
import Clip from "../../../assets/clip.svg";
import ClipCheck from "../../../assets/clip-check.svg";
import DeleteIcon from "../../../assets/delete.svg";
import EditIcon from "../../../assets/edit.svg";
import { addToShoppingList, getShoppingList, updateAmount, updatePurchaseDetails } from "@/app/services/superService";
import { useSuperStore } from "@/app/store/superStore";

interface ProductDisplayProps {
  product: Product | ShoppingListProduct;
  isShoppingList: boolean;
  onTogglePurchaseStatus: (productId: string, isPurchased: boolean) => void;
  onRemoveFromShoppingList: (productId: string) => void;
  onEdit: () => void;
  onRemoveProduct: (productId: string) => void;
  isProductInShoppingList: (productId: string) => boolean;
}

// Type guard para verificar si es un ShoppingListProduct
const isShoppingListProduct = (product: Product | ShoppingListProduct): product is ShoppingListProduct => {
  return (product as ShoppingListProduct).isPurchased !== undefined;
};

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  product,
  isShoppingList,
  onTogglePurchaseStatus,
  onRemoveFromShoppingList,
  onEdit,
  onRemoveProduct,
  isProductInShoppingList,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState(""); // Nuevo estado para el detalle de la compra

  const handleUpdateAmount = async (productId: string, amount: number) => {
    try {
      await updateAmount(productId, amount);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error('Error updating product amount:', error);
    }
  };

  const { setShoppingList } = useSuperStore();
  
  const handleAddToShoppingList = async (product: Product) => { // Cambiar el tipo a Product
    try {
      const newProduct: ShoppingListProduct = { ...product, isPurchased: false, purchaseDetails: "" }; 
      await addToShoppingList(newProduct);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };

  const handleAddPurchaseDetail = async () => {
    try {
      // Llama a la función del servicio para actualizar el detalle de la compra
      await updatePurchaseDetails(product._id, purchaseDetails);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
      console.log("Detalles de la compra agregados:", purchaseDetails);
      // Resetea el campo después de añadir el detalle
      setPurchaseDetails("");
      setShowAll(false);
    } catch (error) {
      console.error("Error al agregar detalles de la compra:", error);
    }
  };

  return (
    <li
      className={`px-3 ${
        isShoppingList
          ? !isShoppingListProduct(product) || !product.isPurchased
            ? "bg-white-300"
            : "bg-red-200"
          : !isProductInShoppingList(product._id)
          ? "bg-white-300"
          : "bg-gray-300"
      } w-5/5 rounded-md shadow-md flex justify-between items-center`}
      style={{
        border: "1px solid #E3E3E3",
        borderRadius: "11px",
      }}
    >
      <div className="flex flex-row gap-4 items-center justify-start w-3/5">
        <div className="flex flex-col py-1">
          <span
            className={`${
              isShoppingList && isShoppingListProduct(product) && product.isPurchased && "line-through"
            } text-lg font-semibold`}
            style={{ color: isShoppingList ? "#E57A9D" : "#009456" }}
            onClick={() => { setShowAll(!showAll) }}
          >
            {product.amount && product.amount > 1 ? `${product.amount}x ` : ""}
            {product.name}
          </span>
          <span className="text-xs font-semibold text-gray-300">
            {product.brand} - {product.unit}
          </span>
          <span className="text-xs font-semibold text-blue-300">
            {isShoppingListProduct(product) ? product.purchaseDetails: ''} 
          </span>
          {/* Añadiendo el textarea y botón para detalles de compra */}
          {showAll && (
            <div className="mt-2">
              <textarea
                className="border border-gray-300 rounded p-1"
                placeholder="Detalles sobre la compra"
                value={purchaseDetails}
                onChange={(e) => setPurchaseDetails(e.target.value)}
              />
              <button
                onClick={handleAddPurchaseDetail}
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
              >
                Agregar Detalle
              </button>
            </div>
          )}
        </div>
      </div>
      {product.price !== undefined && (
        <span className={`w-1/5 text-md font-semibold ${isShoppingList ? "text-black" : "text-black-300"}`}>
          € {product.price.toFixed(2)}
        </span>
      )}
      <div className="flex justify-end gap-1 items-center ">
        {isShoppingList ? (
          <>
            {product.amount && product.amount > 1 && (
              <button
                className="flex items-center justify-center m-0 h-5 w-5 bg-gray-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
                onClick={() => handleUpdateAmount(product._id, product.amount ? Number(product.amount) - 1 : 1)}
              >
                -
              </button>
            )}
            <button
              onClick={() => handleUpdateAmount(product._id, product.amount ? Number(product.amount) + 1 : 2)}
              className="flex items-center justify-center m-0 h-5 w-5 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
            >
              +
            </button>
            {!isShoppingListProduct(product) || !product.isPurchased ? (
              <button onClick={() => onTogglePurchaseStatus(product._id, true)}>
                <Image className="cursor-pointer" height={20} width={20} src={ClipCheck} alt="Agregar" />
              </button>
            ) : (
              <button onClick={() => onTogglePurchaseStatus(product._id, false)}>
                <Image className="cursor-pointer" src={Clip} height={20} width={20} alt="sacar" />
              </button>
            )}
            <Image
              src={DeleteIcon}
              height={20}
              width={20}
              className="cursor-pointer"
              onClick={() => onRemoveFromShoppingList(product._id)}
              alt="Eliminar"
            />
          </>
        ) : (
          <>
            {showAll ? (
              <div className="flex flex-row justify-between">
                <Image
                  src={EditIcon}
                  height={25}
                  width={25}
                  className="cursor-pointer"
                  onClick={onEdit}
                  alt="Editar"
                />
                <Image
                  src={DeleteIcon}
                  height={25}
                  width={25}
                  className="cursor-pointer"
                  onClick={() => onRemoveProduct(product._id)}
                  alt="Eliminar"
                />
              </div>
            ) : isProductInShoppingList(product._id) ? (
              <label className="text-black">Agregado</label>
            ) : (
              <button
                onClick={() => handleAddToShoppingList(product)} // Se acepta Product aquí
                className="m-2 h-6 w-6 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300"
              >
                +
              </button>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default ProductDisplay;
