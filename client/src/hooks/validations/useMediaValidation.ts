import { useState, useCallback } from "react";

export interface MediaValues {
  heroImage: File | null;
  galleryImages: (File | null)[];
}

export interface MediaErrors {
  heroImage?: string;
  galleryImages?: string;
}

export const useMediaValidation = (values: MediaValues) => {
  const [errors, setErrors] = useState<MediaErrors>({});

  const validateHeroImage = useCallback((heroImage: File | null): string => {
    if (!heroImage) {
      return "A hero image is required.";
    }
    return "";
  }, []);

  const validateGalleryImages = useCallback(
    (galleryImages: (File | null)[]): string => {
      const hasAtLeastOne = galleryImages.some((file) => file !== null);
      if (!hasAtLeastOne) {
        return "At least one gallery image is required.";
      }
      return "";
    },
    []
  );

  const validateAll = useCallback(() => {
    const heroError = validateHeroImage(values.heroImage);
    const galleryError = validateGalleryImages(values.galleryImages);

    const newErrors: MediaErrors = {};
    if (heroError) newErrors.heroImage = heroError;
    if (galleryError) newErrors.galleryImages = galleryError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validateHeroImage, validateGalleryImages]);

  const clearFieldError = useCallback((field: keyof MediaErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  return { errors, validateAll, clearFieldError };
};