import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface Settings {
  colors: Colors;
}

interface Colors {
  third_color: string;
}

interface Props {
  name?: string;
  navigation: any;
  redirect: string;
  settings: Settings;
}

const SideViewHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 8 }}>
          {props.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(props.redirect);
        }}
        style={{ marginLeft: "5%", position: "absolute" }}
      >
        <Feather
          name="arrow-left"
          size={32}
          color={props.settings.colors.third_color}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    textAlignVertical: "center",
    textAlign: "center",
    width: "100%",
    marginBottom: "5%",
  },
  name: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
  },
});

export default SideViewHeader;
