import React, { useRef, useState } from "react";
import "./Dashboard.css";

import { signOut } from "firebase/auth";
import { auth, db } from "./firebaseConfig";

import uuid from "react-uuid";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Dashboard({ setMyuser }) {
  const [todo, setTodo] = useState([]);

  const newItem = useRef(null);

  const collectionRef = collection(db, "myList");

  const getData = () => {
    getDocs(collectionRef).then((res) => {
      setTodo(
        res.docs.map((doc) => {
          return {
            ...doc.data(),
            keyid: doc.id,
          };
        })
      );
    });
  };

  getData();

  const addItem = (e) => {
    e.preventDefault();
    setTodo([
      ...todo,
      {
        id: uuid(),
        name: newItem.current.value,
      },
    ]);

    addDoc(collectionRef, {
      id: uuid(),
      name: newItem.current.value,
    }).catch((e) => alert(e.message));

    newItem.current.value = "";
    // newItem.current.blur();
  };

  const removeItem = (id) => {
    deleteDoc(doc(db, "myList", id));

    /*
    const newItems = [];
    todo.filter((item) => {
      if (item.id !== id) {
        newItems.push(item);
      }
    });
    setTodo(newItems);
    */
    // deleteDoc(collectionRef, id);
  };

  const updateItem = (id) => {
    const newValue = prompt("Enter new value", "");

    console.log(id);

    updateDoc(doc(db, "myList", id), {
      name: newValue,
    });

    /*
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
    */
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
          <div className="single-item" key={item.keyid}>
            <h4>{item.name}</h4>
            <button onClick={() => updateItem(item.keyid)}>EDIT</button>
            <button onClick={() => removeItem(item.keyid)}>DELETE</button>
          </div>
        ))}
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
