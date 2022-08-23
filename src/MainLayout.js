import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "./Components/Navbar";
import { ScreenContext } from "./context/screen/screenContext";
import MainScreen from "./Screens/MainScreen";
import TodoScreen from "./Screens/TodoScreen";

const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View style={styles.wrapper}>
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
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
});

export default MainLayout;
