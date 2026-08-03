import { useEffect, useRef, useState } from "react";
import { getDistrictHeritagePlaces } from "../services/district.service";
import type { HistoricalPlace } from "../types/district";

interface State {
  places: HistoricalPlace[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Fetches the historical places for whichever district is selected, via
 * GET /districts/:id — the backend scopes historicalPlaces to that one
 * district itself, so there's no risk of places from other districts
 * leaking in (which is what a query-param filter on the flat
 * /historicalPlace list was doing before this fix).
 */
export default function useDistrictHeritage(districtId: string | null) {
  const cache = useRef(new Map<string, HistoricalPlace[]>());
  const [state, setState] = useState<State>({
    places: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!districtId) {
      setState({ places: [], isLoading: false, error: null });
      return;
    }

    const cached = cache.current.get(districtId);
    if (cached) {
      setState({ places: cached, isLoading: false, error: null });
      return;
    }

    const numericId = Number(districtId);
    if (!numericId || Number.isNaN(numericId)) {
      setState({ places: [], isLoading: false, error: null });
      return;
    }

    let cancelled = false;
    setState({ places: [], isLoading: true, error: null });

    getDistrictHeritagePlaces(numericId)
      .then((places) => {
        if (cancelled) return;
        cache.current.set(districtId, places);
        setState({ places, isLoading: false, error: null });
      })
      .catch(() => {
        if (cancelled) return;
        setState({
          places: [],
          isLoading: false,
          error: "Couldn't load heritage places for this district.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [districtId]);

  return state;
}
