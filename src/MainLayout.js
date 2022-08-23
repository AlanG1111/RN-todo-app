import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "./Components/Navbar";
import { ScreenContext } from "./context/screen/screenContext";
import { TodoContext } from "./context/todo/todoContext";
import MainScreen from "./Screens/MainScreen";
import TodoScreen from "./Screens/TodoScreen";

const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

export default MainLayout;
