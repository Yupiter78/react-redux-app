import { createStore } from "redux";
import reducer from "./task";

function configureStore() {
  return createStore(reducer);
}

export default configureStore;
