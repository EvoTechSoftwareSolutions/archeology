import { MdCloudUpload } from "react-icons/md";

interface MediaFormProps {
  onBack: () => void;
  onNext: () => void;
}

const MediaForm = ({ onBack, onNext }: MediaFormProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">Media</h2>

      <div className="space-y-8 flex-1">
        {/* Hero Image Upload */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Place Name</label>
          <div className="border border-gray-300 border-dashed rounded-lg h-[280px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer">
            <MdCloudUpload className="text-gray-400 mb-2" size={32} />
            <span className="text-[14px] text-gray-400 font-medium">Upload hero image</span>
            <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wide">PNG, JPG up to 10MB</span>
          </div>
        </div>

        {/* Gallery Uploads */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Gallery</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="border border-gray-300 border-dashed rounded-lg h-[200px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <MdCloudUpload className="text-gray-400 mb-2" size={24} />
                <span className="text-[13px] text-gray-400 font-medium">Upload image</span>
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">PNG, JPG up to 10MB</span>
              </div>
            ))}
          </div>
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

export default MediaForm;
