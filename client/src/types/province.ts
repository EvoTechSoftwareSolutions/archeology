import type { District } from "./district"; 

export interface ProvinceHistoricalPlace {
  id?: number;
  name: string;
  image: string;
  description: string;
  anchorXPct: number;
  anchorYPct: number;
}

export interface Province {
  id: string | number;
  name: string;
  regionCode:string;
  path?: string;
  bbox?: { x: number; y: number; width: number; height: number };
  labelX?: number;
  labelY?: number;
  historicalPlaces?: ProvinceHistoricalPlace[];
  districts?: District[];
}

export interface ProvinceListApiResponse {
  success: boolean;
  data: Array<{
    id: number;
    name: string;
  }>;
}

export interface ProvinceDetailApiResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    districts: Array<{
      id: number;
      name: string;
      provinceId: number;
    }>;
  };
}