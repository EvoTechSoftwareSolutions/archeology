import React, { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import type { Category, CategoryFormData } from "../../types/category.types";
import { useCategories } from "../../hooks/useCategories";
import CategoryTable from "../../components/admin/categories/CategoryTable";
import CategoryModal from "../../components/admin/categories/CategoryModal";

const EMPTY_FORM: CategoryFormData = { name: "", description: "" };

const Categories = () => {
  const { categories, loading, reload, create, update, remove } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const handleOpenModal = (category: Category | null = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description ?? "" });
    } else {
      setEditingCategory(null);
      setFormData(EMPTY_FORM);
    }
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData(EMPTY_FORM);
    setModalError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setSaving(true);

    try {
      if (editingCategory) {
        await update(editingCategory.id, formData);
      } else {
        await create(formData);
      }
      await reload();
      handleCloseModal();
    } catch (err) {
      setModalError(err instanceof Error ? err.message : "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setListError(null);

    try {
      await remove(id);
      await reload();
    } catch (err) {
      setListError(err instanceof Error ? err.message : "Unable to delete category.");
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full font-['Inter'] relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="text-sm text-gray-500 mb-2">Home &gt; Categories</div>
          <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-2 tracking-tight">
            Categories
          </h1>
          <p className="text-gray-500 text-sm">Manage category classifications for historical places.</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-[#1E4538] hover:bg-[#15342a] text-white px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-colors shadow-sm"
        >
          <FiPlus size={18} />
          Add Category
        </button>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-8 flex items-center gap-4 relative z-10 border border-gray-100/50">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border-none rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 transition-all text-sm outline-none"
          />
        </div>
      </div>

      {/* List error (delete failures) */}
      {listError && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {listError}
        </div>
      )}

      {/* Categories */}
      <CategoryTable
        categories={filteredCategories}
        loading={loading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      {/* Add/Edit Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        editingCategory={editingCategory}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSave}
        onClose={handleCloseModal}
        saving={saving}
        error={modalError}
      />
    </div>
  );
};

export default Categories;