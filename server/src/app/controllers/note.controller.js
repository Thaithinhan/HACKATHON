const noteModel = require("../models/note.model");

const getAllNote = (req, res) => {
  noteModel.getAllNoteModal(res);
};

const addNewNote = (req, res) => {
  noteModel.addNewNoteModel(req, res);
};

const deleteNote = (req, res) => {
  const id = req.params.id;
  noteModel.deleteNoteModel(id, res);
};

module.exports = { addNewNote, getAllNote, deleteNote };
