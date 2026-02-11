import { useState, useEffect, useCallback } from "react";
import type { CityLookupResponse } from "../types/weather";
import { getGeo } from "../services/weatherService";

export function useGeo(location: string = "") {
  const [data, setData] = useState<CityLookupResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const lookupCity = useCallback(async () => {
    try {
      const result = await getGeo(location);
      setData(result);
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    lookupCity();
  }, [lookupCity]);

  return { data, loading, error, refetch: lookupCity };
}
