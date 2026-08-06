import type { ComponentType, SVGProps } from 'react';
import type { GalleryImage } from './historicalPlace.types';

export interface Province {
  id: number;
  name: string;
  regionCode?: string;
}

export interface District {
  id: number;
  name: string;
  provinceId?: number;
}

export interface HistoricalPlace {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  century: string;
  statusFlag: string;
  latitude: number;
  longitude: number;
  anchorXPct?: number;
  anchorYPct?: number;
  province: Province;
  district: District;
  galleryImages?: GalleryImage[];
  // Flat fields actually returned by the API (NOT nested in extendedDetails)
  nearbyHotels?: string | null;
  nearbyHospitals?: string | null;
  nearbyRestaurant?: string | null;
  travelTips?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  focusKeywords?: string | null;
}

export interface ContactDetail {
  label: string;
  value: string;
}

export type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface EssentialItem {
  title: string;
  subtitle: string;
  icon?: SvgIconComponent;
}

export interface TipItem {
  title: string;
  text: string;
  icon?: SvgIconComponent;
}

export interface ReviewItem {
  name: string;
  role: string;
  review: string;
  image?: string | null;
  rating?: number;
}

export interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  text: string;
}

export interface NearbyPlaceEntry {
  img: string;
  title: string;
  loc: string;
  route: string;
}

export interface HeritagePlaceDetailsProps {
  title?: string;
  province?: string;
  storyLabel?: string;
  mapTitle?: string;
  mapQuery?: string;
  slides?: { id: number; image: string; subtitle: string; desc?: string; title?: string }[];
  story?: string[];
  timeline?: TimelineEntry[];
  distance?: string;
  drivingTime?: string;
  walkingTime?: string;
  crowd?: string;
  weather?: string;
  temperature?: string;
  bestTime?: string;
  photographyTime?: string;
  openingHours?: string;
  visitNote?: string;
  contactDetails?: ContactDetail[];
  essentials?: EssentialItem[];
  tips?: TipItem[];
  dos?: string[];
  donts?: string[];
  review?: string;
  nearbyPlaces?: NearbyPlaceEntry[];
}