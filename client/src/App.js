import logo from "./logo.svg";
import "./App.css";
import Note from "./Components/Note/Note";
import "bootstrap/dist/css/bootstrap.min.css";
import RenderNote from "./Components/RenderNote/RenderNote";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [statusForm, setStatusForm] = useState(false);
  const [editTodo, setEditTodo] = useState();

  const getNote = async () => {
    const response = await axios.get("http://localhost:8000/notes");
    // console.log(response);
    setNotes(response.data);
  };

  useEffect(() => {
    getNote();
  }, []);

  // console.log(editTodo, statusForm);

  return (
    <div className="App wrapper">
      <Note
        setNotes={setNotes}
        statusForm={statusForm}
        setStatusForm={setStatusForm}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
      <RenderNote
        notes={notes}
        setNotes={setNotes}
        statusForm={statusForm}
        setStatusForm={setStatusForm}
        setEditTodo={setEditTodo}
      />
    </div>
  );
}

export default App;
