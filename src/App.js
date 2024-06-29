import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

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
 }
  return (
    <div className="App">
      <input
        type="text"
        placeholder="enter your todo"
        className="todo-input"
        onChange={handleChange}
        value={todo}
      />
      <button onClick={handleSubmit}>{isEdit ? "Edit Todo" :"Add Todo"}
      </button>
      {error ? <p>Input is empty</p> : null}
      {todoList.map((item, i) => (
        <div key={i}>
          <p
            style={{
              textDecoration: item.markAsRead ? "line-through" : "none",
            }}
          >
            {item.text}
          </p>
          <button onClick={() => handleMarkAsRead(i)}>Mark As Read</button>
          <button onClick={() => handleDeleted(i)}>Delete</button>
          <button onClick={() => handleEdit(i)}>Edit</button>
        </div>
      ))} 
    </div>
  );
}

export default App;
