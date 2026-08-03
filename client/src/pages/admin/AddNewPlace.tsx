import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import AddNewPlaceSidebar from "../../components/admin/AddNewPlaceSidebar";
import BasicInformationForm from "../../components/admin/BasicInformationForm";
import MediaForm from "../../components/admin/MediaForm";
import FacilitiesTravelForm from "../../components/admin/FacilitiesTravelForm";
import SEOForm from "../../components/admin/SEOForm";


const AddNewPlace = () => {
  const [currentStep, setCurrentStep] = useState(1);
  name: string;
  category: string;
  province: string;
  district: string;
  provinceId: number | null;
  districtId: number | null;
  era: string;
  latitude: string;
  longitude: string;
  anchorXPct: string;
  anchorYPct: string;
  shortDescription: string;
  historicalStory: string;
  heroImage: File | null;
  galleryImages: (File | null)[];
  nearbyHotels: string;
  nearbyHospitals: string;
  nearbyRestaurant: string;
  travelTips: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  focusKeywords: string;
  statusFlag: string;
}

const DRAFT_STORAGE_KEY = "heritage-add-place-draft";

const initialDraft: PlaceDraft = {
  name: "",
  category: "",
  province: "",
  district: "",
  provinceId: null,
  districtId: null,
  era: "",
  latitude: "",
  longitude: "",
  anchorXPct: "",
  anchorYPct: "",
  shortDescription: "",
  historicalStory: "",
  heroImage: null,
  galleryImages: [null, null, null, null, null, null],
  nearbyHotels: "",
  nearbyHospitals: "",
  nearbyRestaurant: "",
  travelTips: "",
  seoTitle: "",
  metaDescription: "",
  slug: "",
  focusKeywords: "",
  statusFlag: "Draft",
};

