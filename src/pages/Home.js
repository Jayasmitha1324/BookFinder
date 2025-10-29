import React, { useState, useRef, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookDetailsModal from '../components/BookDetailsModal';
import { searchBooks } from '../api/openLibrary';

export default function Home() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ author: '', year: '', language: '' });
  const [results, setResults] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [selected, setSelected] = useState(null);

  const PAGE_SIZE = 12;
  const lastGoodResults = useRef({ results: [], numFound: 0, page: 1 });
  const activeRequestId = useRef(0);

  // ✅ Restore previous search state when returning from modal
  useEffect(() => {
    const saved = sessionStorage.getItem('bookSearchState');
    if (saved) {
      const { query, filters, results, page, numFound } = JSON.parse(saved);
      setQuery(query);
      setFilters(filters);
      setResults(results);
      setPage(page);
      setNumFound(numFound);
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      doSearch(1);
    }
  }, [filters]);

  async function doSearch(requestedPage = 1, manualRetry = false) {
    const safeQuery = query.trim();
    if (!safeQuery) {
      setError('⚠️ Please enter a search term.');
      setResults([]);
      setNoResults(false);
      return;
    }

    // ✅ Clear cached state when a new search starts
    if (requestedPage === 1 && !manualRetry) {
      sessionStorage.removeItem('bookSearchState');
    }

    setLoading(true);
    setError('');
    setNoResults(false);

    const reqId = ++activeRequestId.current;

    try {
      const data = await searchBooks({
        q: safeQuery,
        author: filters.author.trim(),
        year: filters.year.trim(),
        language: filters.language,
        page: requestedPage,
        limit: PAGE_SIZE,
      });

      if (reqId !== activeRequestId.current) return;

      let docs = Array.isArray(data.docs) ? data.docs : [];

      if (filters.language) {
        const selectedLang = filters.language.toLowerCase();
        docs = docs.filter((b) =>
          Array.isArray(b.language)
            ? b.language.some((lang) =>
                String(lang).toLowerCase().includes(selectedLang)
              )
            : true
        );
      }

      if (docs.length === 0) {
        setResults([]);
        setNumFound(data.numFound || 0);
        if ((data.numFound || 0) > 0) {
          setError('⚠️ No books found on this page, try another.');
        } else {
          setNoResults(true);
        }
      } else {
        setResults(docs);
        setNumFound(data.numFound || 0);
        setPage(requestedPage);
        lastGoodResults.current = { results: docs, numFound: data.numFound || 0, page: requestedPage };
      }
    } catch (err) {
      console.error('Search failed:', err);
      if (lastGoodResults.current.results.length > 0 && !manualRetry) {
        setError('⚠️ Network error. Showing last known results.');
        setResults(lastGoodResults.current.results);
        setNumFound(lastGoodResults.current.numFound);
        setPage(lastGoodResults.current.page);
      } else {
        setError('❌ Failed to fetch data. Please retry.');
        setResults([]);
      }
    } finally {
      if (reqId === activeRequestId.current) setLoading(false);
    }
  }

  const totalPages = Math.max(1, Math.ceil(numFound / PAGE_SIZE));
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <div className="home-page">
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFiltersChange={setFilters}
        onSearch={() => doSearch(1)}
        loading={loading}
      />

      {/* Error Notice */}
      {error && (
        <div className="notice error">
          {error}
          <button
            className="btn small retry"
            onClick={() => doSearch(page, true)}
            disabled={loading}
            style={{ marginLeft: '10px' }}
          >
            🔁 Retry
          </button>
        </div>
      )}

      {/* Loading Notice */}
      {loading && <div className="notice">🔎 Searching books...</div>}

      {/* No Results */}
      {noResults && !loading && (
        <div className="notice">
          📭 No results found.
          <button
            className="btn small retry"
            onClick={() => doSearch(1, true)}
            disabled={loading}
            style={{ marginLeft: '10px' }}
          >
            🔁 Retry
          </button>
        </div>
      )}

      {/* Book Grid */}
      {!loading && results.length > 0 && (
        <div className="grid">
          {results.map((b) => (
            <BookCard
              key={`${b.key}_${b.cover_i || ''}`}
              book={b}
              onOpen={() => {
                // ✅ Save search state before opening modal
                sessionStorage.setItem(
                  'bookSearchState',
                  JSON.stringify({
                    query,
                    filters,
                    results,
                    page,
                    numFound,
                  })
                );
                setSelected(b);
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {numFound > 0 && !loading && (
        <div className="pagination">
          <button
            onClick={() => doSearch(page - 1)}
            disabled={isFirstPage || loading}
          >
            ◀ Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => doSearch(page + 1)}
            disabled={isLastPage || loading}
          >
            ▶ Next
          </button>
        </div>
      )}

      {/* Book Modal */}
      {selected && (
        <BookDetailsModal
          book={selected}
          onClose={() => {
            setSelected(null);
            // ✅ Restore search state after closing modal
            const saved = sessionStorage.getItem('bookSearchState');
            if (saved) {
              const { query, filters, results, page, numFound } =
                JSON.parse(saved);
              setQuery(query);
              setFilters(filters);
              setResults(results);
              setPage(page);
              setNumFound(numFound);
            }
          }}
        />
      )}
    </div>
  );
}
