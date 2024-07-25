// store/recipeStore.ts
import create from 'zustand';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
}

interface RecipeStore {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  getRecipe: (id: number) => Recipe | undefined;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
  getRecipe: (id) => get().recipes.find((recipe) => recipe.id === id),
}));
