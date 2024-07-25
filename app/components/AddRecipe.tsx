'use client';
import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';
import { useRouter } from 'next/navigation';
import { useDarkMode } from '../store/darkMode';
import { createRecipe } from '../services/recipe';

const AddRecipe = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [image, setImage] = useState('');
    const router = useRouter();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        await createRecipe({
          title,
          description,
          ingredients: ingredients.split(','),
          image,
        });
        router.push('/recipes');
      } catch (error) {
        console.error('Error adding recipe:', error);
      }
    };

  return (
    <div className={`container mx-auto px-4 py-6 `}>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Agregar Receta</h1>
      <form onSubmit={handleSubmit} className="bg-white bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 text-gray-300">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="ingredients" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Ingredientes (separados por comas)</label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredientes"
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700 dark:text-gray-300">URL de la imagen</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL de la imagen"
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
