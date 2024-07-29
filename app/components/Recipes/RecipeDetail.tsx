'use client';
import { useRecipeStore } from '../../store/recipeStore';
import { useParams } from 'next/navigation';

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) => state.getRecipe(Number(id)));

  if (!recipe) return <div className="text-center text-gray-900 dark:text-gray-100">Receta no encontrada</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-700 dark:text-gray-300 mb-4">{recipe.description}</p>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Ingredientes</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-2">{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetail;
