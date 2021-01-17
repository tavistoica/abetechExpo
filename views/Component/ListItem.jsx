import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ListItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate(props.redirect);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: props.settings.colors.main_color,
          width: "100%",
          marginBottom: 1,
          paddingVertical: 12,
          textAlignVertical: "center",

          color: "#fff",
        }}
      >
        <Text
          style={{
            width: "100%",
            fontSize: 20,
            textAlign: "center",
            textAlignVertical: "center",
            color: "#fff",
          }}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
