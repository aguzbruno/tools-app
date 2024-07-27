import { useEffect, useState } from "react";
import {
  addToShoppingList,
  deleteProduct,
  getProducts,
  getShoppingList,
  removeFromShoppingList,
  togglePurchaseStatus,
  updateProduct,
} from "../services/superService";
import { Product, ShoppingListProduct } from "../services/types";
import { useSuperStore } from "../store/superStore";
import Note from "../assets/note.svg";
import DeleteIcon from "../assets/delete.svg";
import Clip from "../assets/clip.svg";
import ClipCheck from "../assets/clip-check.svg";
import Save from "../assets/save.svg";
import Image from "next/image";
import EditIcon from "../assets/edit.svg";

interface ProductCardProps {
  product: Product | ShoppingListProduct;
  isShoppingList?: boolean;
}
// Type guard para determinar si el producto es un ShoppingListProduct
function isShoppingListProduct(
  product: Product | ShoppingListProduct
): product is ShoppingListProduct {
  return (product as ShoppingListProduct).isPurchased !== undefined;
}
export default function ProductCardDetail({
  product,
  isShoppingList = false,
}: ProductCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<
    Product | ShoppingListProduct
  >({ ...product });
  const setShoppingList = useSuperStore((state) => state.setShoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  const [showAll, setShowAll] = useState(false);

  const isProductInShoppingList = (productId: string) => {
    return shoppingList?.some((p) => p._id === productId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value
    });
    }

  const hasChanges = () => {
    return JSON.stringify(product) !== JSON.stringify(editedProduct);
  };

  const handleSaveClick = async () => {
    if (hasChanges()) {
      await updateProduct(editedProduct._id, editedProduct);
    }
    setIsEditing(false);
  };

  const handleAddToShoppingList = async (product: Product) => {
    try {
      const newProduct = { ...product, isPurchased: false };
      await addToShoppingList(newProduct);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error adding to shopping list:", error);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error removing product:", error);
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

  const handleRemoveFromShoppingList = async (productId: string) => {
    try {
      await removeFromShoppingList(productId);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error removing from shopping list:", error);
    }
  };

  useEffect(() => {
    if (!isShoppingList) {
      const fetchProducts = async () => {
        const products = await getProducts();
        setProducts(products);
      };
      fetchProducts();
    }
  }, [isEditing]);

  return (
    <>
      {isEditing ? (
        <li
          key={product._id}
          className={`px-3 ${
            !isProductInShoppingList(product._id)
              ? "bg-white-300"
              : "bg-gray-300"
          } w-5/5 rounded-md shadow-md flex justify-between items-center`}
          style={{ border: "1px solid #E3E3E3", borderRadius: "11px" }}
        >
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col py-1 gap-2">
                <input
                  type="text"
                  name="name"
                  value={editedProduct.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg"
                  style={{ color: "#009456" }}
                />

                <input
                  type="text"
                  name="quantity"
                  value={editedProduct.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                  className="text-lg text-gray-300 font-semibold border-solid border-2 border-sky-500 rounded-lg"
                />
                <input
                  type="number"
                  name="price"
                  value={
                    editedProduct.price !== undefined
                      ? editedProduct.price.toString()
                      : ""
                  }
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg"
                />
                <select
                  name="category"
                  value={editedProduct.category || ""}
                  onChange={handleSelectChange}
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

          <button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            {" "}
            X
          </button>
          <Image
            onClick={handleSaveClick}
            className="cursor-pointer"
            height={25}
            width={25}
            src={Save}
            alt="Guardar"
          />
        </li>
      ) : (
        <li
          key={product._id}
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
            border: `${
              isShoppingList
                ? !isShoppingListProduct(product) || !product.isPurchased
                  ? "1px solid #E3E3E3"
                  : "none"
                : "1px solid #E3E3E3"
            }`,
            borderRadius: "11px",
          }}
        >
          <div className="flex flex-row gap-4 items-center justify-start w-3/5">
            <div className="flex flex-col py-1">
              <span
                className={`${
                  isShoppingList &&
                  isShoppingListProduct(product) &&
                  product.isPurchased &&
                  "line-through"
                } text-lg font-semibold`}
                style={{ color: isShoppingList ? "#E57A9D" : "#009456" }}
                onClick={() => {
                  if (!isShoppingList) setShowAll(!showAll);
                }}
              >
                {product.name}
              </span>
              {!isShoppingList && !isProductInShoppingList(product._id) && (
                <span className="text-xs font-semibold text-gray-300">
                  {product.quantity}
                </span>
              )}
              {isShoppingList && (
                <span className="text-xs font-semibold text-gray-300">
                  {product.quantity}
                </span>
              )}
            </div>
          </div>
          {product.price !== undefined && (
            <span
              className={`w-1/5 text-md font-semibold ${
                isShoppingList ? "text-black" : "text-black-300"
              }`}
            >
              € {product?.price?.toFixed(2)}
            </span>
          )}
          <div className="flex justify-end gap-2 w-1/5">
            {isShoppingList ? (
              <>
                {!isShoppingListProduct(product) || !product.isPurchased ? (
                  <button
                    onClick={() => {
                      handleTogglePurchaseStatus(product._id);
                    }}
                  >
                    <Image
                      className="cursor-pointer"
                      height={25}
                      width={25}
                      src={Clip}
                      alt="Agregar"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleTogglePurchaseStatus(product._id);
                    }}
                  >
                    <Image
                      className="cursor-pointer"
                      src={ClipCheck}
                      height={25}
                      width={25}
                      alt="sacar"
                    ></Image>
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
                    className={`m-2 h-6 w-6 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300`}
                  >
                    +
                  </button>
                )}
              </>
            )}
          </div>
        </li>
      )}
    </>
  );
}
