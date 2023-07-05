const connectionMySQL = require("../../database/db.connect");

const getAllNoteModal = (res) => {
  // Câu truy vấn SELECT để lấy dữ liệu từ bảng "note"
  const query = "SELECT * FROM todos";

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
  console.log(111111, req.body);
  const newNotes = {
    content: req.body.content,
    due_date: req.body.due_date,
    status: Number(req.body.status),
    asignment: req.body.asignment,
  };

  // Truy vấn SQL INSERT
  const query =
    "INSERT INTO todos (content, due_date, status, asignment) VALUES (?, ?, ?, ?)";
  const values = [
    newNotes.content,
    newNotes.due_date,
    newNotes.status,
    newNotes.asignment,
  ];

  // Thực thi truy vấn
  connectionMySQL.query(query, values, (error, result) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error add note" });
    } else {
      console.log("Add new todo successfully");
      res.status(200).json({ message: "Add new todo successfully" });
    }
  });
};

const deleteNoteModel = (id, res) => {
  // Câu truy vấn DELETE để xóa ghi chú dựa trên id
  const query = "DELETE FROM todos WHERE id = ?";

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

//Xử lý Update dữ liệu
const updateNoteModel = (req, res) => {
  const id = Number(req.params.id);
  const updatedNote = {
    content: req.body.content,
    due_date: req.body.due_date,
    status: req.body.status,
    asignment: req.body.asignment,
  };

  // Câu truy vấn UPDATE để cập nhật dữ liệu ghi chú dựa trên id
  const query =
    "UPDATE todos SET content = ?, due_date = ?, status = ?, asignment = ? WHERE id = ?";
  const values = [
    updatedNote.content,
    updatedNote.due_date,
    updatedNote.status,
    updatedNote.asignment,
    id,
  ];

  // Thực thi câu truy vấn
  connectionMySQL.query(query, values, (error, result) => {
    if (error) {
      console.error("Error updating note in MySQL:", error);
      res.status(500).json({ message: "Error updating note in MySQL" });
      return;
    }
    // Kiểm tra số lượng ghi chú bị ảnh hưởng (được cập nhật)
    const affectedRows = result.affectedRows;
    if (affectedRows > 0) {
      console.log("Update note successfully");
      res.status(200).json({ message: "Update note successfully" });
    } else {
      console.log("Note not found");
      res.status(404).json({ message: "Note not found" });
    }
  });
};

module.exports = { addNewNoteModel, getAllNoteModal, deleteNoteModel, updateNoteModel };
