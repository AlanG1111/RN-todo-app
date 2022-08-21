import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../theme";

const Navbar = () => {
  return (
    <View style={style.navbar}>
      <Text style={style.text}>Todo app</Text>
    </View>
  );
};

const style = StyleSheet.create({
  navbar: {
    height: 80,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: THEME.MAIN_COLOR,
    paddingBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default Navbar;
