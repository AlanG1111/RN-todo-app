import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import EditModal from "../Components/EditModal";
import AppCard from "../Components/ui/AppCard";
import { THEME } from "../theme";

const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  const saveHandler = (title) => {
    onSave(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title='edit' onPress={() => setModal(true)}></Button>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title='Go back' color={THEME.GREY_COLOR} onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button
            title='Delete'
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
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
