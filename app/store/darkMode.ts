// store/recipeStore.ts
import create from 'zustand';

interface DarkModeStore {
  darkMode: boolean;
  setDarkMode: (darkMode: string) => void;
}

export const useDarkMode = create<DarkModeStore>((set, get) => ({
  darkMode: false,
  setDarkMode: (darkMode) => set({ darkMode: darkMode === 'dark' }),
}));
