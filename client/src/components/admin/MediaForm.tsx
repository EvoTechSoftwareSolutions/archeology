import { useRef } from "react";
import { MdCloudUpload, MdClose } from "react-icons/md";

interface MediaFormProps {
  value: {
    heroImage: string;
    galleryImages: string[];
  };
  onHeroImageChange: (value: string) => void;
  onGalleryImageChange: (index: number, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const MediaForm = ({
  value,
  onHeroImageChange,
  onGalleryImageChange,
  onBack,
  onNext,
}: MediaFormProps) => {
  const heroInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleHeroPick = async (file?: File | null) => {
    if (!file) {
      return;
    }

    const imageDataUrl = await readFileAsDataUrl(file);
    onHeroImageChange(imageDataUrl);
  };

  const handleGalleryPick = async (index: number, file?: File | null) => {
    if (!file) {
      return;
    }

    const imageDataUrl = await readFileAsDataUrl(file);
    onGalleryImageChange(index, imageDataUrl);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">Media</h2>

      <div className="space-y-8 flex-1">
        {/* Hero Image Upload */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Hero Image</label>
          <button
            type="button"
            onClick={() => heroInputRef.current?.click()}
            className="w-full border border-gray-300 border-dashed rounded-lg h-[280px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer overflow-hidden relative"
          >
            {value.heroImage ? (
              <>
                <img src={value.heroImage} alt="Hero preview" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <span className="relative z-10 text-[14px] text-white font-semibold">Change hero image</span>
                <span className="relative z-10 mt-1 text-[11px] text-white/80 uppercase tracking-wide">Click to replace</span>
              </>
            ) : (
              <>
                <MdCloudUpload className="text-gray-400 mb-2" size={32} />
                <span className="text-[14px] text-gray-400 font-medium">Upload a featured hero image</span>
                <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wide">PNG, JPG up to 10MB</span>
              </>
            )}
          </button>
          <input
            ref={heroInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (event) => {
              await handleHeroPick(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          {value.heroImage && (
            <button
              type="button"
              onClick={() => onHeroImageChange("")}
              className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-red-600 hover:text-red-700"
            >
              <MdClose size={16} /> Remove hero image
            </button>
          )}
        </div>

        {/* Gallery Uploads */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">Gallery</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => galleryInputRefs.current[index]?.click()}
                className="border border-gray-300 border-dashed rounded-lg h-[200px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer overflow-hidden relative"
              >
                {value.galleryImages[index] ? (
                  <>
                    <img src={value.galleryImages[index]} alt={`Gallery preview ${item}`} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="relative z-10 text-[13px] text-white font-semibold">Replace image {item}</span>
                  </>
                ) : (
                  <>
                    <MdCloudUpload className="text-gray-400 mb-2" size={24} />
                    <span className="text-[13px] text-gray-400 font-medium">Upload image</span>
                    <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">PNG, JPG up to 10MB</span>
                  </>
                )}
              </button>
            ))}
          </div>
          <div className="hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                ref={(element) => {
                  galleryInputRefs.current[index] = element;
                }}
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  await handleGalleryPick(index, event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
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
