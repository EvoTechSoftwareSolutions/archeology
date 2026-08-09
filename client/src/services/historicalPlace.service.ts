import api from "../lib/axios";

import type {
  HistoricalPlaceRecord,
  HistoricalPlaceListParams,
  HistoricalPlaceInput,
  Paginated,
  HistoricalPlaceDetails
} from "../types/historicalPlace.types";

const BASE = "/historicalPlace";

export async function getHistoricalPlaces(
  params: HistoricalPlaceListParams = {},
): Promise<Paginated<HistoricalPlaceRecord>> {
  const response = await api.get(BASE, {
    params,
  });

  const payload = response.data.data ?? response.data;

  // Backend returns array
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

  // Backend already returns pagination
  return {
    items: payload.items ?? [],

    total: payload.total ?? 0,

    page: payload.page ?? params.page ?? 1,

    pageSize: payload.pageSize ?? params.pageSize ?? 7,
  };
}

export async function getHistoricalPlaceById(id: number | string) {
  const response = await api.get(`${BASE}/${id}`);

  return response.data.data ?? response.data;
}

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

export const updateHistoricalPlace = async (
  id: number,
  data: Partial<HistoricalPlaceInput> | FormData
) => {
  const response = await api.put(`/historicalPlace/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export async function deleteHistoricalPlace(id: number) {
  await api.delete(`${BASE}/${id}`);
}

export async function deleteHistoricalPlaces(ids: number[]) {
  await Promise.all(ids.map((id) => deleteHistoricalPlace(id)));
}

export async function getHistoricalPlace(id: number | string) {
  const response = await api.get(`/historicalPlace/${id}`);

  return response.data.data as HistoricalPlaceDetails;
}

export async function toggleHistoricalPlaceStatus(id: number) {
  const response = await api.put(
    `${BASE}/${id}/toggle-status`,
  );

  return response.data.data ?? response.data;
}
