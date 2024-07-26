import {
  getShoppingList,
  removeFromShoppingList,
  togglePurchaseStatus,
} from "../services/superService";
import { Product, ShoppingListProduct } from "../services/types";
import { useSuperStore } from "../store/superStore";
import Note from "../assets/note.svg";
import DeleteIcon from "../assets/delete.svg";
import Clip from '../assets/clip.svg'
import ClipCheck from '../assets/clip-check.svg'
import Image from "next/image";
interface ShopProductProps {
  product: ShoppingListProduct;
}

export default function ShopProduct({ product }: ShopProductProps) {
  const setShoppingList = useSuperStore((state) => state.setShoppingList);
  const handleRemoveFromShoppingList = async (productId: string) => {
    try {
      const responseUpdatedShoppingList = await removeFromShoppingList(
        productId
      );
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error removing from shopping list:", error);
    }
  };
  const handleTogglePurchaseStatus = async (productId: string) => {
    try {
      await togglePurchaseStatus(productId);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error toggling purchase status:", error);
    }
  };

  return (
    <li
      key={product._id}
      className={`px-3 ${
        !product.isPurchased ? "bg-white-300" : "bg-red-200"
      } w-5/5 rounded-md shadow-md flex justify-between items-center`}
      style={{ border:`${!product.isPurchased ? " 1px solid #E3E3E3"  :'none'}`, borderRadius: "11px" }}
    >
      <div className="flex flex-row gap-4 items-center justify-start w-4/5">
        <div className="flex flex-col py-1">
          <span
            className={`${
              product.isPurchased && "line-through"
            }  text-lg font-semibold`}
            style={{ color: "#E57A9D" }}
          >
            {product.name}
          </span>
          <span className="text-xs font-semibold text-gray-300">
            {product.quantity}
          </span>
        </div>
        {product.price !== undefined && (
          <span className="w-1/5 text-xs font-semibold text-gray-300">
            EUR$ {product.price.toFixed(2)}
          </span>
        )}
      </div>
      <div className="flex justify-end gap-2 w-1/5">
        {!product.isPurchased ? (
          <button
            onClick={() => {
              handleTogglePurchaseStatus(product._id);
            }}
          >
            <Image className="cursor-pointer"  height={25} width={25} src={Clip} alt="Agregar" />
          </button>
        ) : (
          <button
            onClick={() => {
              handleTogglePurchaseStatus(product._id);
            }}
          >
            <Image className="cursor-pointer"  src={ClipCheck} height={25} width={25} alt="sacar"></Image>
          </button>
        )}

        <Image
          src={DeleteIcon}
          height={25}
          width={25}
          className="cursor-pointer" 
          onClick={() => handleRemoveFromShoppingList(product._id)}
          alt="Eliminar"
        ></Image>
      </div>
    </li>
  );
}
