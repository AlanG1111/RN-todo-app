import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import EditModal from "../Components/EditModal";
import AppCard from "../Components/ui/AppCard";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

const TodoScreen = () => {
  const { todos, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  const todo = todos.find((t) => t.id === todoId);

  const saveHandler = (title) => {
    updateTodo(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        updateTodo={saveHandler}
      />
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title='edit' onPress={() => setModal(true)}></Button>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title='Go back'
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Delete'
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  title: {
    fontSize: 20,
  },
});

export default TodoScreen;
