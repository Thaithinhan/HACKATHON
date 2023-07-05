const connectionMySQL = require("../../database/db.connect");

const getAllNoteModal = (res) => {
  // Câu truy vấn SELECT để lấy dữ liệu từ bảng "note"
  const query = "SELECT * FROM notes";

  let notes = [];
  connectionMySQL.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching data from MySQL:", error);
      res.status(500).json({ message: "Error fetching data from MySQL" });
      return;
    }
    notes = results;
    console.log(notes);
    res.status(200).json(notes);
  });
};

const addNewNoteModel = (req, res) => {
  const newNotes = {
    id: req.body.id,
    title: req.body.title,
  };

  // Truy vấn SQL INSERT
  const query = "INSERT INTO notes (id, title) VALUES (?, ?)";
  const values = [newNotes.id, newNotes.title];

  // Thực thi truy vấn
  connectionMySQL.query(query, values, (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error add note" });
    } else {
      console.log("Add new note successfully");
      res.status(200).json({ message: "Add new note successfully" });
    }
  });
};

const deleteNoteModel = (id, res) => {
  // Câu truy vấn DELETE để xóa ghi chú dựa trên id
  const query = "DELETE FROM notes WHERE id = ?";

  // Thực thi câu truy vấn
  connectionMySQL.query(query, [id], (error, result) => {
    if (error) {
      console.error("Error deleting note from MySQL:", error);
      res.status(500).json({ message: "Error deleting note from MySQL" });
      return;
    }

    // Kiểm tra số lượng ghi chú bị ảnh hưởng (bị xóa)
    const affectedRows = result.affectedRows;
    if (affectedRows > 0) {
      console.log("Delete note successfully");
      res.status(200).json({ message: "Delete note successfully" });
    } else {
      console.log("Note not found");
      res.status(404).json({ message: "Note not found" });
    }
  });
};

module.exports = { addNewNoteModel, getAllNoteModal, deleteNoteModel };
