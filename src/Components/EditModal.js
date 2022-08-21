import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { THEME } from "../theme";

const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value);

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert(
        "Error",
        `Min length of title is 3. Now is ${title.trim().length}`
      );
    } else {
      onSave(title);
    }
    // console.log("1", title);
  };

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder='Write the title'
          maxLength={64}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <View style={styles.buttons}>
          <Button
            title='Cancel'
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title='Save' onPress={saveHandler} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default EditModal;
