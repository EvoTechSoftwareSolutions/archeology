import api from "../lib/axios";
import type {
  HistoricalPlaceInput,
  HistoricalPlaceListParams,
  HistoricalPlaceRecord,
  Paginated,
} from "../types/historicalPlace.types";

const BASE = "/historicalPlace";

export async function getHistoricalPlaces(
  params: HistoricalPlaceListParams = {}
): Promise<Paginated<HistoricalPlaceRecord>> {
  const { data } = await api.get(BASE, { params });
  const payload = data.data ?? data;

  // Handle either a plain array or an already-paginated { items, total, ... }
  // shape — adjust here once you confirm exactly what your endpoint returns.
  if (Array.isArray(payload)) {
    return {
      items: payload,
      total: payload.length,
      page: params.page ?? 1,
      pageSize: params.pageSize ?? payload.length,
    };
  }
  return payload;
}

export async function getHistoricalPlaceById(
  id: number
): Promise<HistoricalPlaceRecord> {
  const { data } = await api.get(`${BASE}/${id}`);
  return data.data ?? data;
}

export async function createHistoricalPlace(
  payload: HistoricalPlaceInput
): Promise<HistoricalPlaceRecord> {
  const { data } = await api.post(BASE, payload);
  return data.data ?? data;
}

export async function updateHistoricalPlace(
  id: number,
  payload: Partial<HistoricalPlaceInput>
): Promise<HistoricalPlaceRecord> {
  const { data } = await api.put(`${BASE}/${id}`, payload);
  return data.data ?? data;
}

export async function deleteHistoricalPlace(id: number): Promise<void> {
  await api.delete(`${BASE}/${id}`);
}

export async function deleteHistoricalPlaces(ids: number[]): Promise<void> {
  // If your API has a dedicated bulk-delete route, swap this for a single
  // request to it instead — this fallback just fires deletes in parallel.
  await Promise.all(ids.map((id) => deleteHistoricalPlace(id)));
}
