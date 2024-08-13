    import { useSuperStore } from "../../../store/superStore";
    import toast from "react-hot-toast";
    import {
      saveShoppingHistory,
      clearShoppingList,
      getShoppingList,
    } from "../../../services/superService";
    import SaveButton from "../../Buttons/SaveButton";
    import BombButton from "../../Buttons/BombButton";
    import { useState } from "react";

    interface ShoppingListHeaderProps {
      shoppingList: any[];
    }

    const ShoppingListHeader: React.FC<ShoppingListHeaderProps> = ({
      shoppingList,
    }) => {
      const setShoppingList = useSuperStore((state) => state.setShoppingList);
      const [file, setFile] = useState<File>();

  const [totalPrice, setTotalPrice] = useState<number>(0);
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };
  const handleSaveHistory = async () => {
  const accept = await new Promise<boolean>((resolve) => {
    toast((t) => (
      <div className="flex flex-col w-full items-center justify-center gap-5">
        <p className="text-md">Por favor suba la imagen del ticket</p>
        <div className="flex flex-col gap-3 w-full">
          <input
            type="file"
            onChange={(e) => {
              e.preventDefault();
              e.target.files && setFile(e.target.files[0]);
              console.log(e.target.files);
            }}
            required
          />
          <span>Ingrese el total del ticket</span>
           <input
           className="w-full"
              type="number"
              placeholder="Total Price"
              value={totalPrice}
              onChange={(e) => setTotalPrice(Number(e.target.value))}
              required
            />

        </div>
        <div className="flex gap-2">
          <button
            className="border-2 border-red-700 text-red-700 p-2 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(false);
            }}
          >
            Cancelar
          </button>
          <button
            className="border-2 border-green-700 text-green-700 p-2 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              resolve(true);
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    ));
  });

  if (accept) {
    if (!file) {
      toast.error("Seleccione una imagen antes de guardar.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        await saveShoppingHistory(shoppingList, base64String,totalPrice);
        // await clearShoppingList();
        // const updatedShoppingList = await getShoppingList();
        // setShoppingList(updatedShoppingList);
        toast("Se ha guardado correctamente");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Ha ocurrido un error");
    }
  }
};


      const handleClearShoppingList = async () => {
        let accept = false;
        toast((t) => (
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="text-md">
              ¿Está seguro que quiere vaciar su lista de la compra?
            </p>
            <div className="flex gap-2">
              <button
                className="border-2 border-red-700 text-red-700 p-2 rounded-md"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancelar
              </button>
              <button
                className="border-2 border-green-700 text-green-700 p-2 rounded-md"
                onClick={() => {
                  accept = true;
                  toast.dismiss(t.id);
                }}
              >
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
            <p className="text-xs font-bold text-gray-500">
              {shoppingList?.length} PRODUCTOS
            </p>
            {shoppingList.length > 0 ? (
              <div className="flex items-center gap-2">
                <p className="text-md font-bold text-gray-500">ESTIMADO :</p> €
                {shoppingList
                  .reduce(
                    (acc, product) =>
                      acc +
                      (product.price || 0) *
                        (product.amount ? Number(product.amount) : 1),
                    0
                  )
                  .toFixed(2)}
              </div>
            ) : (
              <label className="text-sm text-black">
                No hay productos en la lista
              </label>
            )}
          </div>
          <div className="flex gap-3">
            <SaveButton onClick={handleSaveHistory}></SaveButton>
            <BombButton onClick={handleClearShoppingList}></BombButton>
          </div>
        </div>
      );
    };

    export default ShoppingListHeader;
