import { useState } from "react";
import {
  Button,
  Input,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [saveIndex, setIndex] = useState(-1);
  const [isDustbinOpen, setDustbinOpen] = useState(false);
  const [isItemBeingDeleted, setItemBeingDeleted] = useState(false);
  const [deletingItemIndex, setDeletingItemIndex] = useState(null);

  const handleSubmit = () => {
    if (todo) {
      let newTodoLists = [...todoList];
      newTodoLists.push({ text: todo, markAsRead: false });
      setTodoList(newTodoLists);
      setTodo("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleMarkAsRead = (index) => {
    let newTodoLists = [...todoList];
    newTodoLists[index] = {
      ...newTodoLists[index],
      markAsRead: true,
    };
    setTodoList(newTodoLists);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (index) => {
    // Trigger animation and change bin image to open
    setItemBeingDeleted(true);
    setDustbinOpen(true);
    setDeletingItemIndex(index);

    setTimeout(() => {
      let newTodoLists = [...todoList];
      if (newTodoLists[index].markAsRead) {
        let deletedItem = newTodoLists.splice(index, 1)[0];
        setTodoList(newTodoLists);
        setDeletedItems([...deletedItems, deletedItem]);
      }

      // Close the bin lid after the animation
      setTimeout(() => {
        setDustbinOpen(false);
        setItemBeingDeleted(false);
        setDeletingItemIndex(null);
      }, 1000); // Adjust the timing to match the closing animation
    }, 1000); // Adjust the timing to match the delete animation
  };

  const handleEdit = (index) => {
    let newTodoLists = [...todoList];
    setTodo(newTodoLists[index].text);
    setEdit(true);
    setIndex(index);
  };

  const saveEdit = () => {
    let newTodoLists = [...todoList];
    newTodoLists[saveIndex] = {
      ...newTodoLists[saveIndex],
      text: todo,
    };
    setTodoList(newTodoLists);
    setTodo("");
    setEdit(false);
  };

  const handleRemoveAll = () => {
    setTodoList([]);
    setDeletedItems([]);
    setDustbinOpen(false);
  };

  const toggleDustbin = () => {
    setDustbinOpen(!isDustbinOpen);
  };

  return (
    <div className="App">
      <Input
        type="text"
        placeholder="Enter your todo"
        className="todo-input"
        onChange={handleChange}
        value={todo}
      />
      <Button
        className="edit-btn my-3"
        color={isEdit ? "danger" : "primary"}
        onClick={isEdit ? saveEdit : handleSubmit}
      >
        {isEdit ? "Edit Todo" : "Add Todo"}
      </Button>
      <Button className="mx-3" color="danger" onClick={handleRemoveAll}>
        Remove All
      </Button>
      {error && <Alert color="danger">Input is empty</Alert>}
      <div className="dustbin" onClick={toggleDustbin}>
        <img
          src={isDustbinOpen ? "/binopen.png" : "/binclose.png"}
          alt="Dustbin"
        />
      </div>
      {todoList.map((item, i) => (
        <div
          key={i}
          className={`input-btn d-flex align-items-center justify-content-center gap-3 ${
            isItemBeingDeleted && deletingItemIndex === i ? "deleting" : ""
          }`}
        >
          <p
            className="output col-6 d-flex align-items-center"
            style={{
              textDecoration: item.markAsRead ? "line-through" : "none",
            }}
          >
            {`${i + 1}) ${item.text}`}
          </p>
          <div className="col-6 d-flex gap-2">
            <Button color="primary" onClick={() => handleMarkAsRead(i)}>
              Mark As Read
            </Button>
            <Button color="primary" onClick={() => handleDelete(i)}>
              Delete
            </Button>
            <Button color="danger" onClick={() => handleEdit(i)}>
              Edit
            </Button>
          </div>
        </div>
      ))}
      <Modal isOpen={isEdit} toggle={() => setEdit(false)}>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            value={todo}
            onChange={handleChange}
            placeholder="Edit your todo"
          />
          <Button color="primary" onClick={saveEdit}>
            Save Changes
          </Button>{" "}
          <Button color="secondary" onClick={() => setEdit(false)}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>
      {isDustbinOpen && (
        <div className="dustbin-contents">
          {deletedItems.map((item, index) => (
            <p key={index}>{item.text}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
