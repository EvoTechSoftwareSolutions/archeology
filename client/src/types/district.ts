export interface HistoricalPlace {
  id?: number | string;

  name: string;

  image: string;

 century?: string;

  description: string;

  latitude?: number;

  longitude?: number;

  anchorXPct: number;

  anchorYPct: number;
}

export interface Bbox {
  x: number;

  y: number;

  width: number;

  height: number;
}

export interface District {
  id: string | number;
  dbId?: number;
  name: string;
  location?: string;
  provinceId?: number;
  province?: string | number; 
  color?: string;            
  path?: string;
  bbox?: Bbox;
  labelX?: number;
  labelY?: number;
  historicalPlaces?: HistoricalPlace[];
}