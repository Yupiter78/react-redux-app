import { createStore } from "redux";
import reducer from "./task";

const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
];
function configureStore() {
  return createStore(reducer, initialState);
}

export default configureStore;
