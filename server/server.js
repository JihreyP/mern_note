// Load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }
  
  // Import dependencies
  const express = require("express");
  const cors = require("cors");
  const connectToDb = require("./config/connectToDb");
  const notesController = require("./controllers/notesController");
  
  // Create an express app
  const app = express();
  
  // Configure express app
  app.use(express.json());
  app.use(cors());
  
  // Connect to database
  connectToDb();
  
  // Routing
  app.get("/notes", notesController.fetchNotes);
  app.get("/note/:id", notesController.fetchNote);
  app.post("/create_note", notesController.createNote);
  app.put("/note/:id", notesController.updateNote);
  app.delete("/note/:id", notesController.deleteNote);
  
  // Start our server
  app.listen(process.env.PORT);