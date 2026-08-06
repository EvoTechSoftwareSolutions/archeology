import FormField from "../common/FormField";

interface SEOFormProps {
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
  onPublish: () => void;
}

const SEOForm = ({ value, onChange, onBack, onPublish }: SEOFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col h-full w-full min-w-0">
      <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold font-serif mb-4 sm:mb-6 text-gray-900 tracking-tight">
        SEO
      </h2>

      <div className="space-y-5 sm:space-y-6 flex-1 pt-2">
        {/* SEO Title */}
        <FormField
          label="SEO Title"
          tooltipText="The main title displayed in search engine results (e.g., Google). Keep it concise and include your key term."
        >
          <input
            type="text"
            placeholder="A short, keyword-rich page title"
            value={value.seoTitle}
            onChange={(event) => onChange("seoTitle", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </FormField>

        {/* Meta Description */}
        <FormField
          label="Meta Description"
          tooltipText="A brief summary shown under the title in search results. Write a compelling phrase (150-160 characters) to encourage clicks."
        >
          <textarea
            placeholder="Describe the place in 150-160 characters for search engines"
            rows={4}
            value={value.metaDescription}
            onChange={(event) => onChange("metaDescription", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] resize-none"
          />
        </FormField>

        {/* URL Slug */}
        <FormField
          label="URL Slug"
          tooltipText="The user-friendly address end of your page URL (e.g., website.com/sigiriya-rock-fortress). Use lowercase letters and hyphens instead of spaces."
        >
          <input
            disabled
            type="text"
            placeholder="e.g. sigiriya-rock-fortress"
            value={value.slug}
            onChange={(event) => onChange("slug", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B] truncate"
          />
        </FormField>

        {/* Focus Keywords */}
        <FormField
          label="Focus Keywords"
          tooltipText="Important search phrases people might type into Google to find this page. Separate multiple phrases with commas."
        >
          <input
            type="text"
            placeholder="e.g. heritage site, ancient fortress, Sri Lanka tourism"
            value={value.focusKeywords}
            onChange={(event) => onChange("focusKeywords", event.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg p-3 text-[14px] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#1E604B] focus:border-[#1E604B]"
          />
        </FormField>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-6 sm:pt-8 mt-auto">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 hover:text-gray-700 text-[14px] font-medium transition-colors py-2 sm:py-0"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="button"
          onClick={onPublish}
          className="w-full sm:w-auto bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          Publish
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SEOForm;