import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import * as RootNavigation from "../../RootNavigation";

const BottomMenuElement = ({ settings, route, size, icon }) => {
  return (
    <TouchableOpacity
      style={styles.drawerItem}
      onPress={async () => {
        RootNavigation.navigate(route);
      }}
    >
      <IonIcons
        name={icon}
        color={settings.colors.secondary_color}
        size={size}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 1,
    width: "20%",
    height: "100%",
    justifyContent: "space-evenly",
  },
});

export default BottomMenuElement;
