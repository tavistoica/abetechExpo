import React from "react";
import { TouchableHighlight, StyleSheet, Text } from "react-native";

const MyButton = (props) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={props.underlayColor}
      onPress={props.onPress}
      style={[styles.button, props.style]}
    >
      <Text style={props.textStyle}>{props.title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});

export default MyButton;
