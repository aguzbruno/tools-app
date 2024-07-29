// components/ProductEdit.tsx

import React from 'react';
import { Product, ShoppingListProduct } from "../../../services/types";
import Image from "next/image";
import Save from "../../../assets/save.svg";

interface ProductEditProps {
  editedProduct: Product | ShoppingListProduct;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProductEdit: React.FC<ProductEditProps> = ({
  editedProduct,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <li
      className={`px-3 w-5/5 rounded-md shadow-md flex justify-between items-center`}
      style={{ border: "1px solid #E3E3E3", borderRadius: "11px" }}
    >
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col py-1 gap-2">
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={onChange}
              placeholder="Product Name"
              className="text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg"
              style={{ color: "#009456" }}
            />
            <input
              type="text"
              name="brand"
              value={editedProduct.brand}
              onChange={onChange}
              placeholder="Brand"
              className="text-lg text-gray-300 font-semibold border-solid border-2 border-sky-500 rounded-lg"
            />
            <input
              type="text"
              name="unit"
              value={editedProduct.unit}
              onChange={onChange}
              placeholder="Unit"
              className="text-lg text-gray-300 font-semibold border-solid border-2 border-sky-500 rounded-lg"
            />
            <input
              type="number"
              name="price"
              value={editedProduct.price !== undefined ? editedProduct.price.toString() : ""}
              onChange={onChange}
              placeholder="Price"
              className="text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg"
            />
            <select
              name="category"
              value={editedProduct.category || ""}
              onChange={onChange}
              className="text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg"
            >
              <option value="">Selecciona una categoría</option>
              <option value="Alacena">Alacena</option>
              <option value="Congelados">Congelados</option>
              <option value="Fruta">Fruta</option>
              <option value="Verdura">Verdura</option>
              <option value="Heladera">Heladera</option>
              <option value="Carnes">Carnes</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Higiene">Higiene Personal</option>
              <option value="Droga">Droga</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
        </div>
      </div>
      <button onClick={onCancel}> X </button>
      <Image onClick={onSave} className="cursor-pointer" height={25} width={25} src={Save} alt="Guardar" />
    </li>
  );
};

export default ProductEdit;
