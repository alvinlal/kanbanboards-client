import throttle from 'lodash.throttle';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import search from '../../../api/search';
import SearchResponse from '../../../api/search/types/SearchResponse';

interface UseSearch {
  results: SearchResponse | null;
  isResultsVisible: boolean;
  setIsResultsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  searchInputRef: React.RefObject<HTMLInputElement>;
  throttledHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSearch = (): UseSearch => {
  const [results, setResults] = useState<SearchResponse | null>(null);
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

  const throttledHandleChange = useMemo(
    () => (e: React.ChangeEvent<HTMLInputElement>) => {
      const throttledFn = throttle(handleChange, 300);
      throttledFn(e);
    },
    [handleChange]
  );

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
