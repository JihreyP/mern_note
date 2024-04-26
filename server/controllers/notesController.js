const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  // Find the notes
  const notes = await Note.find();

  // Respond with them
  res.json({ notes });
};

const fetchNote = async (req, res) => {
  // Get id off the url
  const noteId = req.params.id;

  // Find the note using that id
  const note = await Note.findById(noteId);

  // Respond with the note
  res.json({ note });
};

const createNote = async (req, res) => {
  // Get the sent in data off request body
  const { title, body } = req.body;

  // Create a note with it
  const note = await Note.create({
    title,
    body,
  });

  // respond with the new note
  res.json({ note });
};

const updateNote = async (req, res) => {
  // Get the id of the url
  const noteId = req.params.id;

  // Get the data of the req body
  const { title, body } = req.body;
  console.log(req.body);
  // Find and update the record
  await Note.findByIdAndUpdate(noteId, {
    title,
    body,
  });

  // Find updated note
  const note = await Note.findById(noteId);

  // Respond with it
  res.json({ note });
};

const deleteNote = async (req, res) => {
  try {
    // Get id from URL params
    const noteId = req.params.id;

    // Delete the record
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      // If no note is found with the given id, return 404 Not Found
      return res.status(404).json({ error: "Note not found" });
    }

    // Respond with success message
    res.json({ success: "Record deleted" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};