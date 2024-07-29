'use client';
import { useEffect, useState } from 'react';
import { getRecipes } from '../../services/recipe';
import { useDarkMode } from '../../store/darkMode';
// components/RecipeList.tsx
import { useRecipeStore } from '../../store/recipeStore';
import Link from 'next/link';

const RecipeList = () => {
    const {darkMode} = useDarkMode();
    const [recipes, setRecipes] = useState<any[]>([]);

    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const data = await getRecipes();
          setRecipes(data);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
  
      fetchRecipes();
    }, []);
  return (
    <div className={`container mx-auto px-4 py-6 bg-white`}>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 text-gray-100">Recetas</h1>
      <Link href="/recipes/add">
        <div className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
          Agregar Receta
        </div>
      </Link>
      <ul className="space-y-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="p-4 bg-gray-100 bg-gray-800 rounded-md shadow-md">
            <Link href={`/recipes/${recipe.id}`}>
              <div className="text-lg font-semibold text-blue-600 text-blue-400 hover:underline">
                {recipe.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
