const express = require("express");
const router = express.Router();
const {
  createNote,
  getAllNotes,
  deleteNote,
  searchNotes
} = require("../controllers/catNoteController");

router.post("/notes", createNote);
router.get("/notes", getAllNotes);
router.delete("/notes/:id", deleteNote);
router.get("/search", searchNotes);

module.exports = router;
