import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";

interface Category {
  id: number;
  name: string;
  description?: string;
  count: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ??
    (import.meta.env.DEV ? "" : "http://localhost:5000");

  const loadCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/v1/categories`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to load categories");
      }

      const payload = await response.json();
      setCategories(payload.data ?? []);
    } catch (err) {
      console.error(err);
      setError("Unable to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCategories();
  }, []);

  const handleOpenModal = (category: Category | null = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description ?? "" });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
    setError(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const endpoint = editingCategory
      ? `${API_BASE}/api/v1/categories/${editingCategory.id}`
      : `${API_BASE}/api/v1/categories`;
    const method = editingCategory ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || "Unable to save category");
      }

      await loadCategories();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to save category.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/v1/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || "Unable to delete category");
      }

      await loadCategories();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to delete category.");
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description ?? "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full font-['Inter'] relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="text-sm text-gray-500 mb-2">
            Home &gt; Categories
          </div>
          <h1 className="text-4xl font-bold font-serif text-[#2a2a2a] mb-2 tracking-tight">Categories</h1>
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

      {/* Categories Grid */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}
      {loading ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center text-gray-500">
          Loading categories...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10 pb-10">
          {filteredCategories.map(category => (
          <div key={category.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1E4538]/5 text-[#1E4538] flex items-center justify-center font-bold text-xl border border-[#1E4538]/10">
                {category.name.charAt(0)}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleOpenModal(category)}
                  className="p-2 text-gray-400 hover:text-[#1E4538] hover:bg-[#1E4538]/10 rounded-lg transition-colors"
                >
                  <FiEdit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(category.id)}
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
        ))}
          {filteredCategories.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 border-dashed">
              No categories found matching your search.
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h2 className="text-2xl font-bold font-serif text-[#2a2a2a]">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none transition-colors">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
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
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E4538]/20 focus:border-[#1E4538] transition-all outline-none resize-none text-sm text-gray-800"
                    placeholder="Brief description of the category..."
                  />
                </div>
              </div>
              <div className="mt-8 flex gap-3 justify-end pt-4 border-t border-gray-50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1E4538] hover:bg-[#15342a] text-white font-medium shadow-sm transition-colors text-sm"
                >
                  {editingCategory ? 'Save Changes' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
