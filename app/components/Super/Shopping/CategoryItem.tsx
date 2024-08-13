import React from "react";
import ShoppingProductCard from "./../ProductCard/ShoppingProductCard/ShoppingProductCard";
import { ShoppingListProduct } from "@/app/services/types";
import UpIcon from "../../../assets/up.svg";
import DownIcon from "../../../assets/down.svg";
import Image from "next/image";

interface CategoryItemProps {
  category: string;
  productsInCategory: ShoppingListProduct[];
  openCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
  totalProducts: number;
  boughtProducts: number; // Nueva prop
  categoryOrder: string[];
  setCategoryOrder: (categoryOrder: string[]) => void;
  index: number;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  productsInCategory,
  openCategories,
  toggleCategory,
  totalProducts,
  boughtProducts,
  categoryOrder,
  setCategoryOrder,
  index,
}) => {
  const moveCategory = (fromIndex: number, toIndex: number) => {
    const newCategoryOrder = Array.from(categoryOrder);
    const [moved] = newCategoryOrder.splice(fromIndex, 1);
    newCategoryOrder.splice(toIndex, 0, moved);
    setCategoryOrder(newCategoryOrder);
    localStorage.setItem("categoryOrder", JSON.stringify(newCategoryOrder));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      moveCategory(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < categoryOrder.length - 1) {
      moveCategory(index, index + 1);
    }
  };
  return (
    totalProducts &&
    totalProducts > 0 && (
      <li>
        <div className="flex justify-between items-center">
          <div
            className="flex flex-row cursor-pointer"
            style={{ userSelect: "none" }}
            onClick={() => toggleCategory(category)}
          >
            <h3 className="font-bold category-header text-xs">
              {category}
              <span className="ml-2 text-sm text-gray-500">
                {boughtProducts}/{totalProducts}
              </span>
            </h3>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleMoveUp(index)}>
              <Image src={UpIcon} alt="up" width={20} height={20} />
            </button>
            <button onClick={() => handleMoveDown(index)}>
              <Image src={DownIcon} alt="down" width={20} height={20} />
            </button>
          </div>
        </div>

        {openCategories[category] && (
          <ul className="flex flex-col product-list gap-2">
            {productsInCategory?.map((product) => (
              <ShoppingProductCard product={product} key={product._id} />
            ))}
          </ul>
        )}
      </li>
    )
  );
};

export default CategoryItem;
