import React, { useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import "./RenderNote.css";
import axios from "axios";

const RenderNote = ({ notes, setNotes }) => {
  const [render, setRender] = useState([]);

  const getNote = async () => {
    setRender(notes);
  };

  useEffect(() => {
    getNote();
  }, [notes]);

  // Remove Notes
  const handleRemove = (id) => {
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

  return (
    <div className="render-notes">
      <ul className="note-list">
        {notes.map((note) => (
          <li className="note-item" key={note.id}>
            <p>{note.title}</p>
            <p>
              <button
                className="remove-btn btn btn-outline-warning"
                onClick={() => handleRemove(note.id)}
              >
                <BsTrashFill />
              </button>
            </p>
          </li>
        ))}
        {/*         
        <li className="note-item">
          <p>Lorem ipsum dolor sit</p>
          <p>
            {" "}
            <button className="remove-btn btn btn-outline-warning">
              <BsTrashFill />
            </button>
          </p>
        </li> */}
      </ul>
    </div>
  );
};

export default RenderNote;
