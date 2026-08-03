import { useEffect, useState } from "react";
import { getDistrictsByProvinceId } from "../services/province.service";
import type { District } from "../types/province";

interface UseDistrictsResult {
  districts: District[];
  loading: boolean;
  error: string | null;
}

export const useDistrictsByProvince = (provinceId: number | null): UseDistrictsResult => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (provinceId === null) {
      setDistricts([]);
      setError(null);
      return;
    }

    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const result = await getDistrictsByProvinceId(provinceId);
        if (isMounted) {
          setDistricts(result);
          setError(null);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load districts");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    void load();
    return () => {
      isMounted = false;
    };
  }, [provinceId]);

  return { districts, loading, error };
};
