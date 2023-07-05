const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");

router.get("/", noteController.getAllNote);

router.post("/", noteController.addNewNote);

router.delete("/:id", noteController.deleteNote);
router.patch("/:id", noteController.updateNote);

module.exports = router;
