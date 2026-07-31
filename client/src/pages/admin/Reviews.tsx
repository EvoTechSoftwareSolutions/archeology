import React, { useEffect, useState, useRef } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiX, FiStar, FiUser,
  FiEye, FiEyeOff, FiMoreHorizontal, FiUpload
} from "react-icons/fi";
import { Link } from "react-router-dom";

interface Review {
  id: number;
  reviewerName: string;
  reviewerRole: string | null;
  image: string | null;
  rating: number;
  reviewText: string;
  isActive: boolean;
  createdAt: string;
}

const API = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
  : "/api/v1";

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [viewingReview, setViewingReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    reviewerName: "",
    reviewerRole: "",
    rating: 5,
    reviewText: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/reviews?all=true`, { credentials: "include" });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.message || "Failed to load reviews");
      }
      setReviews(json.data ?? []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadReviews(); }, []);

  const openModal = (review: Review | null = null) => {
    setOpenMenuId(null);
    if (review) {
      setEditingReview(review);
      setFormData({
        reviewerName: review.reviewerName,
        reviewerRole: review.reviewerRole ?? "",
        rating: review.rating,
        reviewText: review.reviewText,
        isActive: review.isActive,
      });
      setImagePreview(review.image ?? "");
    } else {
      setEditingReview(null);
      setFormData({ reviewerName: "", reviewerRole: "", rating: 5, reviewText: "", isActive: true });
      setImagePreview("");
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
    setImageFile(null);
    setImagePreview("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // 1. Upload image first if a new file is selected
      let imageUrl = editingReview?.image ?? null;
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);
        const upRes = await fetch(`${API}/upload`, { method: "POST", body: uploadData });
        const upJson = await upRes.json();
        if (upJson.success) imageUrl = upJson.data.url;
      }

      // 2. Save review
      const payload = {
        reviewerName: formData.reviewerName,
        reviewerRole: formData.reviewerRole || undefined,
        image: imageUrl || undefined,
        rating: formData.rating,
        reviewText: formData.reviewText,
        isActive: formData.isActive,
      };

      const url = editingReview
        ? `${API}/reviews/${editingReview.id}`
        : `${API}/reviews`;
      const method = editingReview ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save review");

      await loadReviews();
      closeModal();
    } catch {
      setError("Failed to save review");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    setOpenMenuId(null);
    if (!window.confirm("Delete this review?")) return;
    try {
      await fetch(`${API}/reviews/${id}`, { method: "DELETE", credentials: "include" });
      setReviews(prev => prev.filter(r => r.id !== id));
    } catch {
      setError("Failed to delete review");
    }
  };

  const handleToggleActive = async (review: Review) => {
    setOpenMenuId(null);
    try {
      const res = await fetch(`${API}/reviews/${review.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ isActive: !review.isActive }),
      });
      const json = await res.json();
      if (json.success) {
        setReviews(prev => prev.map(r => r.id === review.id ? { ...r, isActive: !review.isActive } : r));
      }
    } catch {
      setError("Failed to update review status");
    }
  };

  const renderStars = (rating: number, interactive = false, onChange?: (r: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange?.(star)}
            className={`${interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}`}
          >
            <FiStar
              size={interactive ? 22 : 14}
              className={star <= rating ? "text-[#C89B3C] fill-[#C89B3C]" : "text-gray-300"}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="font-['Inter'] pb-10">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/admin" className="hover:text-gray-900">Home</Link> &gt; Visitor Reviews
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-['Playfair_Display'] font-bold text-gray-900 mb-1">Visitor Reviews</h1>
          <p className="text-gray-500 text-sm">Manage testimonials and visitor reviews shown on the website.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => void loadReviews()}
          className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          Refresh
        </button>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#275949] rounded-lg text-sm font-semibold text-white hover:bg-[#1E4538] transition-colors shadow-sm"
        >
          <FiPlus size={16} /> Add Review
        </button>
      </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Reviews", value: reviews.length, color: "text-[#275949]" },
          { label: "Active", value: reviews.filter(r => r.isActive).length, color: "text-green-600" },
          { label: "Hidden", value: reviews.filter(r => !r.isActive).length, color: "text-amber-600" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-100 text-sm text-red-600 rounded-xl flex justify-between items-center">
          {error}
          <button onClick={() => setError(null)}><FiX /></button>
        </div>
      )}

      {/* Reviews Grid */}
      {loading ? (
        <div className="text-sm text-gray-400 text-center py-16">Loading reviews…</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
          <FiStar className="mx-auto text-gray-300 mb-4" size={40} />
          <p className="text-gray-400 font-medium">No reviews yet. Add the first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div
              key={review.id}
              className={`bg-white rounded-2xl border p-6 shadow-sm relative transition-all ${
                review.isActive ? "border-gray-100" : "border-amber-200 opacity-70"
              }`}
            >
              {/* Action menu */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setOpenMenuId(openMenuId === review.id ? null : review.id)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiMoreHorizontal size={18} />
                </button>
                {openMenuId === review.id && (
                  <div className="absolute right-0 top-10 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-1 overflow-hidden">
                    <button
                      onClick={() => { setViewingReview(review); setOpenMenuId(null); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiEye size={13} /> View
                    </button>
                    <button
                      onClick={() => openModal(review)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FiEdit2 size={13} /> Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(review)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                      {review.isActive ? <><FiEyeOff size={13} /> Hide</> : <><FiEye size={13} /> Show</>}
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Review content */}
              <div className="flex items-center gap-4 mb-4">
                {review.image ? (
                  <img
                    src={review.image}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 flex-shrink-0"
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#275949] to-[#1C5F46] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900 text-[15px]">{review.reviewerName}</h3>
                  <p className="text-gray-400 text-[12px]">{review.reviewerRole ?? "Visitor"}</p>
                </div>
              </div>

              {renderStars(review.rating)}

              <p className="mt-3 text-gray-600 text-[0.9rem] leading-relaxed line-clamp-4">
                "{review.reviewText}"
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  review.isActive ? "bg-green-50 text-green-600 border border-green-200" : "bg-amber-50 text-amber-600 border border-amber-200"
                }`}>
                  {review.isActive ? "Active" : "Hidden"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {viewingReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={() => setViewingReview(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#2a2a2a]">Review Details</h2>
                <p className="text-sm text-gray-500">Full review details and status.</p>
              </div>
              <button onClick={() => setViewingReview(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiX size={22} />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                {viewingReview.image ? (
                  <img
                    src={viewingReview.image}
                    alt={viewingReview.reviewerName}
                    className="w-20 h-20 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#275949] text-white flex items-center justify-center text-2xl font-bold">
                    {viewingReview.reviewerName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{viewingReview.reviewerName}</h3>
                  <p className="text-sm text-gray-500">{viewingReview.reviewerRole ?? "Visitor"}</p>
                  <div className="mt-2">{renderStars(viewingReview.rating)}</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Review Text</h4>
                <p className="text-gray-600 leading-relaxed">{viewingReview.reviewText}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-2">Status</p>
                  <p className={`font-semibold ${viewingReview.isActive ? "text-green-700" : "text-amber-700"}`}>
                    {viewingReview.isActive ? "Active" : "Hidden"}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase mb-2">Created</p>
                  <p className="font-semibold text-gray-900">{new Date(viewingReview.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setViewingReview(null)}
                  className="px-5 py-2.5 bg-[#275949] text-white rounded-xl text-sm font-medium hover:bg-[#1E4538] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-2xl font-bold font-['Playfair_Display'] text-[#2a2a2a]">
                {editingReview ? "Edit Review" : "Add New Review"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-5">
              {/* Reviewer Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Photo</label>
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#275949] transition-colors flex-shrink-0"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <FiUser size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <FiUpload size={14} /> Upload Photo
                    </button>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reviewer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.reviewerName}
                  onChange={e => setFormData({ ...formData, reviewerName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm"
                  placeholder="e.g. Dr. Himali Perera"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role / Designation</label>
                <input
                  type="text"
                  value={formData.reviewerRole}
                  onChange={e => setFormData({ ...formData, reviewerRole: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm"
                  placeholder="e.g. Researcher, Travel Blogger"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                {renderStars(formData.rating, true, r => setFormData({ ...formData, rating: r }))}
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Text *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.reviewText}
                  onChange={e => setFormData({ ...formData, reviewText: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#275949]/20 focus:border-[#275949] outline-none text-sm resize-none"
                  placeholder="What did the visitor say about their experience?"
                />
              </div>

              {/* Active toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-700">Show on website</p>
                  <p className="text-xs text-gray-400">Active reviews appear in the public reviews section</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${formData.isActive ? "bg-[#275949]" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${formData.isActive ? "translate-x-5" : ""}`} />
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl text-gray-600 font-medium hover:bg-gray-100 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-[#275949] hover:bg-[#1E4538] text-white font-medium shadow-sm transition-colors text-sm disabled:opacity-60"
                >
                  {isSaving ? "Saving…" : editingReview ? "Save Changes" : "Add Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Click outside to close action menu */}
      {openMenuId && (
        <div className="fixed inset-0 z-30" onClick={() => setOpenMenuId(null)} />
      )}
    </div>
  );
};

export default Reviews;
