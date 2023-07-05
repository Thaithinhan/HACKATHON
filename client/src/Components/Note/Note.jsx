import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Note.css";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Note = ({ setNotes }) => {
  const [value, setValue] = useState();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    if (!value) {
      toast.error("Please input notes", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    const newNotes = {
      id: uuidv4(),
      title: value,
    };
    //Xử lý API
    axios
      .post("http://localhost:8000/notes", newNotes)
      .then((response) => {
        // Xử lý phản hồi thành công từ API (nếu cần)
        console.log(response.data);
        getNote();
      })
      .catch((error) => {
        // Xử lý lỗi từ API (nếu có)
        console.error(error);
      });
  };

  const getNote = async () => {
    const response = await axios.get("http://localhost:8000/notes");
    // console.log(response);
    setNotes(response.data);
  };

  return (
    <div className="main-content">
      <ToastContainer />;
      <Form
        onSubmit={handleSubmit}
        method="post"
        action="'http://localhost:8000/notes"
      >
        <Form.Group
          className="mb-3 form-group"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Take a Note..."
            name="title"
            onChange={handleInput}
            value={value}
          />
        </Form.Group>
        <Button variant="warning" className="addbtn" type="submit">
          <AiOutlinePlus />
        </Button>{" "}
      </Form>
    </div>
  );
};

export default Note;
