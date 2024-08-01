interface CategoryToggleButtonsProps {
  showOpenButton: boolean;
  toggleAllCategories: (open: boolean) => void; // Cambiamos esto
  onHideBoughtChange: (isChecked: boolean) => void;
}

const CategoryToggleButtons: React.FC<CategoryToggleButtonsProps> = ({ showOpenButton, toggleAllCategories, onHideBoughtChange }) => {
  return (
    <div className="flex justify-between mb-4 w-full ">
      {showOpenButton ? (
        <button className="text-xs border-2 border-green-700 text-black p-2 rounded" onClick={() => toggleAllCategories(true)}>
          Abrir todas las categorías
        </button>
      ) : (
        <button className="text-xs border-2 border-red-700 text-black p-2 rounded" onClick={() => toggleAllCategories(false)}>
          Cerrar todas las categorías
        </button>
      )}
      <div className="flex flex-row gap-1 items-center w-1/3">
        <input
          type="checkbox"
          className=" size-10 border-2 border-red-700 text-black p-1 rounded-xl"
          onChange={(e) => onHideBoughtChange(e.target.checked)}
        />
        <p className="text-xs"> Ocultar productos comprados</p>
      </div>
    </div>
  );
};

export default CategoryToggleButtons;
