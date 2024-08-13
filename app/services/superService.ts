import axios from 'axios';
import { CreateProductInput, IShoppingHistory, Product, ShoppingListProduct } from './types';

const api = axios.create({
  baseURL: '/api', // Asegúrate de que esta URL coincida con la configuración de tu API
});

// Productos
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (product: CreateProductInput): Promise<Product> => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};


export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Lista de compras
export const getShoppingList = async (): Promise<ShoppingListProduct[]> => {
  try {
    const response = await api.get('/shopping-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    throw error;
  }
};

export const addToShoppingList = async (product: ShoppingListProduct): Promise<ShoppingListProduct> => {
  try {
    const response = await api.post('/shopping-list', { product });
    return response.data;
  } catch (error) {
    console.error('Error adding to shopping list:', error);
    throw error;
  }
};

export const removeFromShoppingList = async (productId: string): Promise<void> => {
  try {
    const response = await api.delete('/shopping-list', { data: { productId } });
    return response.data;
  } catch (error) {
    console.error('Error removing from shopping list:', error);
    throw error;
  }
};
export const updateAmount = async (productId: string, amount: number): Promise<ShoppingListProduct> => {
  try {
    const response = await api.patch(`/shopping-list/amount`, { productId, amount });
    return response.data;
  } catch (error) {
    console.error('Error increasing product quantity:', error);
    throw error;
  }
};

export const updatePurchaseStatus = async (productId: string,isPurchased:boolean): Promise<ShoppingListProduct> => {
  try {
    const response = await api.patch('/shopping-list', { productId,isPurchased});
    return response.data;
  } catch (error) {
    console.error('Error updating purchase status:', error);
    throw error;
  }
};

export const updatePurchaseDetails = async (productId: string, purchaseDetails: string) => {
  const response = await fetch('/api/shopping-list/purchase-details', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, purchaseDetails }),
  });

  if (!response.ok) {
    throw new Error('Error updating purchase detail');
  }

  return await response.json();
};
export async function clearShoppingList(): Promise<void> {
  try {
    const response = await axios.delete('/api/shopping-list/clear');
    return response.data;
  } catch (error) {
    console.error('Error clearing shopping list:', error);
    throw error;
  }
}

// Servicio para obtener los detalles de los productos
export const getProductDetails = async (productIds: string[]): Promise<Product[]> => {
  try {
    const response = await fetch('/api/products', { // Cambia esto según tu endpoint
      method: 'POST',
      body: JSON.stringify({ ids: productIds }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};



export const saveShoppingHistory = async (products: Product[], base64Image: string,totalPrice: number): Promise<void> => {
  try {
    const productIds = products.map(product => product._id);

    const response = await fetch('/api/shopping-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: productIds,
        image: base64Image,
        totalPrice
      }),
    });

    if (!response.ok) {
      throw new Error('Error saving shopping history');
    }

    const result = await response.json();
    console.log('Shopping history saved:', result);
  } catch (error) {
    console.error((error as Error).message);
  }
};



export const getShoppingHistory = async (): Promise<IShoppingHistory[]> => {
  try {
    const response = await fetch('/api/shopping-history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shopping history');
    }

    const data = await response.json();
    return data.data as IShoppingHistory[];
  } catch (error) {
    console.error('Error fetching shopping history:', error);
    return [];
  }
};
