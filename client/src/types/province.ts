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
  path?: string;
  bbox?: { x: number; y: number; width: number; height: number };
  labelX?: number;
  labelY?: number;
  historicalPlaces?: ProvinceHistoricalPlace[];
}


export interface District {
  id: number;
  name: string;
  provinceId: number;
}

// GET /provinces -> list of provinces
export interface ProvinceListApiResponse {
  success: boolean;
  data: Array<{
    id: number;
    name: string;
  }>;
}

// GET /provinces/:id -> single province with its districts nested
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