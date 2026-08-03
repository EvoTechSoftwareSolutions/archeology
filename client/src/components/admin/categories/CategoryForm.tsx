import React from "react";
import type {  CategoryFormData } from "../../../types/category.types";

interface CategoryFormProps {
  formData: CategoryFormData;
  onChange: (data: CategoryFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  saving: boolean;
  isEditing: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  saving,
  isEditing,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => onChange({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none text-sm text-gray-800"
            placeholder="e.g. Ancient City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => onChange({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none resize-none text-sm text-gray-800"
            placeholder="Brief description of the category..."
          />
        </div>
      </div>
      <div className="mt-8 flex gap-3 justify-end pt-4 border-t border-gray-50">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#1E4538] hover:bg-[#15342a] text-white font-medium shadow-sm transition-colors text-sm disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Category"}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;