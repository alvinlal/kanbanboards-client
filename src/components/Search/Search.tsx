import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import React, { useState, useCallback, useRef } from 'react';
import throttle from 'lodash.throttle';
import { Link } from 'react-router-dom';
import SearchResponse from '../../api/search/types/SearchResponse';
import Spinner from '../Spinner/Spinner';
import styles from './Search.module.scss';
import search from '../../api/search';

const Search: React.FC = () => {
  const [results, setResults] = useState<SearchResponse | null>(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) {
        setResults(null);
        return;
      }
      try {
        setLoading(true);
        const { data } = await search(e.target.value);
        if (searchInputRef.current?.value) {
          setResults(data);
        }
      } catch (err) {
        // send error to monitoring service
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledHandleChange = useCallback(throttle(handleChange, 300), []);

  return (
    <div className={styles.search}>
      <div className={styles.search__bar}>
        <div className={styles.search__input}>
          <MagnifyingGlassIcon width={32} height={32} strokeWidth={3} />
          <input
            type="text"
            placeholder="Search"
            ref={searchInputRef}
            onChange={throttledHandleChange}
            onBlur={(e) => {
              if (e.relatedTarget?.id !== 'search-result') {
                setIsResultsVisible(false);
              }
            }}
            onFocus={() => {
              setIsResultsVisible(true);
            }}
          />
        </div>
        {loading && <Spinner />}
      </div>
      {/* eslint-disable-next-line no-nested-ternary */}
      {results
        ? results.length
          ? isResultsVisible && (
              <div
                className={styles.search__results}
                data-testid="search-result-container"
              >
                {results.map((result) => (
                  <Link
                    key={result._id}
                    className={styles.search__result}
                    to={`/board/${result._id}`}
                    id="search-result"
                  >
                    <h6>{result.title}</h6>
                    <ChevronRightIcon width={32} height={32} />
                  </Link>
                ))}
              </div>
            )
          : isResultsVisible && (
              <div
                className={`${styles.search__results}  ${styles.search__noresult}`}
                data-testid="search-result-container"
              >
                <div className={styles.search__result}>
                  <h6>No Results !</h6>
                </div>
              </div>
            )
        : null}
    </div>
  );
};

export default Search;
