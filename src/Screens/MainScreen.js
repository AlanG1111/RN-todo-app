import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddTodo from "../Components/AddTodo";
import Todo from "../Components/Todo";
import AppLoader from "../Components/ui/AppLoader";
import { ScreenContext } from "../context/screen/screenContext";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

const MainScreen = () => {
  const { addTodo, removeTodo, todos, fetchTodos, loading, error } =
    useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - 60
  );

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width - 60;
      setDeviceWidth(width);
    };

    Dimensions.addEventListener("change", update);
    return () => {
      Dimensions.removeEventListener("change", update);
    };
  });

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title='Repeat' onPress={loadTodos} />
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <View style={{ width: deviceWidth }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={todos}
            renderItem={({ item }) => (
              <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
            )}
          />
        </View>
      ) : (
        <View style={styles.imgWrapp}>
          <Text>No todo</Text>
          <Image
            style={styles.img}
            source={require("../../assets/no-items.png")}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrapp: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 340,
  },
  img: {
    marginTop: 10,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});

export default MainScreen;
