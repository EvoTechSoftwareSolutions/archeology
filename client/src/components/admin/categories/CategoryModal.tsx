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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/20 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md my-6 sm:my-0 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        <div className="px-5 sm:px-8 py-4 sm:py-6 border-b border-gray-100 flex justify-between items-center gap-3 bg-gray-50/30 shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2a2a2a] break-words min-w-0">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="mx-5 sm:mx-8 mt-4 sm:mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 sm:px-5 py-4 text-sm text-red-700 break-words shrink-0">
            {error}
          </div>
        )}

        <div className="overflow-y-auto">
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
    </div>
  );
};

export default CategoryModal;