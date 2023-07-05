import logo from "./logo.svg";
import "./App.css";
import Note from "./Components/Note/Note";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header/Header";
import RenderNote from "./Components/RenderNote/RenderNote";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  const getNote = async () => {
    const response = await axios.get("http://localhost:8000/notes");
    // console.log(response);
    setNotes(response.data);
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <div className="App wrapper">
      <Header />
      <Note setNotes={setNotes} />
      <RenderNote notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
