import { ShoppingListProduct } from "@/app/services/types";
import Image from "next/image";
import Clip from "../../../../assets/clip.svg";
import ClipCheck from "../../../../assets/clip-check.svg";
import DeleteIcon from "../../../../assets/delete.svg";
import {
  getShoppingList,
  removeFromShoppingList,
  updatePurchaseStatus,
} from "@/app/services/superService";
import { useSuperStore } from "@/app/store/superStore";
import { classNames } from "primereact/utils";

interface TogglePurchaseProps {
  product: ShoppingListProduct;
}

export default function TogglePurchase({ product }: TogglePurchaseProps) {
  const { setShoppingList } = useSuperStore();
  const handleTogglePurchaseStatus = async (
    productId: string,
    isPurchased: boolean
  ) => {
    try {
      await updatePurchaseStatus(productId, isPurchased); // Asegúrate de que esta función esté definida correctamente en tus servicios
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error toggling purchase status:", error);
    }
  };

  // const handleRemoveFromShoppingList = async (productId: string) => {
  //   try {
  //     await removeFromShoppingList(productId);
  //     const updatedShoppingList = await getShoppingList();
  //     setShoppingList(updatedShoppingList);
  //   } catch (error) {
  //     console.error("Error removing from shopping list:", error);
  //   }
  // };
  return (
    <div className="flex items-center gap-1">
      {!product.isPurchased ? (
        <button className=' border-2 border-green-700 rounded-xl px-2' onClick={() => handleTogglePurchaseStatus(product._id, true) } >
          <Image
            className="cursor-pointer"
            height={30}
            width={30}
            src={ClipCheck}
            alt="Agregar"
          />
        </button>
      ) : (
        <button className='p-2' onClick={() => handleTogglePurchaseStatus(product._id, false)}>
          <Image
            className="cursor-pointer"
            src={Clip}
            height={30}
            width={30}
            alt="Sacar"
          />
        </button>
      )}
      {/* <Image
        src={DeleteIcon}
        height={20}
        width={20}
        className="cursor-pointer"
        onClick={() => handleRemoveFromShoppingList(product._id)}
        alt="Eliminar"
      /> */}
    </div>
  );
}
