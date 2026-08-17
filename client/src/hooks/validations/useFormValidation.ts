import { useState, useCallback } from "react";

export interface FormValues {
  name: string;
  category: string;
  province: string;
  district: string;
  era: string;
  anchorXPct: string;
  anchorYPct: string;
  shortDescription: string;
  historicalStory: string;
}

export type FormErrors = Partial<Record<keyof FormValues | "map", string>>;

export const useFormValidation = (values: FormValues) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback(
    (field: keyof FormValues | "map", value: string, currentValues: FormValues): string => {
      switch (field) {
        case "name":
          if (!value.trim()) return "Place Name is required.";
          if (value.trim().length < 3) return "Name must be at least 3 characters long.";
          return "";

        case "category":
          if (!value) return "Please select a category.";
          return "";

        case "province":
          if (!value) return "Please select a province.";
          return "";

        case "district":
          if (!value) return "Please select a district.";
          return "";

        case "era":
          if (!value.trim()) return "Historical era is required.";
          return "";

        case "shortDescription":
          if (!value.trim()) return "Short description is required.";
          if (value.trim().length < 20) return "Description must be at least 20 characters.";
          return "";

        case "map":
          if (!currentValues.anchorXPct || !currentValues.anchorYPct) {
            return "Please select a location pin on the map.";
          }
          return "";

        default:
          return "";
      }
    },
    []
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    (Object.keys(values) as Array<keyof FormValues>).forEach((field) => {
      const err = validateField(field, values[field], values);
      if (err) newErrors[field] = err;
    });

    const mapErr = validateField("map", "", values);
    if (mapErr) newErrors.map = mapErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateField]);

  const clearFieldError = useCallback((field: keyof FormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  return { errors, validateField, validateAll, clearFieldError, setErrors };
};