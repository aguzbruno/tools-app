// types.ts
export interface Product {
  _id: string;
  name: string;
  unit?: string;
  amount?: number;
  price?: number;
  category?: string;
  brand?: string;
}

export interface CreateProductInput extends Omit<Product, '_id'> {}
   
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
  }
  export interface ShoppingListProduct extends Product {
    isPurchased: boolean;
    purchaseDetails: string;
  }
  export interface IShoppingHistory {
    createdAt: string;
    _id: string;
    products: Product[];
    image:string;
    timestamp: string;
  }