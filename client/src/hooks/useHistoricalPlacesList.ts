import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteHistoricalPlace,
  deleteHistoricalPlaces,
  getHistoricalPlaces,
  toggleHistoricalPlaceStatus,
} from "../services/historicalPlace.service";
import { exportToCsv } from "../utils/csvExport";
import type { HistoricalPlaceRecord } from "../types/historicalPlace.types";

const PAGE_SIZE = 10;

/**
 * All the state + behaviour HistoricalPlaces.tsx needs. Bind these
 * straight onto your existing table/filter UI, e.g.:
 *   <input value={search} onChange={e => setSearch(e.target.value)} />
 *   <select value={districtId ?? ""} onChange={e => setDistrictId(...)} />
 *   {items.map(place => <tr key={place.id}>...)}
 */
export default function useHistoricalPlacesList() {
  const [items, setItems] = useState<HistoricalPlaceRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [statusFlag, setStatusFlag] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(null);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(() => {
    setIsLoading(true);
    setError(null);
    getHistoricalPlaces({
      search: search || undefined,
      provinceId: provinceId ?? undefined,
      districtId: districtId ?? undefined,
      category: category ?? undefined,
      statusFlag: statusFlag ?? undefined,
      isActive: isActive ?? undefined,
      page,
      pageSize: PAGE_SIZE,
    })
      .then((res) => {
        setItems(res.items);
        setTotal(res.total);
      })
      .catch(() => setError("Couldn't load historical places."))
      .finally(() => setIsLoading(false));
  }, [search, provinceId, districtId, category, statusFlag, page, isActive]);

  useEffect(() => {
    load();
  }, [load]);

  // Reset to page 1 whenever a filter changes, so you're not stuck on an
  // out-of-range page for the new filter set.
  useEffect(() => {
    setPage(1);
  }, [search, provinceId, districtId, category, statusFlag, isActive]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total],
  );

  const toggleSelected = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.length === items.length ? [] : items.map((i) => i.id),
    );
  }, [items]);

  const remove = useCallback(
    async (id: number) => {
      // Show your existing confirmation dialog before calling this.
      await deleteHistoricalPlace(id);
      setNotice("Historical place deleted.");
      setSelectedIds((prev) => prev.filter((x) => x !== id));
      load();
    },
    [load],
  );

  const toggleActive = useCallback(
  async (id: number) => {
    try {
      setError(null);

      await toggleHistoricalPlaceStatus(id);

      setNotice("Historical place status updated.");

      load();
    } catch (error) {
      console.error("Failed to toggle historical place status:", error);
      setError("Couldn't update historical place status.");
    }
  },
  [load],
);

  const removeSelected = useCallback(async () => {
    // Show your existing confirmation dialog before calling this.
    if (selectedIds.length === 0) return;
    await deleteHistoricalPlaces(selectedIds);
    setNotice(`${selectedIds.length} historical place(s) deleted.`);
    setSelectedIds([]);
    load();
  }, [selectedIds, load]);

  const exportCsv = useCallback(() => {
    exportToCsv(items, "historical-places.csv");
  }, [items]);

 return {
  items,
  total,
  page,
  totalPages,
  setPage,

  search,
  setSearch,

  provinceId,
  setProvinceId,

  districtId,
  setDistrictId,

  category,
  setCategory,

  statusFlag,
  setStatusFlag,

  isActive,
  setIsActive,

  selectedIds,
  toggleSelected,
  toggleSelectAll,

  isLoading,
  error,
  notice,

  dismissNotice: () => setNotice(null),

  refresh: load,

  remove,
  removeSelected,

  toggleActive,

  exportCsv,
};
}
