import { useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import AddNewPlaceSidebar from "../../components/admin/AddNewPlaceSidebar";
import BasicInformationForm from "../../components/admin/BasicInformationForm";
import MediaForm from "../../components/admin/MediaForm";
import FacilitiesTravelForm from "../../components/admin/FacilitiesTravelForm";
import SEOForm from "../../components/admin/SEOForm";
import { slugify } from "../../utils/slugify";
import { createHistoricalPlace } from "../../services/historicalPlace.service";

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
  heroImage: File | null;
  galleryImages: (File | null)[];
  galleryTitles: string[];
  galleryDescriptions: string[];
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
  galleryTitles: ["", "", "", "", "", ""],
  galleryDescriptions: ["", "", "", "", "", ""],
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

      formData.append("anchorXPct", String(draft.anchorXPct));
      formData.append("anchorYPct", String(draft.anchorYPct));

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

      if (draft.seoTitle.trim()) formData.append("seoTitle", draft.seoTitle.trim());
      if (draft.metaDescription.trim()) formData.append("metaDescription", draft.metaDescription.trim());
      formData.append("slug", draft.slug.trim() || slugify(draft.name));
      if (draft.focusKeywords.trim()) formData.append("focusKeywords", draft.focusKeywords.trim());

      if (draft.heroImage) {
        formData.append("image", draft.heroImage);
      }

      const galleryMeta: { title: string; description: string }[] = [];
      draft.galleryImages.forEach((file, index) => {
        if (file) {
          formData.append("galleryImages", file);
          galleryMeta.push({
            title: draft.galleryTitles[index] || "",
            description: draft.galleryDescriptions[index] || "",
          });
        }
      });
      formData.append("galleryMetadataJson", JSON.stringify(galleryMeta));

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
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col px-3 sm:px-4 lg:px-0 pt-4 min-h-[calc(100vh-100px)]">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="text-[12px] sm:text-[13px] text-gray-500 mb-3 sm:mb-4 flex flex-wrap items-center gap-1">
          <span>Home</span>
          <span>&gt;</span>
          <span>Historical places</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Add new</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="min-w-0">
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold font-serif text-gray-900 mb-1 tracking-tight break-words">
              Add New Place
            </h1>
            <p className="text-gray-500 text-[13px] sm:text-[14px]">
              Create a new heritage site listing.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-gray-900 text-gray-900 bg-white hover:bg-gray-50 font-bold text-[14px] transition-colors whitespace-nowrap"
            >
              Save Draft
              <MdOutlineFileDownload size={18} />
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-2.5 rounded-md bg-[#1E604B] text-white font-bold text-[14px] hover:bg-[#144b3a] transition-colors shadow-sm disabled:cursor-not-allowed disabled:opacity-70 whitespace-nowrap"
            >
              Publish
            </button>
          </div>
        </div>
        {(statusMessage || statusError) && (
          <div
            className={`mt-4 rounded-lg border px-4 py-3 text-[14px] break-words ${
              statusError
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {statusError || statusMessage}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 flex-1 items-start pb-8">
        <div className="shrink-0 w-full lg:w-[260px] lg:sticky lg:top-4">
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
              galleryTitles={draft.galleryTitles}
              galleryDescriptions={draft.galleryDescriptions}
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
              onGalleryTitleChange={(index, value) => {
                setDraft((current) => {
                  const nextTitles = [...current.galleryTitles];
                  nextTitles[index] = value;
                  return { ...current, galleryTitles: nextTitles };
                });
              }}
              onGalleryDescriptionChange={(index, value) => {
                setDraft((current) => {
                  const nextDescs = [...current.galleryDescriptions];
                  nextDescs[index] = value;
                  return { ...current, galleryDescriptions: nextDescs };
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