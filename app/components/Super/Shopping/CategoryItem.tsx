import React from "react";
import ShoppingProductCard from "./../ProductCard/ShoppingProductCard/ShoppingProductCard";
import { ShoppingListProduct } from "@/app/services/types";

interface CategoryItemProps {
  category: string;
  productsInCategory: ShoppingListProduct[];
  openCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
  totalProducts: number;
  boughtProducts: number; // Nueva prop
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  productsInCategory,
  openCategories,
  toggleCategory,
  totalProducts,
  boughtProducts,
}) => {
  return (
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
      </div>
      {openCategories[category] && (
        <ul className="flex flex-col product-list gap-2">
          {productsInCategory?.map((product) => (
            <ShoppingProductCard product={product} key={product._id} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoryItem;