const AddNewPlace = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<PlaceDraft>(initialDraft);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const slugEditedRef = useRef(false);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!savedDraft) return;

    try {
      const parsedDraft = JSON.parse(savedDraft) as Partial<PlaceDraft>;
      if (parsedDraft.slug) slugEditedRef.current = true;

      setDraft((current) => ({
        ...current,
        ...parsedDraft,
        // Reset file buffers as standard File objects do not survive JSON storage
        heroImage: null,
        galleryImages: initialDraft.galleryImages,
      }));
    } catch {
      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, []);

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateDraftField = <K extends keyof PlaceDraft>(
    field: K,
    value: PlaceDraft[K],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const handleBasicInfoChange = (
    field:
      | "name"
      | "category"
      | "province"
      | "district"
      | "era"
      | "shortDescription"
      | "historicalStory",
    value: string,
  ) => {
    updateDraftField(field, value);
    if (field === "name" && !slugEditedRef.current) {
      updateDraftField("slug", slugify(value));
    }
  };

  const handleSeoChange = (
    field: "seoTitle" | "metaDescription" | "slug" | "focusKeywords",
    value: string,
  ) => {
    if (field === "slug") slugEditedRef.current = true;
    updateDraftField(field, value);
  };

  const handleLocationPick = (
    latitude: string,
    longitude: string,
    anchorXPct: string,
    anchorYPct: string,
  ) => {
    setDraft((current) => ({
      ...current,
      latitude,
      longitude,
      anchorXPct,
      anchorYPct,
    }));
  };

  const handleSaveDraft = () => {
    // Strip file references before writing to local storage
    const draftToSave = {
      ...draft,
      heroImage: null,
      galleryImages: [],
    };
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftToSave));
    setStatusError(null);
    setStatusMessage("Draft saved locally in the browser.");
  };

  const handlePublish = async () => {
    setSubmitting(true);
    setStatusError(null);
    setStatusMessage(null);

    try {
      if (!draft.provinceId) {
        throw new Error("Select a province before publishing.");
      }
      if (!draft.districtId) {
        throw new Error("Select a district before publishing.");
      }
      if (!draft.anchorXPct || !draft.anchorYPct) {
        throw new Error("Click a location on the district map before publishing.");
      }

      // Build FormData payload to accommodate uploaded images
      const formData = new FormData();
      formData.append("name", draft.name.trim());
      formData.append("category", draft.category);

      const description = [
        draft.shortDescription.trim(),
        draft.historicalStory.trim(),
      ]
        .filter(Boolean)
        .join("\n\n");
      
      formData.append("description", description);
      formData.append("century", draft.era.trim() || "Unknown");
      formData.append("statusFlag", "Published");
      formData.append("latitude", String(draft.latitude));
      formData.append("longitude", String(draft.longitude));

      // Scale coordinates back to percentage range (0-100) expected by backend
      formData.append("anchorXPct", String(Number(draft.anchorXPct) * 100));
      formData.append("anchorYPct", String(Number(draft.anchorYPct) * 100));
      formData.append("provinceId", String(draft.provinceId));
      formData.append("districtId", String(draft.districtId));

      if (draft.nearbyHotels.trim()) formData.append("nearbyHotels", draft.nearbyHotels.trim());
      if (draft.nearbyHospitals.trim()) formData.append("nearbyHospitals", draft.nearbyHospitals.trim());
      if (draft.nearbyRestaurant.trim()) formData.append("nearbyRestaurant", draft.nearbyRestaurant.trim());
      if (draft.travelTips.trim()) formData.append("travelTips", draft.travelTips.trim());
      if (draft.seoTitle.trim()) formData.append("seoTitle", draft.seoTitle.trim());
      if (draft.metaDescription.trim()) formData.append("metaDescription", draft.metaDescription.trim());
      formData.append("slug", draft.slug.trim() || slugify(draft.name));
      if (draft.focusKeywords.trim()) formData.append("focusKeywords", draft.focusKeywords.trim());

      if (draft.heroImage) {
        formData.append("image", draft.heroImage);
      }

      draft.galleryImages.forEach((file) => {
        if (file) formData.append("galleryImages", file);
      });

      // Submit via centralized API client
      await createHistoricalPlace(formData);

      window.localStorage.removeItem(DRAFT_STORAGE_KEY);
      slugEditedRef.current = false;
      setStatusMessage("Historical place published successfully.");
      setDraft(initialDraft);
      setCurrentStep(1);
    } catch (publishError: any) {
      const message =
        publishError?.response?.data?.message ||
        publishError?.message ||
        "Failed to publish the place.";
      setStatusError(message);
    } finally {
      setSubmitting(false);
    }
>>>>>>> 0104ec4c5c1151c42b5d1879414deec1a4e3e886
  };

  return (
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
            <h1 className="text-[32px] font-bold font-serif text-gray-900 mb-1 tracking-tight">
              Add New Place
            </h1>
            <p className="text-gray-500 text-[14px]">
              Create a new heritage site listing.
            </p>
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
              statusError
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {statusError || statusMessage}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 items-start pb-8">
        <div className="shrink-0 w-full lg:w-[260px] sticky top-4">
          <AddNewPlaceSidebar currentStep={currentStep} />
        </div>

        <div className="flex-1 w-full min-w-0 flex flex-col h-full">
          {currentStep === 1 && (
            <BasicInformationForm
              value={{
                name: draft.name,
                category: draft.category,
                province: draft.province,
                district: draft.district,
                era: draft.era,
                anchorXPct: draft.anchorXPct,
                anchorYPct: draft.anchorYPct,
                shortDescription: draft.shortDescription,
                historicalStory: draft.historicalStory,
              }}
              onChange={handleBasicInfoChange}
              onProvinceIdChange={(id) => updateDraftField("provinceId", id)}
              onDistrictIdChange={(id) => updateDraftField("districtId", id)}
              onLocationPick={handleLocationPick}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <MediaForm
              value={{
                heroImage: draft.heroImage,
                galleryImages: draft.galleryImages,
              }}
              onHeroImageChange={(file) => updateDraftField("heroImage", file)}
              onGalleryImageChange={(index, file) => {
                setDraft((current) => {
                  const nextGallery = [...current.galleryImages];
                  nextGallery[index] = file;

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
              onChange={handleSeoChange}
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
