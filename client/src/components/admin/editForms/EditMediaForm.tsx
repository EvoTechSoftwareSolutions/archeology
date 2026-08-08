import { useRef, useEffect, useState } from "react";
import { MdCloudUpload, MdClose, MdOutlineSave } from "react-icons/md";

// Replace with your actual backend API base URL or process.env variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface EditMediaFormProps {
  value: {
    heroImage: File | string | null;
    galleryImages: (File | string | null)[];
  };
  galleryTitles?: string[];
  galleryDescriptions?: string[];

  onHeroImageChange: (value: File | string | null) => void;
  onGalleryImageChange: (
    index: number,
    value: File | string | null
  ) => void;
  onGalleryTitleChange?: (index: number, value: string) => void;
  onGalleryDescriptionChange?: (index: number, value: string) => void;

  onBack: () => void;
  onNext: () => void;
  onSave?: () => void;
  submitting?: boolean;
}

// Helper to convert relative DB image paths to full absolute URLs
const getAbsoluteImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }
  // Remove duplicate leading slashes if present
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${cleanPath}`;
};

// Sub-component to safely render image preview and revoke Object URLs cleanly
const MediaPreview = ({
  fileOrUrl,
  alt,
}: {
  fileOrUrl: File | string | null;
  alt: string;
}) => {
  const [previewSrc, setPreviewSrc] = useState<string>("");

  useEffect(() => {
    if (!fileOrUrl) {
      setPreviewSrc("");
      return;
    }

    if (fileOrUrl instanceof File) {
      const objectUrl = URL.createObjectURL(fileOrUrl);
      setPreviewSrc(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    if (typeof fileOrUrl === "string") {
      setPreviewSrc(getAbsoluteImageUrl(fileOrUrl));
    }
  }, [fileOrUrl]);

  if (!previewSrc) return null;

  return (
    <img
      src={previewSrc}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover"
      onError={(e) => {
        // Fallback or logger if image fails to load from server
        console.error("Failed to load image at src:", previewSrc);
      }}
    />
  );
};

const EditMediaForm = ({
  value,
  galleryTitles = [],
  galleryDescriptions = [],
  onHeroImageChange,
  onGalleryImageChange,
  onGalleryTitleChange,
  onGalleryDescriptionChange,
  onBack,
  onNext,
  onSave,
  submitting = false,
}: EditMediaFormProps) => {
  const heroInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleHeroPick = (file?: File | null) => {
    if (!file) return;
    onHeroImageChange(file);
  };

  const handleGalleryPick = (index: number, file?: File | null) => {
    if (!file) return;
    onGalleryImageChange(index, file);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col h-full">
      <h2 className="text-[24px] font-bold font-serif mb-6 text-gray-900 tracking-tight">
        Edit Media
      </h2>

      <div className="space-y-8 flex-1">
        {/* Hero Image Upload */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Hero Image
          </label>
          <button
            type="button"
            onClick={() => heroInputRef.current?.click()}
            className="w-full border border-gray-300 border-dashed rounded-lg h-[280px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer overflow-hidden relative group"
          >
            {value.heroImage ? (
              <>
                <MediaPreview fileOrUrl={value.heroImage} alt="Hero preview" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white z-10" />
                <span className="relative z-20 text-[14px] text-white font-semibold">
                  Change hero image
                </span>
                <span className="relative z-20 mt-1 text-[11px] text-white/80 uppercase tracking-wide">
                  Click to replace
                </span>
              </>
            ) : (
              <>
                <MdCloudUpload className="text-gray-400 mb-2" size={32} />
                <span className="text-[14px] text-gray-400 font-medium">
                  Upload a featured hero image
                </span>
                <span className="text-[11px] text-gray-400 mt-1 uppercase tracking-wide">
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
            onChange={(event) => {
              handleHeroPick(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          {value.heroImage && (
            <button
              type="button"
              onClick={() => onHeroImageChange(null)}
              className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-red-600 hover:text-red-700 cursor-pointer"
            >
              <MdClose size={16} /> Remove hero image
            </button>
          )}
        </div>

        {/* Gallery Uploads */}
        <div>
          <label className="block text-[14px] font-bold text-gray-800 mb-2">
            Gallery Images
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              const galleryItem = value.galleryImages[index];
              return (
                <div key={item} className="flex flex-col bg-gray-50/50 p-3 rounded-lg border border-gray-200">
                  <button
                    type="button"
                    onClick={() => galleryInputRefs.current[index]?.click()}
                    className="border border-gray-300 border-dashed rounded-lg h-[160px] flex flex-col items-center justify-center bg-white hover:bg-gray-50 transition-colors cursor-pointer overflow-hidden relative group w-full"
                  >
                    {galleryItem ? (
                      <>
                        <MediaPreview
                          fileOrUrl={galleryItem}
                          alt={`Gallery preview ${item}`}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white z-10" />
                        <span className="relative z-20 text-[13px] text-white font-semibold">
                          Replace image {item}
                        </span>
                      </>
                    ) : (
                      <>
                        <MdCloudUpload className="text-gray-400 mb-2" size={24} />
                        <span className="text-[13px] text-gray-400 font-medium">
                          Upload image {item}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                          PNG, JPG up to 10MB
                        </span>
                      </>
                    )}
                  </button>

                  {galleryItem && (
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
                        onClick={() => {
                          onGalleryImageChange(index, null);
                          onGalleryTitleChange?.(index, "");
                          onGalleryDescriptionChange?.(index, "");
                        }}
                        className="inline-flex items-center gap-1 text-[12px] font-medium text-red-600 hover:text-red-700 cursor-pointer pt-1"
                      >
                        <MdClose size={14} /> Remove image {item}
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
                className="hidden"
                onChange={(event) => {
                  handleGalleryPick(index, event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-8 mt-auto border-t border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-[14px] font-medium transition-colors cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        <div className="flex items-center gap-3">
          {onSave && (
            <button
              type="button"
              onClick={onSave}
              disabled={submitting}
              className="border border-[#1E604B] text-[#1E604B] hover:bg-[#1E604B]/5 px-6 py-2.5 rounded-md text-[14px] font-medium transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <MdOutlineSave size={18} />
              {submitting ? "Saving..." : "Save Changes"}
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            className="bg-[#1E604B] text-white px-8 py-2.5 rounded-md text-[14px] font-medium hover:bg-[#144b3a] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
          >
            Continue
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMediaForm;