import { useEffect, useState } from "react";

import {
  getHistoricalPlace,
  getNearbyHistoricalPlaces,
  type NearbyPlaceResponse,
} from "../services/historicalPlace.service";

import type { HistoricalPlaceDetails } from "../types/historicalPlace.types";

export default function useHistoricalPlace(id: number | string | undefined) {
  const [place, setPlace] = useState<HistoricalPlaceDetails | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Nearby places returned by the backend
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlaceResponse[]>([]);

  const [nearbyLoading, setNearbyLoading] = useState(false);

  const [nearbyError, setNearbyError] = useState("");

  useEffect(() => {
    // ---------------------------------------------------------
    // No ID
    // ---------------------------------------------------------

    if (
      id === undefined ||
      id === null ||
      (typeof id === "string" && id.trim() === "")
    ) {
      setPlace(null);

      setLoading(false);
      setError("");

      setNearbyPlaces([]);
      setNearbyLoading(false);
      setNearbyError("");

      return;
    }

    // ---------------------------------------------------------
    // Validate ID
    // ---------------------------------------------------------

    if (
      (typeof id === "number" && !Number.isInteger(id)) ||
      (typeof id === "number" && id <= 0)
    ) {
      setPlace(null);

      setLoading(false);
      setError("Invalid place ID");

      setNearbyPlaces([]);
      setNearbyLoading(false);
      setNearbyError("");

      return;
    }

    // ---------------------------------------------------------
    // Reset state before fetching
    // ---------------------------------------------------------

    setLoading(true);
    setError("");

    setNearbyPlaces([]);
    setNearbyLoading(false);
    setNearbyError("");

    // ---------------------------------------------------------
    // Get current historical place
    // ---------------------------------------------------------

    const loadHistoricalPlace = async () => {
      try {
        const placeData = await getHistoricalPlace(id);

        setPlace(placeData);

        // -----------------------------------------------------
        // Check whether we have the data required by
        // the nearby historical places API
        // -----------------------------------------------------

        const hasNearbyData =
          placeData &&
          placeData.id > 0 &&
          placeData.district?.id > 0 &&
          typeof placeData.anchorXPct === "number" &&
          typeof placeData.anchorYPct === "number";

        if (!hasNearbyData) {
          setNearbyPlaces([]);
          setNearbyLoading(false);
          setNearbyError("");

          return;
        }

        // -----------------------------------------------------
        // Get nearby historical places
        //
        // Example backend request:
        //
        // GET
        // /historicalPlace/10/nearby
        // ?districtId=9
        // &anchorXPct=0.45
        // &anchorYPct=0.30
        // -----------------------------------------------------

        setNearbyLoading(true);
        setNearbyError("");

        try {
          const nearby = await getNearbyHistoricalPlaces(
            placeData.id,
            placeData.district.id,
            placeData.anchorXPct,
            placeData.anchorYPct,
          );

          setNearbyPlaces(nearby);
        } catch (nearbyErr) {
          console.error("Failed to load nearby historical places:", nearbyErr);

          setNearbyPlaces([]);
          setNearbyError("Failed to load nearby places");
        } finally {
          setNearbyLoading(false);
        }
      } catch (err) {
        console.error("Failed to load historical place:", err);

        setPlace(null);
        setError("Failed to load place");

        setNearbyPlaces([]);
        setNearbyLoading(false);
        setNearbyError("");
      } finally {
        setLoading(false);
      }
    };

    loadHistoricalPlace();
  }, [id]);

  return {
    // Current historical place
    place,
    loading,
    error,

    // Nearby historical places
    nearbyPlaces,
    nearbyLoading,
    nearbyError,
  };
}
