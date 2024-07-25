import create from 'zustand';

interface Product {
  id: number;
  name: string;
  quantity: string;
  price?: number; // El campo precio es opcional
}

interface SuperStore {
  products: Product[];
  shoppingList: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  addToShoppingList: (product: Product) => void;
  removeFromShoppingList: (id: number) => void;
  getProduct: (id: number) => Product | undefined;
}

export const useSuperStore = create<SuperStore>((set, get) => ({
  products: [],
  shoppingList: [],
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  removeProduct: (id) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
  addToShoppingList: (product) => {
    const { shoppingList } = get();
    const exists = shoppingList.some((p) => p.id === product.id);
    if (!exists) {
      set((state) => ({ shoppingList: [...state.shoppingList, product] }));
    }
  },
  removeFromShoppingList: (id) => set((state) => ({
    shoppingList: state.shoppingList.filter((product) => product.id !== id)
  })),
  getProduct: (id) => get().products.find((product) => product.id === id),
}));
