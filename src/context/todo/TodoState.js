import React, { useContext, useReducer } from "react";
import { Alert } from "react-native";
import { Http } from "../../http";
import { ScreenContext } from "../screen/screenContext";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";

export const TodoState = ({ children }) => {
  const initialState = {
    loading: false,
    todos: [],
    error: null,
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    const { name } = await Http.post(
      "https://rn-todo-app-d0e33-default-rtdb.europe-west1.firebasedatabase.app/todos.json",
      { title }
    );
    dispatch({ type: ADD_TODO, title, id: name });
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert("Removing element", `Do you want to delete ${todo.title}?`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          changeScreen(null);
          await Http.delete(
            `https://rn-todo-app-d0e33-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`
          );
          dispatch({ type: REMOVE_TODO, id });
        },
      },
    ]);
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-app-d0e33-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
        { title }
      );
    } catch (error) {
      showError("Something went wrong...");
      console.log(error);
    }
    dispatch({ type: UPDATE_TODO, id, title });
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        "https://rn-todo-app-d0e33-default-rtdb.europe-west1.firebasedatabase.app/todos.json"
      );
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      console.log("data", todos);
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError("Something went wrong...");
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = (error) => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
