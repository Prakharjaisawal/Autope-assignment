// App.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";
import "./App.css";


const API_URL = process.env.REACT_APP_API_URL;

console.log("API URL", `${API_URL}api/notes`)

export default function App() {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}api/notes`);
      console.log("Inside fetchdata", `${API_URL}api/notes`)
      console.log("Initial fetch result:", res.data);
      setNotes(res.data.data);
      setSearchError("");
    } catch (error) {
      console.error("Error fetching notes:", error);
      setSearchError("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query) return fetchNotes();

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/search?query=${query}`);
      setNotes(res.data.data);
      setSearchError("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNotes([]);
        setSearchError("No results found. Please try a different query.");
      } else {
        setSearchError("Something went wrong while searching.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="main">
      <div className="vessel1">
        <h1 className="mainHeader">Cat Fact Notes</h1>
        <NoteForm onNoteAdded={fetchNotes} />
        <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />

        {searchError && <p className="searcherror">{searchError}</p>}

        {loading ? (
          <p className="loading">Loading notes...</p>
        ) : (
          <NotesList notes={notes} onDelete={fetchNotes} />
        )}
      </div>
    </div>
  );
}
