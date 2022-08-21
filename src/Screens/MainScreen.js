import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import AddTodo from "../Components/AddTodo";
import Todo from "../Components/Todo";

const MainScreen = ({ addTodo, removeTodo, todos, openTodo }) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {todos.length ? (
        <FlatList
          keyExtractor={(item) => item.id}
          data={todos}
          renderItem={({ item }) => (
            <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
          )}
        />
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
