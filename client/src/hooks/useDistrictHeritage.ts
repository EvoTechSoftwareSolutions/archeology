import { useEffect, useState } from "react";
import { getDistrictHeritagePlaces } from "../services/district.service";
import type { HistoricalPlace } from "../types/district";

interface State {
  places: HistoricalPlace[];
  isLoading: boolean;
  error: string | null;
}

export default function useDistrictHeritage(districtId: string | null) {
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
