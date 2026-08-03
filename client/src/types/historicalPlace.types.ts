export interface HistoricalPlaceListParams {
  search?: string;

  provinceId?: number;

  districtId?: number;

  category?: string;

  statusFlag?: string;

  page?: number;

  pageSize?: number;
}

export interface HistoricalPlaceRecord {
  id: number;

  name: string;
  category: string;
  description: string;

  image?: string;

  century: string;
  statusFlag: string;

  latitude: number;
  longitude: number;

  anchorXPct: number;
  anchorYPct: number;

  provinceId: number;
  districtId: number;

  district?: {
    id: number;
    name: string;
    provinceId: number;
  };

  galleryImages?: GalleryImage[];

  createdAt?: string;
  updatedAt?: string;
}

//for API responses fetch
export interface ApiHistoricalPlace {
 id:number;
 name:string;
 description:string;
 image:string;
 latitude:number;
 longitude:number;
 anchorXPct:number;
 anchorYPct:number;
 districtId:number;

 district:{
   id:number;
   name:string;
 }
}

export interface GalleryImage {
  id?: number;
  url: string;
  position: number;
}


export interface Paginated<T> {
  items:T[];
  total:number;
  page:number;
  pageSize:number;
}

export type HistoricalPlaceInput = Omit<
  HistoricalPlaceRecord,
  "id" | "createdAt" | "updatedAt" | "district"
>;







