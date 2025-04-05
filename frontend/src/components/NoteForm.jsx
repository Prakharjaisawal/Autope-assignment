import React, { useState } from 'react';
import axios from 'axios';
import "./NoteForm.css"


const API_URL = process.env.REACT_APP_API_URL;

export default function NoteForm({ onNoteAdded }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}api/notes`, { title, content });
    setTitle('');
    setContent('');
    onNoteAdded();
  };
  
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="titleInput"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="contentInput"
      ></textarea>
      <button type="submit" className="addNoteButton">
        Add Note
      </button>
    </form>
  );
}
