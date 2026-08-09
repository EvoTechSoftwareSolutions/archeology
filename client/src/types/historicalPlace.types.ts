export interface HistoricalPlaceListParams {
  search?: string;

  provinceId?: number;

  districtId?: number;

  category?: string;

  statusFlag?: string;

  page?: number;

  pageSize?: number;

  isActive?: boolean;
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
  isActive: boolean;
}

//for API responses fetch
export interface ApiHistoricalPlace {
  id:number;

  name:string;
  description:string;

  image?: string;
  imageUrl?: string;

  century:string;
  statusFlag:string;

  latitude:number;
  longitude:number;

  anchorXPct:number;
  anchorYPct:number;

  provinceId:number;
  districtId:number;

  province?:{
    id:number;
    name:string;
  };

  district:{
    id:number;
    name:string;
    provinceId?:number;
  };

  category?:{
    id:number;
    name:string;
  } | string;

  galleryImages?:GalleryImage[];

  nearbyHotels?:string;
  nearbyHospitals?:string;
  nearbyRestaurant?:string;
  travelTips?:string;

  timelineJson?:string;
  crowd?:string;
  distance?:string;
  drivingTime?:string;
  walkingTime?:string;
  recommendedDeparture?:string;
  weather?:string;
  temperature?:string;
  photographyTime?:string;
  nearbyFuel?:string;
  nearbyWashrooms?:string;
  nearbyBusStops?:string;
  nearbyParking?:string;
  nearbyRailway?:string;
  emergencyPolice?:string;
  emergencyAmbulance?:string;
  openingHours?:string;
  earlyMorningSlot?:string;
  midDaySlot?:string;
  lateAfternoonSlot?:string;
  visitNote?:string;
  contactAddress?:string;
  contactAdminPhone?:string;
  contactEmergencyPhone?:string;
  contactWebsite?:string;
  contactEmail?:string;
  dressCode?:string;
  photographyRules?:string;
  accessibility?:string;
  dosJson?:string;
  dontsJson?:string;

  seoTitle?:string;
  metaDescription?:string;
  slug?:string;
  focusKeywords?:string;
}

export interface GalleryImage {
  id?: number;
  url: string;
  title?: string | null;
  description?: string | null;
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




export interface HistoricalPlaceDetails {
  id: number;

  name: string;

  category: string;

  description: string;

  image: string;

  century: string;

  statusFlag: string;

  latitude: number;

  longitude: number;

  anchorXPct: number;

  anchorYPct: number;

  provinceId: number;

  districtId: number;

  nearbyHotels?: string | null;

  nearbyHospitals?: string | null;

  nearbyRestaurant?: string | null;

  travelTips?: string | null;

  timelineJson?: string | null;
  crowd?: string | null;
  distance?: string | null;
  drivingTime?: string | null;
  walkingTime?: string | null;
  recommendedDeparture?: string | null;
  weather?: string | null;
  temperature?: string | null;
  photographyTime?: string | null;
  nearbyFuel?: string | null;
  nearbyWashrooms?: string | null;
  nearbyBusStops?: string | null;
  nearbyParking?: string | null;
  nearbyRailway?: string | null;
  emergencyPolice?: string | null;
  emergencyAmbulance?: string | null;
  openingHours?: string | null;
  earlyMorningSlot?: string | null;
  midDaySlot?: string | null;
  lateAfternoonSlot?: string | null;
  visitNote?: string | null;
  contactAddress?: string | null;
  contactAdminPhone?: string | null;
  contactEmergencyPhone?: string | null;
  contactWebsite?: string | null;
  contactEmail?: string | null;
  dressCode?: string | null;
  photographyRules?: string | null;
  accessibility?: string | null;
  dosJson?: string | null;
  dontsJson?: string | null;

  seoTitle?: string | null;

  metaDescription?: string | null;

  slug?: string | null;

  focusKeywords?: string | null;

  province: {
    id: number;
    name: string;
    regionCode: string;
  };

  district: {
    id: number;
    name: string;
    provinceId: number;
  };

  galleryImages: GalleryImage[];

  siteMonograph: any[];

  createdAt: string;

  updatedAt: string;
}


