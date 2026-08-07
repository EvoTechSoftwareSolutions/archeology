import { useState, useCallback } from "react";

export interface FacilitiesValues {
  nearbyHotels: string;
  nearbyHospitals: string;
  nearbyRestaurant: string;
  travelTips: string;
}

export type FacilitiesErrors = Partial<Record<keyof FacilitiesValues, string>>;

export const useFacilitiesValidation = (values: FacilitiesValues) => {
  const [errors, setErrors] = useState<FacilitiesErrors>({});

  const validateField = useCallback(
    (field: keyof FacilitiesValues, value: string): string => {
      switch (field) {
        case "nearbyHotels":
          if (!value.trim()) return "Nearby hotels list is required.";
          if (value.trim().length < 10) return "Please enter at least 10 characters.";
          return "";

        case "nearbyHospitals":
          if (!value.trim()) return "Nearby medical facilities are required.";
          if (value.trim().length < 10) return "Please enter at least 10 characters.";
          return "";

        case "nearbyRestaurant":
          if (!value.trim()) return "Nearby restaurants list is required.";
          if (value.trim().length < 10) return "Please enter at least 10 characters.";
          return "";

        case "travelTips":
          if (!value.trim()) return "Travel tips are required.";
          if (value.trim().length < 15) return "Travel tips must be at least 15 characters.";
          return "";

        default:
          return "";
      }
    },
    []
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: FacilitiesErrors = {};

    (Object.keys(values) as Array<keyof FacilitiesValues>).forEach((field) => {
      const err = validateField(field, values[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateField]);

  const clearFieldError = useCallback((field: keyof FacilitiesErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  return { errors, validateAll, clearFieldError };
};