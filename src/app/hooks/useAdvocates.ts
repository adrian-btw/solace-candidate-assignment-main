import { useEffect, useMemo, useState } from "react";
import { Advocate } from "../types/advocate";

export interface UseAdvocatesResult {
  advocates: Advocate[];
  hasMore: boolean;
  loading: boolean;
  error?: string;
}

export const useAdvocates = (
  pageNum: number,
  pageSize: number
): UseAdvocatesResult => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(undefined);
    fetch(`/api/advocates?pageNum=${pageNum}&pageSize=${pageSize}`)
      .then(async (response) => {
        const json = await response.json();
        if (!cancelled) {
          setAdvocates(json.data ?? []);
          setHasMore(Boolean(json.hasMore));
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message ?? "Failed to fetch advocates");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pageNum, pageSize]);

  return { advocates, hasMore, loading, error };
};
