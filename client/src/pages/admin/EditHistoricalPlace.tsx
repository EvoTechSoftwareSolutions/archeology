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
  nearbyFuel: string;
  nearbyWashrooms: string;
  nearbyBusStops: string;
  nearbyParking: string;
  nearbyRailway: string;
  emergencyPolice: string;
  emergencyAmbulance: string;
  crowd: string;
  distance: string;
  drivingTime: string;
  walkingTime: string;
  recommendedDeparture: string;
  weather: string;
  temperature: string;
  photographyTime: string;
  openingHours: string;
  earlyMorningSlot: string;
  midDaySlot: string;
  lateAfternoonSlot: string;
  visitNote: string;
  contactAddress: string;
  contactAdminPhone: string;
  contactEmergencyPhone: string;
  contactWebsite: string;
  contactEmail: string;
  travelTips: string;
  dressCode: string;
  photographyRules: string;
  accessibility: string;
  dosText: string;
  dontsText: string;
  timelineJson: string;
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
  nearbyFuel: "",
  nearbyWashrooms: "",
  nearbyBusStops: "",
  nearbyParking: "",
  nearbyRailway: "",
  emergencyPolice: "",
  emergencyAmbulance: "",
  crowd: "",
  distance: "",
  drivingTime: "",
  walkingTime: "",
  recommendedDeparture: "",
  weather: "",
  temperature: "",
  photographyTime: "",
  openingHours: "",
  earlyMorningSlot: "",
  midDaySlot: "",
  lateAfternoonSlot: "",
  visitNote: "",
  contactAddress: "",
  contactAdminPhone: "",
  contactEmergencyPhone: "",
  contactWebsite: "",
  contactEmail: "",
  travelTips: "",
  dressCode: "",
  photographyRules: "",
  accessibility: "",
  dosText: "",
  dontsText: "",
  timelineJson: "",
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

      const normLoad = (v: any) => {
        if (!v) return "";
        const n = Number(v);
        return String(n > 1 ? n / 100 : n);
      };
      const rawAnchorX = normLoad(data.anchorXPct);
      const rawAnchorY = normLoad(data.anchorYPct);


      const descriptionParts = (data.description || "").split("\n\n");
      const shortDescription = descriptionParts[0] || "";
      const historicalStory = descriptionParts.slice(1).join("\n\n") || "";

      const gallery: (File | string | null)[] = [null, null, null, null, null, null];
      if (Array.isArray(data.galleryImages)) {
        data.galleryImages.forEach((imgObj: { url?: string } | string, idx: number) => {
          if (idx < 6) {
            const url = typeof imgObj === "object" && imgObj !== null ? imgObj.url : imgObj;
            gallery[idx] = url || null;
          }
        });
      }

      let dosText = "";
      if (data.dosJson) {
        try {
          const parsed = JSON.parse(data.dosJson);
          if (Array.isArray(parsed)) dosText = parsed.join("\n");
        } catch {
          dosText = data.dosJson;
        }
      }

      let dontsText = "";
      if (data.dontsJson) {
        try {
          const parsed = JSON.parse(data.dontsJson);
          if (Array.isArray(parsed)) dontsText = parsed.join("\n");
        } catch {
          dontsText = data.dontsJson;
        }
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
        heroImage: data.image || data.imageUrl || null, 
        galleryImages: gallery,
        nearbyHotels: data.nearbyHotels || "",
        nearbyHospitals: data.nearbyHospitals || "",
        nearbyRestaurant: data.nearbyRestaurant || "",
        nearbyFuel: data.nearbyFuel || "",
        nearbyWashrooms: data.nearbyWashrooms || "",
        nearbyBusStops: data.nearbyBusStops || "",
        nearbyParking: data.nearbyParking || "",
        nearbyRailway: data.nearbyRailway || "",
        emergencyPolice: data.emergencyPolice || "",
        emergencyAmbulance: data.emergencyAmbulance || "",
        crowd: data.crowd || "",
        distance: data.distance || "",
        drivingTime: data.drivingTime || "",
        walkingTime: data.walkingTime || "",
        recommendedDeparture: data.recommendedDeparture || "",
        weather: data.weather || "",
        temperature: data.temperature || "",
        photographyTime: data.photographyTime || "",
        openingHours: data.openingHours || "",
        earlyMorningSlot: data.earlyMorningSlot || "",
        midDaySlot: data.midDaySlot || "",
        lateAfternoonSlot: data.lateAfternoonSlot || "",
        visitNote: data.visitNote || "",
        contactAddress: data.contactAddress || "",
        contactAdminPhone: data.contactAdminPhone || "",
        contactEmergencyPhone: data.contactEmergencyPhone || "",
        contactWebsite: data.contactWebsite || "",
        contactEmail: data.contactEmail || "",
        travelTips: data.travelTips || "",
        dressCode: data.dressCode || "",
        photographyRules: data.photographyRules || "",
        accessibility: data.accessibility || "",
        dosText,
        dontsText,
        timelineJson: data.timelineJson || "",
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

      if (draft.anchorXPct) {
        formData.append("anchorXPct", String(draft.anchorXPct));
      }
      if (draft.anchorYPct) {
        formData.append("anchorYPct", String(draft.anchorYPct));
      }


      formData.append("provinceId", String(draft.provinceId));
      formData.append("districtId", String(draft.districtId));

      if (draft.nearbyHotels.trim()) formData.append("nearbyHotels", draft.nearbyHotels.trim());
      if (draft.nearbyHospitals.trim()) formData.append("nearbyHospitals", draft.nearbyHospitals.trim());
      if (draft.nearbyRestaurant.trim()) formData.append("nearbyRestaurant", draft.nearbyRestaurant.trim());
      if (draft.nearbyFuel.trim()) formData.append("nearbyFuel", draft.nearbyFuel.trim());
      if (draft.nearbyWashrooms.trim()) formData.append("nearbyWashrooms", draft.nearbyWashrooms.trim());
      if (draft.nearbyBusStops.trim()) formData.append("nearbyBusStops", draft.nearbyBusStops.trim());
      if (draft.nearbyParking.trim()) formData.append("nearbyParking", draft.nearbyParking.trim());
      if (draft.nearbyRailway.trim()) formData.append("nearbyRailway", draft.nearbyRailway.trim());

      if (draft.emergencyPolice.trim()) formData.append("emergencyPolice", draft.emergencyPolice.trim());
      if (draft.emergencyAmbulance.trim()) formData.append("emergencyAmbulance", draft.emergencyAmbulance.trim());

      if (draft.crowd.trim()) formData.append("crowd", draft.crowd.trim());
      if (draft.distance.trim()) formData.append("distance", draft.distance.trim());
      if (draft.drivingTime.trim()) formData.append("drivingTime", draft.drivingTime.trim());
      if (draft.walkingTime.trim()) formData.append("walkingTime", draft.walkingTime.trim());
      if (draft.recommendedDeparture.trim()) formData.append("recommendedDeparture", draft.recommendedDeparture.trim());
      if (draft.weather.trim()) formData.append("weather", draft.weather.trim());
      if (draft.temperature.trim()) formData.append("temperature", draft.temperature.trim());
      if (draft.photographyTime.trim()) formData.append("photographyTime", draft.photographyTime.trim());

      if (draft.openingHours.trim()) formData.append("openingHours", draft.openingHours.trim());
      if (draft.earlyMorningSlot.trim()) formData.append("earlyMorningSlot", draft.earlyMorningSlot.trim());
      if (draft.midDaySlot.trim()) formData.append("midDaySlot", draft.midDaySlot.trim());
      if (draft.lateAfternoonSlot.trim()) formData.append("lateAfternoonSlot", draft.lateAfternoonSlot.trim());
      if (draft.visitNote.trim()) formData.append("visitNote", draft.visitNote.trim());

      if (draft.contactAddress.trim()) formData.append("contactAddress", draft.contactAddress.trim());
      if (draft.contactAdminPhone.trim()) formData.append("contactAdminPhone", draft.contactAdminPhone.trim());
      if (draft.contactEmergencyPhone.trim()) formData.append("contactEmergencyPhone", draft.contactEmergencyPhone.trim());
      if (draft.contactWebsite.trim()) formData.append("contactWebsite", draft.contactWebsite.trim());
      if (draft.contactEmail.trim()) formData.append("contactEmail", draft.contactEmail.trim());

      if (draft.travelTips.trim()) formData.append("travelTips", draft.travelTips.trim());
      if (draft.dressCode.trim()) formData.append("dressCode", draft.dressCode.trim());
      if (draft.photographyRules.trim()) formData.append("photographyRules", draft.photographyRules.trim());
      if (draft.accessibility.trim()) formData.append("accessibility", draft.accessibility.trim());

      if (draft.dosText.trim()) {
        const dosArray = draft.dosText.split("\n").map(s => s.trim()).filter(Boolean);
        formData.append("dosJson", JSON.stringify(dosArray));
      }
      if (draft.dontsText.trim()) {
        const dontsArray = draft.dontsText.split("\n").map(s => s.trim()).filter(Boolean);
        formData.append("dontsJson", JSON.stringify(dontsArray));
      }

      if (draft.timelineJson.trim()) formData.append("timelineJson", draft.timelineJson.trim());

      if (draft.seoTitle.trim())
        formData.append("seoTitle", draft.seoTitle.trim());
      if (draft.metaDescription.trim())
        formData.append("metaDescription", draft.metaDescription.trim());
      formData.append("slug", draft.slug.trim() || slugify(draft.name));
      if (draft.focusKeywords.trim())
        formData.append("focusKeywords", draft.focusKeywords.trim());

      if (draft.heroImage instanceof File) {
        formData.append("image", draft.heroImage);
      } else if (typeof draft.heroImage === "string") {
        formData.append("existingHeroImage", draft.heroImage);
      }

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
                nearbyFuel: draft.nearbyFuel,
                nearbyWashrooms: draft.nearbyWashrooms,
                nearbyBusStops: draft.nearbyBusStops,
                nearbyParking: draft.nearbyParking,
                nearbyRailway: draft.nearbyRailway,
                emergencyPolice: draft.emergencyPolice,
                emergencyAmbulance: draft.emergencyAmbulance,
                crowd: draft.crowd,
                distance: draft.distance,
                drivingTime: draft.drivingTime,
                walkingTime: draft.walkingTime,
                recommendedDeparture: draft.recommendedDeparture,
                weather: draft.weather,
                temperature: draft.temperature,
                photographyTime: draft.photographyTime,
                openingHours: draft.openingHours,
                earlyMorningSlot: draft.earlyMorningSlot,
                midDaySlot: draft.midDaySlot,
                lateAfternoonSlot: draft.lateAfternoonSlot,
                visitNote: draft.visitNote,
                contactAddress: draft.contactAddress,
                contactAdminPhone: draft.contactAdminPhone,
                contactEmergencyPhone: draft.contactEmergencyPhone,
                contactWebsite: draft.contactWebsite,
                contactEmail: draft.contactEmail,
                travelTips: draft.travelTips,
                dressCode: draft.dressCode,
                photographyRules: draft.photographyRules,
                accessibility: draft.accessibility,
                dosText: draft.dosText,
                dontsText: draft.dontsText,
                timelineJson: draft.timelineJson,
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
