/** Raw shape of GET /districts/:id — historicalPlaces are already
 *  scoped to this district by the backend itself, not by a query filter. */
export interface DistrictHeritageApiResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    provinceId: number;
    historicalPlaces: Array<{
      id: number;
      name: string;
      category: string;
      description: string;
      image: string | null;
      latitude: number;
      longitude: number;
      /** 0–100, confirmed by real data (e.g. 31.7, 82.1) */
      anchorXPct: number;
      anchorYPct: number;
      districtId: number;
    }>;
  };
}
