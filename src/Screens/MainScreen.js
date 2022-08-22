import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AddTodo from "../Components/AddTodo";
import Todo from "../Components/Todo";

const MainScreen = ({ addTodo, removeTodo, todos, openTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - 60
  );

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
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <View style={{ width: deviceWidth }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={todos}
            renderItem={({ item }) => (
              <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
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
});

export default MainScreen;
