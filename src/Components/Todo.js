import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      onPress={() => onOpen(todo.id)}
      onLongPress={onRemove.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Todo;
