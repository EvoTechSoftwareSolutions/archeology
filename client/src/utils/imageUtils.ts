export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_V1 = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
  : '/api/v1';

// Default placeholder image relative to your public directory
const DEFAULT_FALLBACK = '/placeholder-image.jpg';

/**
 * Resolves any image reference (relative upload path, absolute URL,
 * data URI, or blob) into something an <img> tag can actually load.
 * Used for both review avatars and place/gallery images since the
 * API returns plain relative paths like "/uploads/xxx.jpg".
 */
export const resolveImageUrl = (
  image: string | null | undefined, 
  fallback: string = DEFAULT_FALLBACK // Optional parameter with default value
): string => {
  if (!image) return fallback;
  if (/^(https?:)?\/\//i.test(image) || image.startsWith('data:') || image.startsWith('blob:')) {
    return image;
  }
  return `${API_BASE}${image.startsWith('/') ? image : `/${image}`}`;
};