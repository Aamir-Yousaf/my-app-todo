import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo]= useState("");
  const [error, setError]= useState(false);
  
  const handleSubmit = () => {
    if(todo){
     let newTodoLists = [...todoList];
     newTodoLists.push({ text: todo, markAsRead: false });
     setTodoList(newTodoLists);
     setTodo("");
    }
    else{
     setError(true); 
    }
  }
  const handleMarkAsRead = () =>{
     console.log("marked")
  }
  const handleChange = (e) => {
     setTodo(e.target.value);
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
      {error ? <p>input is empty</p> : null}
      {todoList.map((items, i) => (
        <div key={i}>
          <p>{items}</p>
          <button onClick={() => handleMarkAsRead(i)}> MarkAsRead </button>
        </div>
      ))}
    </div>
  );
}

export default App;
