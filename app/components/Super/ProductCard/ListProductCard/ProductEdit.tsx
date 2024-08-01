'use client'
import React, { useState } from 'react';
import { Product, ShoppingListProduct } from "../../../../services/types";
import Image from "next/image";
import Save from "../../../../assets/save.svg";
import { updateProduct } from '@/app/services/superService';
import toast, { Toaster } from 'react-hot-toast';

interface ProductEditProps {
  product: Product;
  onCancel: () => void;
}

const ProductEdit: React.FC<ProductEditProps> = ({
  product,
  onCancel,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product>({ ...product });
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const hasChanges = () => {
    return JSON.stringify(product) !== JSON.stringify(editedProduct);
  };

  const handleSaveClick = async () => {
    if (hasChanges()) {
      await updateProduct(editedProduct._id, editedProduct);
      toast.success("Producto actualizado");
    }
    toast.success("No ha habido cambios en el producto");
    onCancel()
  };
  return (
    <li
      className={`px-3 w-5/5 rounded-md shadow-md flex justify-between items-center`}
      style={{ border: "1px solid #E3E3E3", borderRadius: "11px" }}
    >
      <Toaster/>
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col py-1 gap-2">
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
              placeholder="Nombre"
              className="text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg"
              style={{ color: "#009456" }}
            />
            <input
              type="text"
              name="brand"
              value={editedProduct.brand}
              onChange={handleInputChange}
              placeholder="Marca"
              className="text-lg text-gray-300 font-semibold border-solid border-2 border-sky-500 rounded-lg"
            />
            <input
              type="text"
              name="unit"
              value={editedProduct.unit}
              onChange={handleInputChange}
              placeholder="Unidad"
              className="text-lg text-gray-300 font-semibold border-solid border-2 border-sky-500 rounded-lg"
            />
            <input
              type="number"
              name="price"
              value={editedProduct.price !== undefined ? editedProduct.price.toString() : ""}
              onChange={handleInputChange}
              placeholder="Precio"
              className="text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg"
            />
            <select
              name="category"
              value={editedProduct.category || ""}
              onChange={handleInputChange}
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
      <Image onClick={handleSaveClick} className="cursor-pointer" height={25} width={25} src={Save} alt="Guardar" />
    </li>
  );
};

export default ProductEdit;
