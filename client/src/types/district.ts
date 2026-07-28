export interface HistoricalPlace {
  name: string;
  /** URL to a photo representing the place (local path or online image) */
  image: string;
  description: string;
  /** Marker position as a 0–1 fraction of the district's bounding box */
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
  /** Official code, e.g. "LK11" */
  id: string;
  /** English name, e.g. "Colombo" */
  name: string;
  /** Romanized local name, e.g. "Kŏḷamba" */
  localName: string;
  province: string;
  /** This district's own fill color on the main map */
  color: string;
  /** SVG path data, in the 0 0 1000 1000 viewBox of the source map */
  path: string;
  /** Bounding box used to crop the isolated 3D district view */
  bbox: Bbox;
  /** Centroid used to place the on-map name label */
  labelX: number;
  labelY: number;
  historicalPlaces: HistoricalPlace[];
}