import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [error, setError] = useState(false);

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
  newTodoLists.splice(index,1);
  setTodoList(newTodoLists);
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
      <button onClick={handleSubmit}>Submit Todo</button>
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
        </div>
      ))} 
    </div>
  );
}

export default App;
