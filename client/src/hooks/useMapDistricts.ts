import { useCallback, useEffect, useRef, useState } from "react";
import { getMapProvinces } from "../services/map.service";
import type { Province } from "../data/provinces";

interface State {
  provinces: Province[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Loads the full province/district map shapes (static SVG paths) and merges
 * in the live historical places from the API so the map always reflects the
 * latest data – even after an admin adds a new place.
 */
export default function useMapDistricts() {
  const [state, setState] = useState<State>({
    provinces: [],
    isLoading: true,
    error: null,
  });

  // Keep a stable ref so we can expose a manual refresh without the
  // function identity changing on every render.
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    // Cancel any in-flight request before starting a new one.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await getMapProvinces();
      if (controller.signal.aborted) return;
      setState({ provinces: data, isLoading: false, error: null });
    } catch (err: any) {
      if (controller.signal.aborted) return;
      setState({
        provinces: [],
        isLoading: false,
        error: "Couldn't load map data. Please try again.",
      });
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  return { ...state, refresh: load };
}
