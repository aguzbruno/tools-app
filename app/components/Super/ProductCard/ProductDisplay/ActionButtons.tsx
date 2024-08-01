// components/ActionButtons.tsx

import React from "react";
import Image from "next/image";
import Clip from "../../../assets/clip.svg";
import ClipCheck from "../../../assets/clip-check.svg";
import DeleteIcon from "../../../assets/delete.svg";
import EditIcon from "../../../assets/edit.svg";

interface ActionButtonsProps {
  isShoppingList: boolean;
  product: any;
  onTogglePurchaseStatus: (productId: string) => void;
  onRemoveFromShoppingList: (productId: string) => void;
  onEdit: () => void;
  onRemoveProduct: (productId: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isShoppingList,
  product,
  onTogglePurchaseStatus,
  onRemoveFromShoppingList,
  onEdit,
  onRemoveProduct,
}) => {
  return (
    <div className="flex justify-end gap-2 w-1/5">
      {isShoppingList ? (
        <>
          {!product.isPurchased ? (
            <button onClick={() => onTogglePurchaseStatus(product._id)}>
              <Image className="cursor-pointer" height={25} width={25} src={Clip} alt="Agregar" />
            </button>
          ) : (
            <button onClick={() => onTogglePurchaseStatus(product._id)}>
              <Image className="cursor-pointer" src={ClipCheck} height={25} width={25} alt="sacar" />
            </button>
          )}
          <Image
            src={DeleteIcon}
            height={25}
            width={25}
            className="cursor-pointer"
            onClick={() => onRemoveFromShoppingList(product._id)}
            alt="Eliminar"
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default ActionButtons;
