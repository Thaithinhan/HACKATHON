const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

router.get("/", noteController.getAllNote);

router.post("/", noteController.addNewNote);

router.delete("/:id", noteController.deleteNote);

module.exports = router;
