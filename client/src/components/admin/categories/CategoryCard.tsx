import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { Category } from "../../../types/category.types";

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-[#1E4538]/5 text-[#1E4538] flex items-center justify-center font-bold text-xl border border-[#1E4538]/10">
          {category.name.charAt(0)}
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-gray-400 hover:text-[#1E4538] hover:bg-[#1E4538]/10 rounded-lg transition-colors"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
      <h3 className="text-xl font-bold font-serif text-[#2a2a2a] mb-2">{category.name}</h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{category.description}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium bg-gray-50/80 w-fit px-3 py-1.5 rounded-full border border-gray-100">
        <span className="w-2 h-2 rounded-full bg-[#D97757]"></span>
        {category.count} Places
      </div>
    </div>
  );
};

export default CategoryCard;