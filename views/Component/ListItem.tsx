import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface Colors {
  main_color;
}

interface Settings {
  colors: Colors;
}

interface Props {
  navigation: any;
  text: string;
  redirect: string;
  settings: Settings;
}

const ListItem = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate(props.redirect);
      }}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: props.settings.colors.main_color },
        ]}
      >
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 1,
    paddingVertical: 12,
    textAlignVertical: "center",
    color: "#fff",
  },
  text: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
  },
});

export default ListItem;
