import { getShoppingList, updateAmount } from "@/app/services/superService";
import { ShoppingListProduct } from "@/app/services/types";
import { useSuperStore } from "@/app/store/superStore";

const AmountControls: React.FC<{ product: ShoppingListProduct }> = ({
  product,
}) => {
  const { setShoppingList } = useSuperStore();
  const handleUpdateAmount = async (productId: string, amount: number) => {
    try {
      await updateAmount(productId, amount);
      const updatedShoppingList = await getShoppingList();
      setShoppingList(updatedShoppingList);
    } catch (error) {
      console.error("Error updating product amount:", error);
    }
  };
  return (
    <div className="flex items-center gap-1 ml-2">
      {product.amount && product.amount > 1 && (
        <button
        className=' text-xs text-black border-2 border-gray-500 rounded-xl px-1' 
          
          onClick={() =>
            handleUpdateAmount(
              product._id,
              product.amount ? Number(product.amount) - 1 : 1
            )
          }
        >
          -
        </button>
      )}
      <button
        onClick={() =>
          handleUpdateAmount(
            product._id,
            product.amount ? Number(product.amount) + 1 : 2
          )
        }
        className=' text-xs text-black border-2 border-green-700 rounded-xl px-1 ' 
      >
        +
      </button>
    </div>
  );
};
export default AmountControls;
