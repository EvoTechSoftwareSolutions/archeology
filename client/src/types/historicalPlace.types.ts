export interface HistoricalPlaceRecord {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  century: string;
  /** Free string in your API, e.g. "ACTIVE" — not a fixed union */
  statusFlag: string;
  latitude: number;
  longitude: number;
  /** 0–100 percentage within the district's bounding box */
  anchorXPct: number;
  anchorYPct: number;
  districtId: number;
  createdAt: string;
  updatedAt: string;
  /** Included by some endpoints (e.g. the list view) — optional */
  district?: {
    id: number;
    name: string;
    provinceId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export type HistoricalPlaceInput = Omit<
  HistoricalPlaceRecord,
  "id" | "createdAt" | "updatedAt" | "district"
>;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface HistoricalPlaceListParams {
  search?: string;
  provinceId?: number;
  districtId?: number;
  category?: string;
  statusFlag?: string;
  page?: number;
  pageSize?: number;
}
