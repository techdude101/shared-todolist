import { useHistory } from "react-router-dom";
import React, {useEffect} from "react";
import { nanoid } from 'nanoid';
import Header from "./Header";
import "./Form.css";

const Home = () => {
    const key = "shared-todo-list";
    let history = useHistory();
    let url = "";

    useEffect(() => {
        const loadTodosFromLocalStorage = () => {
            if (typeof Storage !== "undefined") {
              const data = JSON.parse(window.localStorage.getItem(key));
              if (data !== null && data.id) {
                history.push(`/list/${data.id}`);
              }
            }
          };

          loadTodosFromLocalStorage();
    }, [history]);

    const clickHandler = () => {
        const newId = nanoid();
        history.push(`/list/${newId}`);
    }

    const changeHandler = (e) => {
      url = e.target.value;
    }

    const submitHandler = (e) => {
      e.preventDefault();
      history.push(`/list/${url}`);
    }

    return (
        <div>
            <Header text="Todo List" />
            <h1 onClick={clickHandler}>Click to create a new list</h1>
            <h3>or enter/paste list ID below</h3>
            <form className="form" onSubmit={submitHandler}>
              <input className="form-input" type="text" placeholder="List ID" onChange={changeHandler} />
              <input className="form-button" type="submit" value="Go" />
            </form>
        </div>
    )
}

export default Home;