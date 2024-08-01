"use client";
import { ShoppingListProduct } from "@/app/services/types";
import { useState } from "react";
import ProductPrice from "../ProductDisplay/ProductPrice";
import AmountControls from "../ProductDisplay/AmountControls";
import TogglePurchase from "../ProductDisplay/TogglePurchase";
import {
  getShoppingList,
  updatePurchaseDetails,
} from "@/app/services/superService";
import { useSuperStore } from "@/app/store/superStore";

interface ShoppingProductProps {
  product: ShoppingListProduct;
}

export default function ShoppingProductCard({ product }: ShoppingProductProps) {
  const [showAll, setShowAll] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState("");
  const { setShoppingList } = useSuperStore();

  const handleAddPurchaseDetail = async () => {
    try {
      await updatePurchaseDetails(product._id, purchaseDetails);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
      setPurchaseDetails("");
      setShowAll(false);
    } catch (error) {
      console.error("Error adding purchase details:", error);
    }
  };
  return (
    <li
      className={`flex flex-col px-3 rounded-md shadow-md flex justify-start items-between ${
        product.isPurchased && "bg-red-200"
      }`}
      style={{
        border: "1px solid #E3E3E3",
        borderRadius: "11px",
      }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 items-center w-3/5">
          <div className="flex flex-col">
            <div
              className={` cursor-pointer flex items-center text-lg font-semibold`}
              onClick={() => setShowAll(!showAll)}
            >
              <p
                className={` ${
                  product.amount &&
                  product.amount > 1 &&
                  (product.isPurchased ? "line-through" : "")
                }`}
                style={{ color: "#E57A9D" }}
              >
                {product.amount && product.amount > 1 && `${product.amount}x `}{" "}
                {product.name}{" "}
              </p>

              {showAll && (
                <div className="flex flex-row justify-end gap-4">
                  <AmountControls product={product} key={product._id} />
                </div>
              )}
            </div>
            <span className="text-xs font-semibold text-gray-500">
              {product.brand} - {product.unit}
            </span>
            <span className="text-xs font-semibold text-blue-500">
              {product.purchaseDetails}
            </span>
          </div>
        </div>

        {product.price !== undefined && <ProductPrice price={product.price} />}

        {!showAll && (
          <div className="flex gap-1 items-center">
            <TogglePurchase product={product} key={product._id} />
          </div>
        )}
      </div>
      {showAll && (
        <>
          <div className="flex flex-row  justify-between mt-2 gap-4">
            <textarea
              className="border border-gray-300 rounded p-1 w-full"
              placeholder="Detalles sobre la compra"
              value={purchaseDetails}
              onChange={(e) => setPurchaseDetails(e.target.value)}
            />
            <button
              onClick={handleAddPurchaseDetail}
              className=" text-green-700 border-2 border-green-700 rounded-xl px-2 "
            >
              Agregar
            </button>
          </div>
        </>
      )}
    </li>
  );
}
