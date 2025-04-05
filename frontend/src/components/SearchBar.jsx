import React from 'react';
import "./Searchbar.css"

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search notes or cat facts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="inputSearch"
      />
      <button
        onClick={onSearch}
        className="searchButton"
      >
        Search
      </button>
    </div>
  );
}
