// services/superService.ts

import api from './api';

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Obtén un producto por ID
export const getProduct = async (id: number) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (product: any) => {
  try {
    const response = await api.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (id: number, product: any) => {
  try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProduct = async (id: number) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
