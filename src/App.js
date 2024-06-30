import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Button } from "reactstrap";
import { Input } from "reactstrap";
function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [saveIndex, setIndex] = useState(-1);

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
    newTodoLists[index]={
      text: newTodoLists[index].text ,markAsRead : true,
    };
   
    setTodoList(newTodoLists);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
 const handleDeleted=(index) =>{
  let newTodoLists = [...todoList];
  if(newTodoLists[index].markAsRead){
  newTodoLists.splice(index,1);
  setTodoList(newTodoLists);

  };
  
 }
 const handleEdit=(index) =>{
  let newTodoLists = [...todoList];
  setTodo(newTodoLists[index].text);
  setEdit(true);
  setIndex(index);
 }
 const saveEdit = () =>{
  let newTodoLists = [...todoList];
  newTodoLists[saveIndex]={
    ...newTodoLists[saveIndex],
    text:todo,

  };
  setTodoList(newTodoLists);
  setTodo("");
  setEdit(false);
 };
  return (
    <div className="App ">
      <Input
        type="text"
        placeholder="enter your todo"
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
      {error ? <p className="text-danger">Input is empty</p> : null}
      {todoList.map((item, i) => (
        <div
          key={i}
          className="input-btn d-flex align-items-center justify-content-center gap-3 "
        >
          <p
            className="output col-6 d-flex align-items-center "
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
            <Button color="primary" onClick={() => handleDeleted(i)}>
              Delete
            </Button>
            <Button color="danger" onClick={() => handleEdit(i)}>
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
