import React, { useRef, useState } from "react";
import "./Dashboard.css";

import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

import uuid from "react-uuid";

function Dashboard({ setMyuser }) {
  const [todo, setTodo] = useState([]);

  const newItem = useRef(null);

  const addItem = (e) => {
    e.preventDefault();
    setTodo([
      ...todo,
      {
        id: uuid(),
        name: newItem.current.value,
      },
    ]);

    newItem.current.value = "";
    // newItem.current.blur();
  };

  const removeItem = (id) => {
    const newItems = [];
    todo.filter((item) => {
      if (item.id !== id) {
        newItems.push(item);
      }
    });
    setTodo(newItems);
  };

  const updateItem = (id) => {
    const newValue = prompt("Enter new value", "");
    // const arrayIndex = todo.findIndex((item) => item.id === id);

    // const newItems = todo;

    // newItems[arrayIndex].name = newValue;

    // setTodo(newItems);
    // console.log(todo);

    const lists = todo.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          name: newValue,
        };
      } else {
        return {
          id: item.id,
          name: item.name,
        };
      }

      // item.id === id ? (item.name = newValue) : item.name;
    });

    setTodo(lists);
  };

  const logout = () => {
    signOut(auth).catch((err) => err.message);
    setMyuser(null);
  };

  return (
    <div className="dashboard">
      <h1>TODO Dashboard</h1>
      <h3>Hey! Welcome back!</h3>

      <form onSubmit={addItem}>
        <input type="text" ref={newItem} required />
        <button>Add item</button>
      </form>

      <div className="all-items">
        {todo.map((item) => (
          <div className="single-item" key={item.id}>
            <h4>{item.name}</h4>
            <button onClick={() => updateItem(item.id)}>EDIT</button>
            <button onClick={() => removeItem(item.id)}>DELETE</button>
          </div>
        ))}
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
