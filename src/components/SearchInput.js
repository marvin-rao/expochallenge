import React, { useCallback } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SearchInput = ({ onSearch, onClear }) => {
  const textInputRef = React.useRef();
  const [text, setText] = React.useState("");

  const clear = useCallback(() => {
    onClear();
    textInputRef.current.clear();
    setText("");
    Keyboard.dismiss();
  });

  return (
    <View style={styles.root}>
      <TextInput
        ref={textInputRef}
        placeholder="Search"
        style={styles.search}
        onChangeText={(v) => {
          setText(v);
          onSearch(v);
        }}
        onSubmitEditing={() => {
          onSearch(text);
        }}
      />
      <MaterialIcons
        name="clear"
        size={24}
        color={"black"}
        style={styles.clear}
        onPress={() => {
          clear();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 12,
    borderRadius: 10,
  },
  search: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    flex: 1,
  },
  clear: {
    margin: 10,
  },
});

export default SearchInput;
