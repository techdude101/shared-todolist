import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from './Header';
import Form from './Form';
import Todos from './Todos';

const URL = "http://192.168.0.13:3000/todos";

const TodoList = () => {
  const [loaded, setLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const key = "shared-todo-list";
  const { id } = useParams();

  useEffect(() => {
    const loadTodosFromLocalStorage = () => {
      if (typeof Storage !== "undefined") {
        const data = JSON.parse(window.localStorage.getItem(key));
        if (data && data.todos !== undefined) {
          return data.todos;
        }
        return null;
      }
    };

    const loadTodosFromDB = async () => {
      try {
        const data = await fetch(`${URL}/${id}`,
          { method: 'GET' });
        const jsonData = await data.json();
        // API returns message: "No data" if not found in DB
        if (jsonData[0].todos !== undefined) return jsonData[0].todos;
        return null;
      } catch (err) {
        return null;
      }
    };

    async function loadData() {
      const localTodos = loadTodosFromLocalStorage();
      const dbTodos = await loadTodosFromDB();

      if ((localTodos !== null) && (dbTodos !== null)) {
        localTodos.length > dbTodos.length ? setTodos(localTodos) : setTodos(dbTodos);
      } else if (dbTodos === null) {
        setTodos(localTodos);
      } else if (localTodos === null) {
        setTodos(dbTodos);
      }
    }
    loadData();
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Check if id already in DB
    const loadTodosFromDB = async () => {
      const data = await fetch(`${URL}/${id}`,
        { method: 'GET' });
      const jsonData = await data.json();
      if (jsonData.message === undefined) return true; // API returns message: "No data" if not found in DB
      return false;
    };

    const saveTodosToDB = async () => {
      const exists = await loadTodosFromDB();
      let updateMethod = 'PATCH';
      if (exists) {
        // PATCH method to update DB
        updateMethod = 'PATCH';
      } else {
        // POST method to create list in DB
        updateMethod = 'POST';
      }
      fetch(`${URL}/${id}`,
        {
          method: updateMethod,
          body: JSON.stringify({ todos: todos }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        .then(response => response.json())
        .catch(err => console.log(err))
      return;
    };

    const saveTodosToLocalStorage = () => {
      if (typeof Storage !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify({ id: id, todos: todos }));
      }
    };

    if (loaded) {
      saveTodosToLocalStorage();
      saveTodosToDB();
    }
  }, [id, todos]);

  const addTodo = (todo) => {
    // Limit the number of todos to 50
    if (todos.length < 50) {
      const todosCopy = [...todos];
      todosCopy.push(todo);
      setTodos(todosCopy);
    }
  }

  const renderTodos = () => {
    if (todos && loaded) {
      return <Todos todos={todos} setTodos={setTodos} />
    } else {
      return <h2>Loading...</h2>
    }
  }

  return (
    <>
      <Header text="Todo List" />
      <Form add={addTodo} />
      {renderTodos()}
    </>
  );
}

export default TodoList;