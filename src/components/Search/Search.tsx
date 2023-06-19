import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';
import { useSearch } from './hooks/useSearch';
import styles from './Search.module.scss';

type SearchProps = React.HTMLAttributes<HTMLDivElement>;

const Search: React.FC<SearchProps> = (props) => {
  const {
    loading,
    isResultsVisible,
    setIsResultsVisible,
    results,
    searchInputRef,
    throttledHandleChange,
  } = useSearch();

  return (
    <div className={styles.search} {...props}>
      <div className={styles.search__bar}>
        <div className={styles.search__input}>
          <MagnifyingGlassIcon width={32} height={32} strokeWidth={3} />
          <input
            type="search"
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
              <div className={styles.search__results} data-testid="search-result-container">
                {results.map((result) => (
                  <Link
                    key={result.board_id}
                    className={styles.search__result}
                    to={`/board/${result.board_id}`}
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
