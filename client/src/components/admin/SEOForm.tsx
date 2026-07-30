interface SEOFormProps {
  onBack: () => void;
  onNext: () => void;
}

const SEOForm = ({ onBack, onNext }: SEOFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">SEO</h2>

      <div className="space-y-6 flex-1 pt-2">
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">SEO Title</label>
          <input
            type="text"
            placeholder="A short, keyword-rich page title"
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>

        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Meta Description</label>
          <textarea
            placeholder="Describe the place in 150-160 characters for search engines"
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </div>

        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">URL Slug</label>
          <input
            type="text"
            placeholder="e.g. sigiriya-rock-fortress"
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>

        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Focus Keywords</label>
          <input
            type="text"
            placeholder="e.g. heritage site, ancient fortress, Sri Lanka tourism"
            className="w-full border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 mt-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-[14px] font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center gap-2 shadow-sm"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SEOForm;
