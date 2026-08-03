export interface Province {
  id: number;
  name: string;
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