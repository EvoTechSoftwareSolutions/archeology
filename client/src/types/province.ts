export interface HistoricalPlace {
  name: string;
  /** Path to a small thumbnail image, e.g. "/images/heritage/icons/temple.svg" */
  image: string;
  description: string;
}

export interface Bbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Province {
  /** URL-safe slug, e.g. "western" */
  id: string;
  name: string;
  /** SVG path data, in the 0 0 800 600 viewBox of the source map */
  path: string;
  /** Bounding box used to crop the isolated province view */
  bbox: Bbox;
  /** Centroid, used to place the on-map name label */
  labelX: number;
  labelY: number;
  historicalPlaces: HistoricalPlace[];
}
