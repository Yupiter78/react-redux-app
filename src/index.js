import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function taskReducer(state, action) {
  switch (action.type) {
    case "task/completed":
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex].completed = true;
      return newArray;
    case "task/updated": {
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
      return newArray;
    }
    default:
      break;
  }
}

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return { getState, dispatch, subscribe };
}

const store = createStore(taskReducer, [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
]);

const App = () => {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);
  const completeTask = (taskId) => {
    store.dispatch({ type: "task/completed", payload: { id: taskId } });
  };

  const changeTitles = (taskId) => {
    store.dispatch({
      type: "task/updated",
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
