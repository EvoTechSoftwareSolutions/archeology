import { useRef } from "react";
import { MdCloudUpload, MdClose } from "react-icons/md";
import FormField from "../common/FormField";
import {
  useMediaValidation,
  type MediaValues,
} from "../../hooks/validations/useMediaValidation";

interface MediaFormProps {
  value: MediaValues;
  galleryTitles?: string[];
  galleryDescriptions?: string[];
  onHeroImageChange: (value: File | null) => void;
  onGalleryImageChange: (index: number, value: File | null) => void;
  onGalleryTitleChange?: (index: number, value: string) => void;
  onGalleryDescriptionChange?: (index: number, value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const MediaForm = ({
  value,
  galleryTitles = [],
  galleryDescriptions = [],
  onHeroImageChange,
  onGalleryImageChange,
  onGalleryTitleChange,
  onGalleryDescriptionChange,
  onBack,
  onNext,
}: MediaFormProps) => {
  const heroInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { errors, validateAll, clearFieldError } = useMediaValidation(value);

  const handleHeroPick = (file?: File | null) => {
    if (!file) return;
    onHeroImageChange(file);
    clearFieldError("heroImage");
  };

  const handleRemoveHero = () => {
    onHeroImageChange(null);
  };

  const handleGalleryPick = (index: number, file?: File | null) => {
    if (!file) return;
    onGalleryImageChange(index, file);
    clearFieldError("galleryImages");
  };

  const handleRemoveGalleryImage = (index: number) => {
    onGalleryImageChange(index, null);
    onGalleryTitleChange?.(index, "");
    onGalleryDescriptionChange?.(index, "");
  };

  const handleContinue = () => {
    if (validateAll()) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 flex flex-col h-full w-full min-w-0">
      <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold font-serif mb-4 sm:mb-6 text-gray-900 tracking-tight">
        Media
      </h2>

      <div className="space-y-6 sm:space-y-8 flex-1">
        {/* Hero Image Upload */}
        <FormField
          label="Hero Image"
          tooltipText="Upload a featured high-resolution hero cover image."
          required
          error={errors.heroImage}
        >
          <button
            type="button"
            onClick={() => heroInputRef.current?.click()}
            className={`w-full border border-dashed rounded-lg h-[200px] sm:h-[240px] lg:h-[280px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer overflow-hidden relative ${
              errors.heroImage ? "border-red-500" : "border-gray-300"
            }`}
          >
            {value.heroImage ? (
              <>
                <img
                  src={URL.createObjectURL(value.heroImage)}
                  alt="Hero preview"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <span className="relative z-10 text-[13px] sm:text-[14px] text-white font-semibold text-center px-4">
                  Change hero image
                </span>
                <span className="relative z-10 mt-1 text-[10px] sm:text-[11px] text-white/80 uppercase tracking-wide">
                  Click to replace
                </span>
              </>
            ) : (
              <>
                <MdCloudUpload className="text-gray-400 mb-2" size={28} />
                <span className="text-[13px] sm:text-[14px] text-gray-400 font-medium text-center px-4">
                  Upload a featured hero image
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 mt-1 uppercase tracking-wide">
                  PNG, JPG up to 10MB
                </span>
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
              onClick={handleRemoveHero}
              className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-red-600 hover:text-red-700"
            >
              <MdClose size={16} /> Remove hero image
            </button>
          )}
        </FormField>

        {/* Gallery Uploads */}
        <FormField
          label="Gallery"
          tooltipText="Upload at least one gallery image with title and description."
          required
          error={errors.galleryImages}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              const galleryFile = value.galleryImages[index];

              return (
                <div key={item} className="flex flex-col min-w-0 bg-gray-50/50 p-3 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => galleryInputRefs.current[index]?.click()}
                    className={`w-full border border-dashed rounded-lg h-[130px] sm:h-[150px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer overflow-hidden relative ${
                      errors.galleryImages && !value.galleryImages.some(Boolean)
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {galleryFile ? (
                      <>
                        <img
                          src={URL.createObjectURL(galleryFile)}
                          alt={`Gallery preview ${item}`}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <span className="relative z-10 text-[11px] sm:text-[13px] text-white font-semibold text-center px-2">
                          Replace image {item}
                        </span>
                      </>
                    ) : (
                      <>
                        <MdCloudUpload className="text-gray-400 mb-1 sm:mb-2" size={20} />
                        <span className="text-[11px] sm:text-[13px] text-gray-400 font-medium text-center px-2">
                          Upload image {item}
                        </span>
                        <span className="hidden sm:block text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                          PNG, JPG up to 10MB
                        </span>
                      </>
                    )}
                  </button>

                  {galleryFile && (
                    <div className="mt-2.5 space-y-2 w-full">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 block mb-0.5">Image Name / Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Vadahitina Maligawa (Inner Chamber)"
                          value={galleryTitles[index] || ""}
                          onChange={(e) => onGalleryTitleChange?.(index, e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 block mb-0.5">Image Description</label>
                        <textarea
                          placeholder="Describe what is shown in this image..."
                          value={galleryDescriptions[index] || ""}
                          onChange={(e) => onGalleryDescriptionChange?.(index, e.target.value)}
                          rows={2}
                          className="w-full text-xs px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#1E604B] bg-white resize-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-red-600 hover:text-red-700 pt-1"
                      >
                        <MdClose size={14} /> Remove image
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
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
          onClick={handleContinue}
          className="w-full sm:w-auto bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          Continue
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MediaForm;