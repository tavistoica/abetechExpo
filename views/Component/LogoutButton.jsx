import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const LogoutButton = (props) => {
  return (
    <View style={styles.fixedView}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          props.removeUser();
          props.clearCart();
          props.deleteFavorite();
        }}
      >
        <AntDesign
          name="logout"
          color={props.settings.colors.secondary_color}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedView: {
    position: "absolute",
    marginRight: 16,
    right: 0,
    top: "0%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

export default LogoutButton;
