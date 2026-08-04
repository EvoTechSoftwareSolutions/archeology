import React from "react";
import { MdOutlineSave, MdArrowBack } from "react-icons/md";

export interface EditSEOFormProps {
  value: {
    seoTitle: string;
    metaDescription: string;
    slug: string;
    focusKeywords: string;
  };
  onChange: (
    field: "seoTitle" | "metaDescription" | "slug" | "focusKeywords",
    value: string
  ) => void;
  onBack: () => void;
  onSave: () => void;
  submitting?: boolean;
}

const EditSEOForm: React.FC<EditSEOFormProps> = ({
  value,
  onChange,
  onBack,
  onSave,
  submitting = false,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">
        Edit Search Engine Optimization (SEO)
      </h2>

      <div className="space-y-6 flex-1 pt-2">
        {/* SEO Title */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            SEO Title
          </label>
          <input
            type="text"
            placeholder="e.g. Sigiriya Rock Fortress - History & Visiting Guide"
            value={value.seoTitle}
            onChange={(e) => onChange("seoTitle", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Meta Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief summary for search engine results..."
            value={value.metaDescription}
            onChange={(e) => onChange("metaDescription", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>

        {/* URL Slug */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            URL Slug
          </label>
          <input
            type="text"
            placeholder="e.g. sigiriya-rock-fortress"
            value={value.slug}
            onChange={(e) => onChange("slug", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>

        {/* Focus Keywords */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Focus Keywords
          </label>
          <input
            type="text"
            placeholder="e.g. sigiriya, sri lanka history, ancient fortress"
            value={value.focusKeywords}
            onChange={(e) => onChange("focusKeywords", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 mt-auto border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <MdArrowBack size={18} />
          Back
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={submitting}
          className="bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <MdOutlineSave size={18} />
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditSEOForm;