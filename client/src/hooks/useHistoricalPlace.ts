import { useEffect, useState } from "react";

import { getHistoricalPlace } from "../services/historicalPlace.service";

import type { HistoricalPlaceDetails } from "../types/historicalPlace.types";

export default function useHistoricalPlace(id: number) {
  const [place, setPlace] = useState<HistoricalPlaceDetails>();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    getHistoricalPlace(id)
      .then(setPlace)

      .catch(() => setError("Failed to load place"))

      .finally(() => setLoading(false));
  }, [id]);

  return {
    place,

    loading,

    error,
  };
}
