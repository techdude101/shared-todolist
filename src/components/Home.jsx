import { useHistory } from "react-router-dom";
import React, {useEffect} from "react";
import { nanoid } from 'nanoid';
import Header from "./Header";

const Home = () => {
    const key = "shared-todo-list";
    let history = useHistory();

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

    return (
        <div>
            <Header text="Todo List" />
            <h1 onClick={clickHandler}>Click to create a new list</h1>
        </div>
    )
}

export default Home;