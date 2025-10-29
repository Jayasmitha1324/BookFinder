import React from 'react';

export default function SearchBar({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  onSearch,
  loading,
  error,
  noResults
}) {
  return (
    <section className="search-card">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const formValues = {
            q: e.target.elements.query.value,
            author: e.target.elements.author.value,
            year: e.target.elements.year.value,
            language: e.target.elements.language.value,
          };

          onSearch(formValues);
        }}
        className="search-form"
      >
        {/* 🔍 Search Bar */}
        <div className="field-group">
          <input
            name="query"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by title, author, ISBN or keywords"
          />
        </div>

        {/* 🧩 Filters Row */}
        <div className="filters-row">
          <input
            name="author"
            placeholder="Author"
            value={filters.author}
            onChange={(e) =>
              onFiltersChange({ ...filters, author: e.target.value })
            }
          />

          <input
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={(e) =>
              onFiltersChange({ ...filters, year: e.target.value })
            }
          />

          <select
            name="language"
            value={filters.language}
            onChange={(e) =>
              onFiltersChange({ ...filters, language: e.target.value })
            }
          >
            <option value="">All Languages</option>
            <option value="ENG">English (ENG)</option>
            <option value="FRE">French (FRE)</option>
            <option value="SPA">Spanish (SPA)</option>
            <option value="GER">German (GER)</option>
            <option value="ITA">Italian (ITA)</option>
            <option value="POR">Portuguese (POR)</option>
            <option value="HIN">Hindi (HIN)</option>
            <option value="TAM">Tamil (TAM)</option>
            <option value="TEL">Telugu (TEL)</option>
            <option value="URD">Urdu (URD)</option>
            <option value="BEN">Bengali (BEN)</option>
            <option value="CHI">Chinese (CHI)</option>
            <option value="JPN">Japanese (JPN)</option>
            <option value="KOR">Korean (KOR)</option>
            <option value="RUS">Russian (RUS)</option>
            <option value="ARA">Arabic (ARA)</option>
            <option value="NLD">Dutch (NLD)</option>
            <option value="SWE">Swedish (SWE)</option>
            <option value="POL">Polish (POL)</option>
            <option value="TUR">Turkish (TUR)</option>
            <option value="THA">Thai (THA)</option>
            <option value="VIE">Vietnamese (VIE)</option>
            <option value="IND">Indonesian (IND)</option>
            <option value="MAL">Malay (MAL)</option>
            <option value="GUJ">Gujarati (GUJ)</option>
            <option value="KAN">Kannada (KAN)</option>
            <option value="MAR">Marathi (MAR)</option>
            <option value="PAN">Punjabi (PAN)</option>
            <option value="ELL">Greek (ELL)</option>
            <option value="HEB">Hebrew (HEB)</option>
          </select>
        </div>

        {/* 🎯 Buttons Row */}
        <div className="filters-buttons">
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>

          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
              onQueryChange('');
              onFiltersChange({ author: '', year: '', language: '' });
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {error && <p className="error-message">⚠️ {error}</p>}
      {noResults && !error && (
        <p className="no-results">📭 No results found for this search.</p>
      )}
    </section>
  );
}
