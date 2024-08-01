import Image from "next/image";
import ShoppingProductCard from "../ProductCard/ShoppingProductCard/ShoppingProductCard";
import UpIcon from '../../../assets/up.svg'
import DownIcon from "../../../assets/down.svg";
import "./animation.css";

interface CategoryItemProps {
  category: string;
  productsInCategory: any[];
  openCategories: any;
  toggleCategory: (category: string) => void;
  index: number;
  categoryOrder: string[];
  setCategoryOrder: (order: string[]) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, productsInCategory, openCategories, toggleCategory, index, categoryOrder, setCategoryOrder }) => {
  const handleMoveUp = () => {
    if (index > 0) {
      moveCategory(index, index - 1);
    }
  };

  const handleMoveDown = () => {
    if (index < categoryOrder.length - 1) {
      moveCategory(index, index + 1);
    }
  };

  const moveCategory = (fromIndex: number, toIndex: number) => {
    const newCategoryOrder = Array.from(categoryOrder);
    const [moved] = newCategoryOrder.splice(fromIndex, 1);
    newCategoryOrder.splice(toIndex, 0, moved);
    setCategoryOrder(newCategoryOrder);
    localStorage.setItem("categoryOrder", JSON.stringify(newCategoryOrder));
  };

  return (
    <li className={`category-item ${openCategories[category] ? 'move-up' : ''}`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-row cursor-pointer" style={{ userSelect: "none" }} onClick={() => toggleCategory(category)}>
          <h3 className="font-bold category-header text-xs">{category}</h3>
        </div>
        <div className="flex gap-2">
          <button onClick={handleMoveUp}>
            <Image src={UpIcon} alt="up" width={20} height={20} />
          </button>
          <button onClick={handleMoveDown}>
            <Image src={DownIcon} alt="down" width={20} height={20} />
          </button>
        </div>
      </div>
      {openCategories[category] && (
        <ul className="flex flex-col product-list gap-2">
          {productsInCategory.map((product) => (
            <ShoppingProductCard product={product} key={product._id} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;
