const axios = require("axios");
const Note = require("../models/catNoteModel");
const mongoose = require('mongoose')
const logger = require('../logger');

// Create Note with cat fact
exports.createNote = async (req, res) => {
    try {
      const { title, content } = req.body;
  
      if (!title || !content) {
        logger.warn("Validation failed - title or content missing");
        return res.status(400).json({
          success: false,
          error: "Both title and content are required.",
        });
      }
  
      let catfact = "";
      try {
        const catFactRes = await axios.get("https://catfact.ninja/fact");
        catfact = catFactRes.data.fact || "No cat fact available.";
      } catch (catError) {
        logger.error("Cat Fact API Error:", catError);
        catfact = "Cat fact not available due to API error.";
      }
  
      const newNote = await Note.create({ title, content, catfact });
      logger.info("New note created", { title, content });
  
      res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: newNote,
      });
    } catch (err) {
      logger.error("Create Note Error:", err);
      res.status(500).json({
        success: false,
        error: "Internal server error. Please try again later.",
      });
    }
  };
  

// Get All Notes
exports.getAllNotes = async (req, res) => {
    try {
      logger.info("Fetching all notes...");
  
      const notes = await Note.find();
  
      if (!notes || notes.length === 0) {
        logger.warn("No notes found in the database.");
        return res.status(404).json({
          success: false,
          message: "No notes found",
          data: [],
        });
      }
  
      logger.info(`Fetched ${notes.length} notes successfully.`);
      res.status(200).json({
        success: true,
        message: "Notes fetched successfully",
        count: notes.length,
        data: notes,
      });
    } catch (err) {
      logger.error("Get All Notes Error:", err);
      res.status(500).json({
        success: false,
        error: "Internal server error. Please try again later.",
      });
    }
  };
  

// Delete Note by ID


exports.deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
  
      logger.info(`Request to delete note with ID: ${id}`);
  
      // Validate MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.warn(`Invalid note ID received: ${id}`);
        return res.status(400).json({
          success: false,
          error: "Invalid note ID",
        });
      }
  
      const deleted = await Note.findByIdAndDelete(id);
  
      if (!deleted) {
        logger.warn(`Note not found for deletion with ID: ${id}`);
        return res.status(404).json({
          success: false,
          error: "Note not found",
        });
      }
  
      logger.info(`Note deleted successfully. ID: ${id}`);
      res.status(200).json({
        success: true,
        message: "Note deleted successfully",
        data: deleted,
      });
    } catch (err) {
      logger.error("Delete Note Error:", err);
      res.status(500).json({
        success: false,
        error: "Internal server error. Please try again later.",
      });
    }
  };

// Search Notes by content or catfact
exports.searchNotes = async (req, res) => {
    const timestamp = new Date().toISOString();
  
    try {
      const { query } = req.query;
  
      logger.info(`[${timestamp}] Search request received with query: "${query}"`);
  
      // Validate if query exists and is a string
      if (!query || typeof query !== "string") {
        logger.warn(`[${timestamp}] Invalid or missing search query`);
        return res.status(400).json({
          success: false,
          error: "Invalid or missing search query",
        });
      }
  
      // Perform case-insensitive search in title, content, or catfact
      const data = await Note.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { catfact: { $regex: query, $options: "i" } }
        ]
      });
  
      // Check if notes are found
      if (data.length === 0) {
        logger.info(`[${timestamp}] No matching notes found for query: "${query}"`);
        return res.status(404).json({
          success: false,
          message: "No matching notes found",
        });
      }
  
      logger.info(`[${timestamp}] Found ${data.length} notes matching query: "${query}"`);
      res.status(200).json({ success: true, data });
  
    } catch (err) {
      logger.error(`[${timestamp}] Error in searchNotes: ${err.message}`, { stack: err.stack });
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  };