import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Note.css";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputGroup from "react-bootstrap/InputGroup";

const Note = ({
  setNotes,
  statusForm,
  editForm,
  setStatusForm,
  editTodo,
  setEditTodo,
}) => {
  const [value, setValue] = useState();
  const [method, setMethod] = useState("post");
  const [action, setAction] = useState("http://localhost:8000/notes");

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  //Xử lý method và acion của form

  // console.log(editTodo);
  useEffect(() => {
    if (statusForm) {
      setValue(editTodo);
      setMethod("patch");
      setAction(`http://localhost:8000/notes/${editTodo.id}`);
    }
  }, [editTodo, statusForm]);

  // console.log(action);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);

    // Nếu là thêm mới thì sẽ xử lý:
    if (!statusForm) {
      const newNotes = {
        content: value.content,
        due_date: value.due_date,
        status: value.status,
        asignment: value.asignment,
      };
      // Xử lý API
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
    } else {
      const editNotes = {
        content: value.content,
        due_date: value.due_date,
        status: value.status,
        asignment: value.asignment,
      };
      // Xử lý API
      axios
        .patch(action, editNotes)
        .then((response) => {
          // Xử lý phản hồi thành công từ API (nếu cần)
          console.log(response.data);
          getNote();
        })
        .catch((error) => {
          // Xử lý lỗi từ API (nếu có)
          console.error(error);
        });
    }
    setValue({
      content: "",
      due_date: "",
      status: "",
      asignment: "",
    });
    //Set lại status form
    setStatusForm(false);
    setEditTodo({});
  };

  const getNote = async () => {
    const response = await axios.get("http://localhost:8000/notes");
    // console.log(response);
    setNotes(response.data);
  };

  return (
    <div className="main-content">
      <Form method={method} action={action} onSubmit={handleSubmit}>
        <InputGroup className="mb-3 list-input">
          <InputGroup.Text id="todo">@</InputGroup.Text>
          <Form.Control
            placeholder="Task "
            aria-describedby="basic-addon1"
            name="content"
            onChange={handleInput}
            value={value?.content}
          />
          <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
          <Form.Control
            type="date"
            aria-describedby="basic-addon1"
            name="due_date"
            onChange={handleInput}
            value={
              value?.due_date
                ? new Date(value.due_date).toISOString().substr(0, 10)
                : ""
            }
          />
          <Form.Select
            aria-label="Default select example"
            name="status"
            onChange={handleInput}
            value={value?.status}
          >
            <option>Choose status...</option>
            <option value="1">Pending</option>
            <option value="2">Fulfill</option>
            <option value="3">Reject</option>
          </Form.Select>
          <InputGroup.Text id="todo">@</InputGroup.Text>
          <Form.Control
            placeholder="Asignment to "
            aria-describedby="basic-addon1"
            name="asignment"
            onChange={handleInput}
            value={value?.asignment}
          />
          <Button type="submit">{statusForm ? "Edit" : "Submit"}</Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default Note;
