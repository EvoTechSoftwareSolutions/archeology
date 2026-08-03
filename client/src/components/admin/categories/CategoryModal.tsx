import React from "react";
import type { Category, CategoryFormData } from "../../../types/category.types";
import CategoryForm from "./CategoryForm";

interface CategoryModalProps {
  isOpen: boolean;
  editingCategory: Category | null;
  formData: CategoryFormData;
  onChange: (data: CategoryFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  saving: boolean;
  error: string | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  editingCategory,
  formData,
  onChange,
  onSubmit,
  onClose,
  saving,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
          <h2 className="text-2xl font-bold font-serif text-[#2a2a2a]">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mx-8 mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <CategoryForm
          formData={formData}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancel={onClose}
          saving={saving}
          isEditing={!!editingCategory}
        />
      </div>
    </div>
  );
};

export default CategoryModal;