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
    const recetasCustom = [
      "Omelette con ensalada",
      "Ensalada pollo fideos y huevo",
      "Ensalada pollo arroz y huevo",
      "Ensalada pollo lenteja huevo",
      "Pollo y papas",
      "Pollo hongos y arroz",
      "Pollo y ensalada",
      "Mila con puré",
      "Mila con papas al horno",
      "Mila con ensalada",
      "Mila napolitana",
      "Tarta",
      "Tortilla con ensalada",
      "Wok",
      "Albóndigas con puré y salsa",
      "Pastas",
      "Cerdo con ensalada/papas",
      "Tacos",
      "Pastel de pollo",
      "Pollo al champiñón",
      "Burguer",
    ];
    
  return (
    <div className={`container mx-auto px-4 py-6 bg-white`}>
      <h1 className="text-3xl font-bold mb-4 text-gray-900  text-gray-100">Recetas</h1>
      <div className='flex flex-col gap-2'>
      {recetasCustom.map((receta) => (
        <div key={receta} className="p-2 bg-gray-100 bg-gray-200 rounded-md shadow-md">
          {receta}
        </div>
      ))}
      </div>
      <Link href="/recipes/add">
        <div className="mt-5 inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
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
