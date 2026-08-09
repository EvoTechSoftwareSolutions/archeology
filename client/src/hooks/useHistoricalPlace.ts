import { useEffect, useState } from "react";

import { getHistoricalPlace } from "../services/historicalPlace.service";

import type { HistoricalPlaceDetails } from "../types/historicalPlace.types";

export default function useHistoricalPlace(id: number | string) {
  const [place, setPlace] = useState<HistoricalPlaceDetails>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // If no id was supplied (pages that render from props), skip fetching and
    // do not surface an error. Treat only explicit invalid numeric ids as errors.
    if (id === undefined || id === null || (typeof id === 'string' && id.toString().trim() === '')) {
      setLoading(false);
      setError('');
      return;
    }

    if (typeof id === "number" && isNaN(id)) {
      setLoading(false);
      setError("Invalid place ID");
      return;
    }

    setLoading(true);
    setError("");

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
