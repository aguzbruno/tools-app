// components/ProductCardDetail.tsx

import { useEffect, useState } from "react";
import {
  addToShoppingList,
  deleteProduct,
  getProducts,
  getShoppingList,
  removeFromShoppingList,
  updateProduct,
  updatePurchaseStatus,
} from "../../../services/superService";
import { Product, ShoppingListProduct } from "../../../services/types";
import { useSuperStore } from "../../../store/superStore";
import ProductEdit from "./ProductEdit";
import ProductDisplay from "./ProductDisplay";
import ActionButtons from "./ActionButtons";

interface ProductCardProps {
  product: Product | ShoppingListProduct;
  isShoppingList?: boolean;
}

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
  const [editedProduct, setEditedProduct] = useState<Product | ShoppingListProduct>({ ...product });
  const setShoppingList = useSuperStore((state) => state.setShoppingList);
  const setProducts = useSuperStore((state) => state.setProducts);
  const shoppingList = useSuperStore((state) => state.shoppingList);
  

  const isProductInShoppingList = (productId: string) => {
    return shoppingList?.some((p) => p._id === productId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    }
    setIsEditing(false);
  };

  const handleAddToShoppingList = async (product: Product) => {
    try {
      const newProduct = { ...product, isPurchased: false, purchaseDetails: "" };
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

  const handleTogglePurchaseStatus = async (productId: string,isPurchased:boolean) => {
    try {
      await updatePurchaseStatus(productId,isPurchased); // Asegúrate de que esta función esté definida correctamente en tus servicios
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error('Error toggling purchase status:', error);
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
        <ProductEdit 
          editedProduct={editedProduct} 
          onChange={handleInputChange} 
          onSave={handleSaveClick} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        <ProductDisplay 
          product={product} 
          isShoppingList={isShoppingList} 
          onTogglePurchaseStatus={handleTogglePurchaseStatus} 
          onRemoveFromShoppingList={handleRemoveFromShoppingList} 
          onEdit={() => setIsEditing(true)} 
          onRemoveProduct={handleRemoveProduct} 
          isProductInShoppingList={isProductInShoppingList} 
        />
      )}
    </>
  );
}
