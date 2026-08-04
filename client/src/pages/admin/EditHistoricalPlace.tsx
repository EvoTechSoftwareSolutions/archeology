import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdOutlineSave } from "react-icons/md";
import AddNewPlaceSidebar from "../../components/admin/AddNewPlaceSidebar";
import EditBasicInformationForm from "../../components/admin/editForms/EditBasicInformationForm";
import EditMediaForm from "../../components/admin/editForms/EditMediaForm";
import EditFacilitiesTravelForm from "../../components/admin/editForms/EditFacilitiesTravelForm";
import EditSEOForm from "../../components/admin/editForms/EditSEOForm";
import { slugify } from "../../utils/slugify";
import {
  getHistoricalPlaceById,
  updateHistoricalPlace,
} from "../../services/historicalPlace.service";

interface PlaceDraft {
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
  heroImage: File | string | null;
  galleryImages: (File | string | null)[];
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
  statusFlag: "Published",
};

const EditHistoricalPlace = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<PlaceDraft>(initialDraft);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch existing place data on mount
useEffect(() => {
  const fetchPlace = async () => {
    if (!id) return;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      setStatusError("Invalid place ID.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getHistoricalPlaceById(numericId);

      const rawAnchorX = data.anchorXPct ? String(Number(data.anchorXPct) / 100) : "";
      const rawAnchorY = data.anchorYPct ? String(Number(data.anchorYPct) / 100) : "";

      const descriptionParts = (data.description || "").split("\n\n");
      const shortDescription = descriptionParts[0] || "";
      const historicalStory = descriptionParts.slice(1).join("\n\n") || "";

      // 1. FIX: Map gallery images by extracting the `.url` property from objects
      const gallery: (File | string | null)[] = [null, null, null, null, null, null];
      if (Array.isArray(data.galleryImages)) {
        data.galleryImages.forEach((imgObj: { url?: string } | string, idx: number) => {
          if (idx < 6) {
            // Handle both object structure { id, url } and standalone string fallback
            const url = typeof imgObj === "object" && imgObj !== null ? imgObj.url : imgObj;
            gallery[idx] = url || null;
          }
        });
      }

      setDraft({
        name: data.name || "",
        category: data.category?.name || data.category || "",
        province: data.province?.name || data.province || "",
        district: data.district?.name || data.district || "",
        provinceId: data.provinceId ? Number(data.provinceId) : null,
        districtId: data.districtId ? Number(data.districtId) : null,
        era: data.century || "",
        latitude: String(data.latitude || ""),
        longitude: String(data.longitude || ""),
        anchorXPct: rawAnchorX,
        anchorYPct: rawAnchorY,
        shortDescription,
        historicalStory,
        // 2. FIX: Backend sends key "image", not "imageUrl"
        heroImage: data.image || data.imageUrl || null, 
        galleryImages: gallery,
        nearbyHotels: data.nearbyHotels || "",
        nearbyHospitals: data.nearbyHospitals || "",
        nearbyRestaurant: data.nearbyRestaurant || "",
        travelTips: data.travelTips || "",
        seoTitle: data.seoTitle || "",
        metaDescription: data.metaDescription || "",
        slug: data.slug || "",
        focusKeywords: data.focusKeywords || "",
        statusFlag: data.statusFlag || "Published",
      });
    } catch (err: any) {
      setStatusError(err?.message || "Failed to load historical place data.");
    } finally {
      setLoading(false);
    }
  };

  fetchPlace();
}, [id]);



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
  };

  const handleSeoChange = (
    field: "seoTitle" | "metaDescription" | "slug" | "focusKeywords",
    value: string,
  ) => {
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

  const handleUpdate = async () => {
  if (!id) return;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    setStatusError("Invalid place ID.");
    return;
  }

  setSubmitting(true);

    try {
      if (!draft.provinceId)
        throw new Error("Select a province before saving.");
      if (!draft.districtId)
        throw new Error("Select a district before saving.");

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
      formData.append("statusFlag", draft.statusFlag);
      formData.append("latitude", String(draft.latitude));
      formData.append("longitude", String(draft.longitude));

      // Scale percentage to 0-100 range expected by API
      if (draft.anchorXPct) {
        formData.append("anchorXPct", String(Number(draft.anchorXPct) * 100));
      }
      if (draft.anchorYPct) {
        formData.append("anchorYPct", String(Number(draft.anchorYPct) * 100));
      }

      formData.append("provinceId", String(draft.provinceId));
      formData.append("districtId", String(draft.districtId));

      if (draft.nearbyHotels.trim())
        formData.append("nearbyHotels", draft.nearbyHotels.trim());
      if (draft.nearbyHospitals.trim())
        formData.append("nearbyHospitals", draft.nearbyHospitals.trim());
      if (draft.nearbyRestaurant.trim())
        formData.append("nearbyRestaurant", draft.nearbyRestaurant.trim());
      if (draft.travelTips.trim())
        formData.append("travelTips", draft.travelTips.trim());
      if (draft.seoTitle.trim())
        formData.append("seoTitle", draft.seoTitle.trim());
      if (draft.metaDescription.trim())
        formData.append("metaDescription", draft.metaDescription.trim());
      formData.append("slug", draft.slug.trim() || slugify(draft.name));
      if (draft.focusKeywords.trim())
        formData.append("focusKeywords", draft.focusKeywords.trim());

      // Hero image logic: Upload File or retain existing URL string
      if (draft.heroImage instanceof File) {
        formData.append("image", draft.heroImage);
      } else if (typeof draft.heroImage === "string") {
        formData.append("existingHeroImage", draft.heroImage);
      }

      // Gallery image logic: Append new Files & retain existing image URLs
      const existingGalleryUrls: string[] = [];
      draft.galleryImages.forEach((img) => {
        if (img instanceof File) {
          formData.append("galleryImages", img);
        } else if (typeof img === "string" && img.trim()) {
          existingGalleryUrls.push(img);
        }
      });

      formData.append(
        "existingGalleryImages",
        JSON.stringify(existingGalleryUrls),
      );

      await updateHistoricalPlace(numericId, formData);

      setStatusMessage("Historical place updated successfully.");
      setTimeout(() => {
        navigate("/admin/heritage");
      }, 1500);
    } catch (updateError: any) {
      const message =
        updateError?.response?.data?.message ||
        updateError?.message ||
        "Failed to update the place.";
      setStatusError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500 font-medium">
          Loading place information...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col pt-4 min-h-[calc(100vh-100px)]">
      {/* Header & Navigation */}
      <div className="mb-10">
        <div className="text-[13px] text-gray-500 mb-4 flex items-center gap-1">
          <span>Home</span>
          <span>&gt;</span>
          <span>Historical places</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Edit Place</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-[32px] font-bold font-serif text-gray-900 mb-1 tracking-tight">
              Edit Place
            </h1>
            <p className="text-gray-500 text-[14px]">
              Update details for {draft.name || "this heritage site"}.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleUpdate}
              disabled={submitting}
              className="flex items-center gap-2 px-8 py-2.5 rounded-md bg-[#1E604B] text-white font-bold text-[14px] hover:bg-[#144b3a] transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              <MdOutlineSave size={18} />
              {submitting ? "Saving..." : "Save Changes"}
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

      {/* Main Form Content */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 items-start pb-8">
        <div className="shrink-0 w-full lg:w-[260px] sticky top-4">
          <AddNewPlaceSidebar currentStep={currentStep} />
        </div>

        <div className="flex-1 w-full min-w-0 flex flex-col h-full">
          {currentStep === 1 && (
            <EditBasicInformationForm
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
              onSave={handleUpdate}
              submitting={submitting}
            />
          )}

          {currentStep === 2 && (
            <EditMediaForm
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
              onSave={handleUpdate}
              submitting={submitting}
            />
          )}

          {currentStep === 3 && (
            <EditFacilitiesTravelForm
              value={{
                nearbyHotels: draft.nearbyHotels,
                nearbyHospitals: draft.nearbyHospitals,
                nearbyRestaurant: draft.nearbyRestaurant,
                travelTips: draft.travelTips,
              }}
              onChange={updateDraftField}
              onNext={handleNext}
              onBack={handleBack}
              onSave={handleUpdate}
              submitting={submitting}
            />
          )}

          {currentStep === 4 && (
            <EditSEOForm
              value={{
                seoTitle: draft.seoTitle,
                metaDescription: draft.metaDescription,
                slug: draft.slug,
                focusKeywords: draft.focusKeywords,
              }}
              onChange={handleSeoChange}
              onSave={handleUpdate}
              onBack={handleBack}
              submitting={submitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditHistoricalPlace;
