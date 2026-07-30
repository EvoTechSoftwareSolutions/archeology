import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createHistoricalPlace,
  getHistoricalPlaceById,
  updateHistoricalPlace,
} from "../services/historicalPlace.service";
import type { HistoricalPlaceInput } from "../types/historicalPlace.types";

const EMPTY_FORM: HistoricalPlaceInput = {
  name: "",
  category: "",
  description: "",
  image: "",
  century: "",
  statusFlag: "Protected",
  latitude: 0,
  longitude: 0,
  anchorXPct: 50,
  anchorYPct: 50,
  districtId: 0,
};

type FieldErrors = Partial<Record<keyof HistoricalPlaceInput, string>>;

function validate(form: HistoricalPlaceInput): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.category.trim()) errors.category = "Category is required.";
  if (!form.districtId) errors.districtId = "Pick a district on the map.";
  if (form.anchorXPct < 0 || form.anchorXPct > 100)
    errors.anchorXPct = "Must be between 0 and 100.";
  if (form.anchorYPct < 0 || form.anchorYPct > 100)
    errors.anchorYPct = "Must be between 0 and 100.";
  return errors;
}

/**
 * Drives both AddHistoricalPlace.tsx (pass no id) and the edit page
 * (pass the id from the route). Bind `form` fields to your existing
 * inputs and call `updateField` on change, e.g.:
 *   <input value={form.name} onChange={e => updateField("name", e.target.value)} />
 */
export default function useHistoricalPlaceForm(id?: number) {
  const navigate = useNavigate();
  const isEditMode = id !== undefined;

  const [form, setForm] = useState<HistoricalPlaceInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditMode) return;
    setIsLoading(true);
    getHistoricalPlaceById(id!)
      .then((place) => {
        const { id: _id, createdAt, updatedAt, district: _district, ...rest } = place;
        setForm(rest);
      })
      .catch(() => setSubmitError("Couldn't load this historical place."))
      .finally(() => setIsLoading(false));
  }, [id, isEditMode]);

  const updateField = useCallback(
    <K extends keyof HistoricalPlaceInput>(field: K, value: HistoricalPlaceInput[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  /** Wire this to the SVG map click handler (see useDistrictMapPicker). */
  const setLocation = useCallback(
    (location: {
      latitude: number;
      longitude: number;
      anchorXPct: number;
      anchorYPct: number;
      districtId: number;
    }) => {
      setForm((prev) => ({ ...prev, ...location }));
    },
    []
  );

  const submit = useCallback(async () => {
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return false;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      if (isEditMode) {
        await updateHistoricalPlace(id!, form);
      } else {
        await createHistoricalPlace(form);
      }
      navigate("/admin/heritage", {
        state: {
          notice: isEditMode
            ? "Historical place updated."
            : "Historical place created.",
        },
      });
      return true;
    } catch {
      setSubmitError("Something went wrong while saving. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, id, isEditMode, navigate]);

  return {
    form,
    updateField,
    setLocation,
    errors,
    isLoading,
    isSubmitting,
    submitError,
    submit,
    isEditMode,
  };
}
