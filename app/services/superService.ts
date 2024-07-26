import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Asegúrate de que esta URL coincida con la configuración de tu API
});

// Productos
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: string) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (product: any) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, product: any) => {
  try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Lista de compras
export const getShoppingList = async () => {
  try {
    const response = await api.get('/shopping-list');
    return response.data;
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    throw error;
  }
};

export const addToShoppingList = async (productId: string) => {
  try {
    console.log(productId)
    const response = await api.post('/shopping-list', { productId });
    console.log(productId,response)
    return response.data;
  } catch (error) {
    console.error('Error adding to shopping list:', error);
    throw error;
  }
};

export const removeFromShoppingList = async (productId: string) => {
  try {
    const response = await api.delete('/shopping-list', { data: { productId } });
    return response.data;
  } catch (error) {
    console.error('Error removing from shopping list:', error);
    throw error;
  }
};
