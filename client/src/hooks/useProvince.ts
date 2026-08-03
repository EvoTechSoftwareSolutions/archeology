import { useEffect, useState } from "react";
import { getProvinces } from "../services/province.service";
import type { Province } from "../types/province";

interface UseProvinceResult {
  provinces: Province[];
  loading: boolean;
  error: string | null;
}

// Fetches provinces once on mount and exposes loading/error state
// so any component can populate a province dropdown without knowing
// about fetch/service details.
export const useProvince = (): UseProvinceResult => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProvinces = async () => {
      try {
        setLoading(true);
        const result = await getProvinces();
        if (isMounted) {
          setProvinces(result);
          setError(null);
        }
      } catch (loadError) {
        console.error(loadError);
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load provinces");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadProvinces();

    return () => {
      isMounted = false;
    };
  }, []);

  return { provinces, loading, error };
};