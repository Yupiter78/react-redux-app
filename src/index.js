import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as actions from "./store/actionTypes";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);
  const completeTask = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, completed: true },
    });
  };

  const changeTitles = (taskId) => {
    store.dispatch({
      type: actions.taskUpdated,
      payload: { id: taskId, title: `New title for ${taskId}` },
    });
  };
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Completed</button>
            <button onClick={() => changeTitles(el.id)}>Change title</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
