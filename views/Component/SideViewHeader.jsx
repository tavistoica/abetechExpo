import { auto } from "eol";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Third_color } from "../../Helper/Common";

const SideViewHeader = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        textAlignVertical: "center",
        textAlign: "center",
        width: "100%",
        marginBottom: "5%",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          textAlignVertical: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 8 }}>
          {props.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("edit_profile");
        }}
        style={{ marginLeft: "5%", position: "absolute" }}
      >
        <Feather name="arrow-left" size={32} color={Third_color()} />
      </TouchableOpacity>
    </View>
  );
};

export default SideViewHeader;
