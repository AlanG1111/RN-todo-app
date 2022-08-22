import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { AppLoading } from "expo";

import Navbar from "./src/Components/Navbar";
import MainScreen from "./src/Screens/MainScreen";
import TodoScreen from "./src/Screens/TodoScreen";

// async function loadApplication() {
//   await
// }

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todos, setTodos] = useState([
    { id: "1", title: "Выучить React Native" },
  ]);
  const [todoId, setTodoId] = useState(null);

  if (!isReady) {
    return (
      <AppLoading
        // startAsync={loadApplication}
        onError={(err) => console.log(err)}
        onFinish={setIsReady(true)}
      />
    );
  }

  const addTodo = (title) =>
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);

  const removeTodo = (id) => {
    const todo = todos.find((t) => t.id === id);

    Alert.alert("Removing element", `Do you want to delete ${todo.title}?`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setTodoId(null);
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        },
      },
    ]);
  };

  const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
  };

  let content = (
    <MainScreen
      addTodo={addTodo}
      removeTodo={removeTodo}
      todos={todos}
      openTodo={setTodoId}
    />
  );

  if (todoId) {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onRemove={removeTodo}
        onSave={updateTodo}
      />
    );
  }

  return (
    <View>
      <Navbar />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
