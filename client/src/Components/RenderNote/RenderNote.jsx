import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./RenderNote.css";
import axios from "axios";
import { Button } from "react-bootstrap";

const RenderNote = ({
  notes,
  setNotes,
  statusForm,
  setStatusForm,
  setEditTodo,
}) => {
  const [render, setRender] = useState([]);

  const getNote = async () => {
    setRender(notes);
  };

  useEffect(() => {
    getNote();
  }, [notes]);

  // Remove Notes
  const handleRemove = (id) => {
    // console.log(id);
    axios
      .delete(`http://localhost:8000/notes/${id}`)
      .then((response) => {
        console.log("Delete note successfully");
        // Cập nhật lại danh sách ghi chú sau khi xóa thành công
        const updatedNotes = render.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  };

  //Handle Edit
  const handleEdit = (todo) => {
    setStatusForm(true);
    setEditTodo(todo);
  };

  return (
    <div className="render-notes">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Asigment to</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {render.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.content} </td>
              <td>{todo.due_date}</td>
              <td>
                {todo.status == 1
                  ? "Pending"
                  : todo.stutus == 2
                  ? "Fullfil"
                  : "Reject"}
              </td>
              <td>{todo.asignment}</td>
              <td>
                <Button
                  className="btn btn-primary"
                  onClick={() => handleEdit(todo)}
                >
                  Update
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => handleRemove(todo.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RenderNote;
