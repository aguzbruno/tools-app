// store/superStore.ts
import create from 'zustand';
import { Product } from '../services/types';

interface SuperStoreState {
  products: Product[];
  shoppingList: Product[];
  setProducts: (products: Product[]) => void;
  setShoppingList: (shoppingList: Product[]) => void;
  addToShoppingList: (product: Product) => void;
  removeFromShoppingList: (productId: string) => void;
}

export const useSuperStore = create<SuperStoreState>((set) => ({
  products: [],
  shoppingList: [],
  setProducts: (products) => set({ products }),
  setShoppingList: (shoppingList) => set({ shoppingList }),
  addToShoppingList: (product) =>
    set((state) => ({
      shoppingList: [...state.shoppingList, product],
    })),
  removeFromShoppingList: (productId) =>
    set((state) => ({
      shoppingList: state.shoppingList.filter((item) => item._id !== productId),
    })),
}));
