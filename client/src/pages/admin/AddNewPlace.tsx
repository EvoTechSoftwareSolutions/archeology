import { useEffect, useMemo, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import AddNewPlaceSidebar from "../../components/admin/AddNewPlaceSidebar";
import BasicInformationForm from "../../components/admin/BasicInformationForm";
import MediaForm from "../../components/admin/MediaForm";
import FacilitiesTravelForm from "../../components/admin/FacilitiesTravelForm";
import SEOForm from "../../components/admin/SEOForm";
import type { District } from "../../types/district";

interface DistrictOption {
  id: number;
  name: string;
  province: string;
}

interface PlaceDraft {
  name: string;
  province: string;
  district: string;
  era: string;
  latitude: string;
  longitude: string;
  anchorXPct: string;
  anchorYPct: string;
  shortDescription: string;
  historicalStory: string;
  heroImage: string;
  galleryImages: string[];
  nearbyHotels: string;
  nearbyHospitals: string;
  nearbyRestaurant: string;
  travelTips: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  focusKeywords: string;
  category: string;
  statusFlag: string;
}

const DRAFT_STORAGE_KEY = "heritage-add-place-draft";

const initialDraft: PlaceDraft = {
  name: "",
  province: "Central",
  district: "",
  era: "",
  latitude: "7.8731",
  longitude: "80.7718",
  anchorXPct: "0.5",
  anchorYPct: "0.5",
  shortDescription: "",
  historicalStory: "",
  heroImage: "",
  galleryImages: ["", "", "", "", "", ""],
  nearbyHotels: "",
  nearbyHospitals: "",
  nearbyRestaurant: "",
  travelTips: "",
  seoTitle: "",
  metaDescription: "",
  slug: "",
  focusKeywords: "",
  category: "Heritage Site",
  statusFlag: "Draft",
};

const AddNewPlace = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<PlaceDraft>(initialDraft);
  const [districtOptions, setDistrictOptions] = useState<DistrictOption[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);

    if (!savedDraft) {
      return;
    }

    try {
      const parsedDraft = JSON.parse(savedDraft) as Partial<PlaceDraft>;
      setDraft((current) => ({
        ...current,
        ...parsedDraft,
        galleryImages: Array.isArray(parsedDraft.galleryImages)
          ? [...initialDraft.galleryImages].map((_, index) => parsedDraft.galleryImages?.[index] ?? "")
          : current.galleryImages,
      }));
    } catch {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const loadDistrictOptions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/districts", { credentials: "include" });

        if (!response.ok) {
          throw new Error("Failed to load districts");
        }

        const payload = await response.json();
        const options = (payload.data ?? []).map((district: any) => ({
          id: district.id,
          name: district.name,
          province: district.province?.name ?? "",
        }));

        setDistrictOptions(options);
      } catch (loadError) {
        console.error(loadError);
      }
    };

    void loadDistrictOptions();
  }, []);

  const selectedDistrictOption = useMemo(
    () => districtOptions.find((district) => district.name === draft.district) ?? null,
    [districtOptions, draft.district],
  );

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateDraftField = <K extends keyof PlaceDraft>(field: K, value: PlaceDraft[K]) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleDistrictSelect = (district: District) => {
    setDraft((current) => ({
      ...current,
      district: district.name,
      province: district.province,
    }));
  };

  const handleSaveDraft = () => {
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    setStatusError(null);
    setStatusMessage("Draft saved locally in the browser.");
  };

  const handlePublish = async () => {
    setSubmitting(true);
    setStatusError(null);
    setStatusMessage(null);

    try {
      const districtId = selectedDistrictOption?.id;

      if (!districtId) {
        throw new Error("Select a district on the map before publishing.");
      }

      const payload = {
        name: draft.name.trim(),
        category: draft.category,
        description: [draft.shortDescription.trim(), draft.historicalStory.trim()].filter(Boolean).join("\n\n"),
        image: draft.heroImage || undefined,
        century: draft.era.trim() || "Unknown",
        statusFlag: "Published",
        latitude: Number(draft.latitude),
        longitude: Number(draft.longitude),
        anchorXPct: Number(draft.anchorXPct),
        anchorYPct: Number(draft.anchorYPct),
        districtId,
      };

      const response = await fetch("http://localhost:5000/api/v1/historicalPlace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const responsePayload = await response.json();

      if (!response.ok) {
        throw new Error(responsePayload.message || "Failed to publish the place.");
      }

      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      setStatusMessage("Historical place published successfully.");
      setDraft(initialDraft);
      setCurrentStep(1);
    } catch (publishError) {
      const message = publishError instanceof Error ? publishError.message : "Failed to publish the place.";
      setStatusError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col pt-4 min-h-[calc(100vh-100px)]">
      {/* Header section */}
      <div className="mb-10">
        <div className="text-[13px] text-gray-500 mb-4 flex items-center gap-1">
          <span>Home</span>
          <span>&gt;</span>
          <span>Historical places</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Add new</span>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-[32px] font-bold font-serif text-gray-900 mb-1 tracking-tight">Add New Place</h1>
            <p className="text-gray-500 text-[14px]">Create a new heritage site listing.</p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md border border-gray-900 text-gray-900 bg-white hover:bg-gray-50 font-bold text-[14px] transition-colors"
            >
              Save Draft
              <MdOutlineFileDownload size={18} />
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={submitting}
              className="px-8 py-2.5 rounded-md bg-[#1E604B] text-white font-bold text-[14px] hover:bg-[#144b3a] transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
              Publish
            </button>
          </div>
        </div>
        {(statusMessage || statusError) && (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-[14px] ${
              statusError ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {statusError || statusMessage}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 items-start pb-8">
        {/* Left Sidebar Steps */}
        <div className="shrink-0 w-full lg:w-[260px] sticky top-4">
          <AddNewPlaceSidebar currentStep={currentStep} />
        </div>
        
        {/* Right Form Content */}
        <div className="flex-1 w-full min-w-0 flex flex-col h-full">
          {currentStep === 1 && (
            <BasicInformationForm
              value={{
                name: draft.name,
                province: draft.province,
                district: draft.district,
                era: draft.era,
                latitude: draft.latitude,
                longitude: draft.longitude,
                shortDescription: draft.shortDescription,
                historicalStory: draft.historicalStory,
              }}
              onChange={updateDraftField}
              onDistrictSelect={handleDistrictSelect}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <MediaForm
              value={{
                heroImage: draft.heroImage,
                galleryImages: draft.galleryImages,
              }}
              onHeroImageChange={(value) => updateDraftField("heroImage", value)}
              onGalleryImageChange={(index, value) => {
                setDraft((current) => {
                  const nextGallery = [...current.galleryImages];
                  nextGallery[index] = value;

                  return {
                    ...current,
                    galleryImages: nextGallery,
                  };
                });
              }}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <FacilitiesTravelForm
              value={{
                nearbyHotels: draft.nearbyHotels,
                nearbyHospitals: draft.nearbyHospitals,
                nearbyRestaurant: draft.nearbyRestaurant,
                travelTips: draft.travelTips,
              }}
              onChange={updateDraftField}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <SEOForm
              value={{
                seoTitle: draft.seoTitle,
                metaDescription: draft.metaDescription,
                slug: draft.slug,
                focusKeywords: draft.focusKeywords,
              }}
              onChange={updateDraftField}
              onPublish={handlePublish}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewPlace;
