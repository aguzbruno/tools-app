// services/recipeService.ts

import api from './api';

export const getRecipes = async () => {
  try {
    const response = await api.get('/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Obtén una receta por ID
export const getRecipe = async (id: number) => {
  try {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

// Crear una nueva receta
export const createRecipe = async (recipe: any) => {
  try {
    const response = await api.post('/recipes', recipe);
    return response.data;
  } catch (error) {
    console.error('Error creating recipe:', error);
    throw error;
  }
};

// Actualizar una receta
export const updateRecipe = async (id: number, recipe: any) => {
  try {
    const response = await api.put(`/recipes/${id}`, recipe);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

// Eliminar una receta
export const deleteRecipe = async (id: number) => {
  try {
    await api.delete(`/recipes/${id}`);
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};
