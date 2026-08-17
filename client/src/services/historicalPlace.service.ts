import api from "../lib/axios";

import type {
  HistoricalPlaceListParams,
  Paginated,
  HistoricalPlaceDetails,
} from "../types/historicalPlace.types";

const BASE = "/historicalPlace";

/**
 * Get all historical places
 */
export async function getHistoricalPlaces(
  params: HistoricalPlaceListParams = {},
): Promise<Paginated<HistoricalPlaceDetails>> {
  const response = await api.get(BASE, {
    params,
  });

  const payload = response.data.data ?? response.data;

  // Backend returns an array
  if (Array.isArray(payload)) {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 7;

    const startIndex = (page - 1) * pageSize;

    return {
      items: payload.slice(startIndex, startIndex + pageSize),
      total: payload.length,
      page,
      pageSize,
    };
  }

  // Backend returns pagination object
  return {
    items: payload.items ?? [],
    total: payload.total ?? 0,
    page: payload.page ?? params.page ?? 1,
    pageSize: payload.pageSize ?? params.pageSize ?? 7,
  };
}

/**
 * Get a historical place by ID
 */
export async function getHistoricalPlaceById(
  id: number | string,
): Promise<HistoricalPlaceDetails> {
  const response = await api.get(`${BASE}/${id}`);

  return response.data.data ?? response.data;
}

/**
 * Create historical place
 */
export async function createHistoricalPlace(data: FormData | object) {
  const response = await api.post(
    BASE,
    data,
    data instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : undefined,
  );

  return response.data.data;
}

/**
 * Update historical place
 */
export async function updateHistoricalPlace(
  id: number,
  data: Partial<HistoricalPlaceDetails> | FormData,
) {
  const response = await api.put(
    `${BASE}/${id}`,
    data,
    data instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : undefined,
  );

  return response.data.data ?? response.data;
}

/**
 * Delete historical place
 */
export async function deleteHistoricalPlace(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}

/**
 * Delete multiple historical places
 */
export async function deleteHistoricalPlaces(ids: number[]): Promise<void> {
  await Promise.all(ids.map((id) => deleteHistoricalPlace(id)));
}

/**
 * Get detailed historical place
 */
export async function getHistoricalPlace(
  id: number | string,
): Promise<HistoricalPlaceDetails> {
  const response = await api.get(`${BASE}/${id}`);

  return response.data.data ?? response.data;
}

/**
 * Toggle historical place active/inactive status
 */
export async function toggleHistoricalPlaceStatus(id: number) {
  const response = await api.put(`${BASE}/${id}/toggle-status`);

  return response.data.data ?? response.data;
}

/**
 * Nearby historical place returned by:
 *
 * GET /historicalPlace/:placeId/nearby
 *
 * Example:
 * /historicalPlace/10/nearby
 *   ?districtId=9
 *   &anchorXPct=0.45
 *   &anchorYPct=0.30
 */
export interface NearbyPlaceResponse {
  id: number;

  name: string;

  image: string | null;

  districtId: number;

  anchorXPct: number | null;

  anchorYPct: number | null;

  /**
   * Distance calculated by the backend.
   */
  distance: number;

  district: {
    id: number;
    name: string;
  };
}

/**
 * Get nearby historical places
 *
 * The backend calculates nearby places using:
 * - districtId
 * - anchorXPct
 * - anchorYPct
 */
export async function getNearbyHistoricalPlaces(
  placeId: number | string,
  districtId: number,
  anchorXPct: number,
  anchorYPct: number,
): Promise<NearbyPlaceResponse[]> {
  const response = await api.get(`${BASE}/${placeId}/nearby`, {
    params: {
      districtId,
      anchorXPct,
      anchorYPct,
    },
  });

  return response.data.data ?? [];
}
