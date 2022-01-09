import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import { taskCompleted, titleChanged, taskDeleted } from "./store/task";

const store = configureStore();

const App = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);
  const completeTask = (taskId) => {
    store.dispatch((getState, dispatch) => {
      console.log(dispatch, getState);
      store.dispatch(taskCompleted(taskId));
    });
  };

  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId));
  };
  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId));
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
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
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
