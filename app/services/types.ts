// types.ts
export interface Product {
    _id: string; // Usamos string porque los IDs de MongoDB son strings
    name: string;
    quantity: string;
    price?: number;
  }
   
  export interface ApiResponse<T> {
    success: boolean;
    data: T;
  }
  