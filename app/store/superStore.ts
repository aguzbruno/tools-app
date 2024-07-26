// store/superStore.ts
import create from 'zustand';
import { Product, ShoppingListProduct } from '../services/types';

interface SuperStoreState {
  products: Product[];
  shoppingList: ShoppingListProduct[];
  setProducts: (products: Product[]) => void;
  setShoppingList: (shoppingList: ShoppingListProduct[]) => void;
  addToShoppingList: (product: ShoppingListProduct) => void;
  removeFromShoppingList: (productId: string) => void;
}

// Función para ordenar productos por isPurchased, categoría y nombre
const sortShoppingList = (products: ShoppingListProduct[]) => {
  return products.sort((a, b) => {
    if (a.isPurchased !== b.isPurchased) {
      return a.isPurchased ? 1 : -1; // isPurchased primero
    }
    
    const categoryA = a.category ?? ''; // Si es undefined, usar cadena vacía
    const categoryB = b.category ?? '';

    if (categoryA < categoryB) return -1;
    if (categoryA > categoryB) return 1;

    return a.name.localeCompare(b.name); // Ordenar alfabéticamente por nombre
  });
};

const sortProducts = (products: Product[]) => {
  return products.sort((a, b) => {
    const categoryA = a.category ?? ''; // Si es undefined, usar cadena vacía
    const categoryB = b.category ?? '';

    if (categoryA < categoryB) return -1;
    if (categoryA > categoryB) return 1;

    return a.name.localeCompare(b.name); // Ordenar alfabéticamente por nombre
  });
};

export const useSuperStore = create<SuperStoreState>((set) => ({
  products: [],
  shoppingList: [],
  setProducts: (products) => set({ products: sortProducts(products) }), // Asegúrate de que 'products' sea del tipo correcto
  setShoppingList: (shoppingList) => set({ shoppingList: sortShoppingList(shoppingList) }), // Ordenar antes de establecer
  addToShoppingList: (product: ShoppingListProduct) =>
    set((state) => {
      const updatedShoppingList = [...state.shoppingList, product];
      return { shoppingList: sortShoppingList(updatedShoppingList) }; // Ordenar después de agregar
    }),
  removeFromShoppingList: (productId: string) =>
    set((state) => {
      const updatedShoppingList = state.shoppingList.filter((item) => item._id !== productId);
      return { shoppingList: sortShoppingList(updatedShoppingList) }; // Ordenar después de eliminar
    }),
}));
