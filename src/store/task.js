import { createAction, createSlice } from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import { setError } from "./errors";
import { nanoid } from "nanoid";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskAdded(state, action) {
      // state.entities.push({ ...action.payload, id: nanoid() });
      // console.log("state.entities:", state.entities);
      // state.isLoading = false;
      state.entities = [...state.entities, { ...action.payload, id: nanoid() }];
      console.log("state.entities:", state.entities);
      state.isLoading = false;
    },
    loadTasksRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state) {
      state.isLoading = false;
    },
  },
});
const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  received,
  taskRequestFailed,
  taskAdded,
  loadTasksRequested,
} = actions;
const taskRequested = createAction("task/taskRequested");

export const loadTasks = () => async (dispatch) => {
  dispatch(loadTasksRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};
export const createTask = (task) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.create(task);
    dispatch(taskAdded(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
