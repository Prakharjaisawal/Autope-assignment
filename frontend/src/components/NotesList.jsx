// components/NotesList.js

import React, { useState } from 'react';
import axios from 'axios';
import "./NoteList.css"


const API_URL = process.env.REACT_APP_API_URL;
console.log("API URL", API_URL)

export default function NotesList({ notes, onDelete }) {
  const [deleteError, setDeleteError] = useState('');
  console.log('Initial fetch result from notes:', notes);
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}api/notes/${id}`);
      setDeleteError('');
      onDelete();
    } catch (error) {
      console.error('Error deleting note:', error);
      setDeleteError('Failed to delete the note. Please try again.');
    }
  };

  return (
    <div className="Notelist">
      {deleteError && (
        <p className="deleteError">{deleteError}</p>
      )}

      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <div
            key={note._id}
            className="note-card"
          >
            <h2 className="">Title : {note.title}</h2>
            <p className="">Content : {note.content}</p>
            <p className="">
              Cat Fact: {note.catfact}
            </p>
            <button
              onClick={() => deleteNote(note._id)}
              className="deleteButton"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p className="noNotes">No notes available.</p>
      )}
    </div>
  );
}
