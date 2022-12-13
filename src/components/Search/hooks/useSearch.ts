import throttle from 'lodash.throttle';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import search from '../../../api/search';
import { SearchResponseDto } from '../../../api/search/dto/SearchResponse.dto';

interface UseSearch {
  results: SearchResponseDto | null;
  isResultsVisible: boolean;
  setIsResultsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  searchInputRef: React.RefObject<HTMLInputElement>;
  throttledHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSearch = (): UseSearch => {
  const [results, setResults] = useState<SearchResponseDto | null>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const abortController = useMemo(() => new AbortController(), []);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        setResults(null);
        return;
      }
      try {
        setLoading(true);
        const { data } = await search(e.target.value, abortController.signal);
        if (searchInputRef.current?.value) {
          setResults(data);
        }
      } catch (err) {
        // send error to monitoring service
      } finally {
        setLoading(false);
      }
    },
    [abortController.signal]
  );

  const throttledHandleChange = useMemo(() => throttle(handleChange, 300), [handleChange]);

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  return {
    results,
    isResultsVisible,
    setIsResultsVisible,
    loading,
    searchInputRef,
    throttledHandleChange,
  };
};
