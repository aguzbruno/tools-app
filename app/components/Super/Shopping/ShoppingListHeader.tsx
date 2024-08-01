import { useSuperStore } from "../../../store/superStore";
import Image from "next/image";
import Save from "../../../assets/save.svg";
import Bomb from "../../../assets/bomb.svg";
import toast from "react-hot-toast";
import { saveShoppingHistory, clearShoppingList, getShoppingList } from "../../../services/superService";

interface ShoppingListHeaderProps {
  shoppingList: any[];
}

const ShoppingListHeader: React.FC<ShoppingListHeaderProps> = ({ shoppingList }) => {
  const setShoppingList = useSuperStore((state) => state.setShoppingList);

  const handleSaveHistory = async () => {
    let accept = false;
    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-md">¿Está seguro que quiere guardar? Esto guardará y vaciará su lista de la compra.</p>
        <div className="flex gap-2">
          <button className="border-2 border-red-700 text-red-700 p-2 rounded-md" onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </button>
          <button className="border-2 border-green-700 text-green-700 p-2 rounded-md" onClick={() => { accept = true; toast.dismiss(t.id); }}>
            Aceptar
          </button>
        </div>
      </div>
    ));

    if (accept) {
      await saveShoppingHistory(shoppingList);
      toast("Se ha guardado correctamente");
    }
  };

  const handleClearShoppingList = async () => {
    let accept = false;
    toast((t) => (
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-md">¿Está seguro que quiere vaciar su lista de la compra?</p>
        <div className="flex gap-2">
          <button className="border-2 border-red-700 text-red-700 p-2 rounded-md" onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </button>
          <button className="border-2 border-green-700 text-green-700 p-2 rounded-md" onClick={() => { accept = true; toast.dismiss(t.id); }}>
            Aceptar
          </button>
        </div>
      </div>
    ));

    if (accept) {
      await clearShoppingList();
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
      toast("Se han eliminado todos los productos de la lista");
    }
  };

  return (
    <div className="flex flex-row justify-between items-center mb-4">
      <div className="flex flex-col">
        <p className="text-xs font-bold text-gray-300">LISTA DEL SUPER</p>
        <p className="text-xs font-bold text-gray-500">{shoppingList?.length} PRODUCTOS</p>
        {shoppingList.length > 0 ? (
          <div className="flex items-center gap-2">
            
            <p className="text-md font-bold text-gray-500">ESTIMADO :</p> €
            {shoppingList.reduce((acc, product) => acc + (product.price || 0) * (product.amount ? Number(product.amount) : 1), 0).toFixed(2)}
          </div>
        ) : (
          <label className="text-sm text-black">No hay productos en la lista</label>
        )}
      </div>
      <div className="flex gap-3">
        <div className="cursor-pointer border-2 border-green-700 rounded-xl px-1 pt-1">
          <Image onClick={handleSaveHistory} height={30} width={30} src={Save} alt="Guardar" />
        </div>
        <div className="cursor-pointer border-2 border-red-700 rounded-xl px-1 pt-1">
          <Image onClick={handleClearShoppingList} src={Bomb} alt="Vaciar" width={30} height={30} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingListHeader;
