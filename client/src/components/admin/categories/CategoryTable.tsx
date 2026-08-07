import React from "react";
import type { Category } from "../../../types/category.types";
import CategoryCard from "./CategoryCard";

interface CategoryTableProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 sm:p-10 text-center text-sm sm:text-base text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="col-span-full py-12 sm:py-16 px-4 text-center text-sm sm:text-base text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
        No categories found matching your search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 relative z-10 pb-10">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CategoryTable;