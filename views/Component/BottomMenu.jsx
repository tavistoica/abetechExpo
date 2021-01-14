import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { width } from "react-native-dimension";
import {
  Secondary_color,
  Primary_color,
  Main_color,
  Third_color,
} from "../../Helper/Common";
import OsWrapper from "./OsWrapper";
import * as RootNavigation from "./RootNavigation";

const BottomMenu = (props) => {
  console.log("props", props);
  return (
    <OsWrapper
      styleIOS={styles.headerIos}
      styleAndroid={styles.headerAndroid}
      backColor={Main_color()}
    >
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          RootNavigation.navigate("product_list");
        }}
      >
        <MaterialIcons
          name="search"
          color={Secondary_color()}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          RootNavigation.navigate("favs");
        }}
      >
        <MaterialIcons
          name="favorite-border"
          color={Secondary_color()}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          RootNavigation.navigate("discoveryPage");
        }}
      >
        <MaterialIcons
          name="help"
          color={Secondary_color()}
          size={43}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          RootNavigation.navigate("mycart");
        }}
      >
        <AntDesign
          name="shoppingcart"
          color={Secondary_color()}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          RootNavigation.navigate("edit_profile");
        }}
      >
        <MaterialIcons
          name="person-outline"
          color={Secondary_color()}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingLeft: 10,
  },
  headerIos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: "9%",
    backgroundColor: Main_color(),
  },
  headerAndroid: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: "5%",
    backgroundColor: Main_color(),
  },
  drawerItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  drawerItem_icon: {
    marginRight: 7,
  },
});

export default BottomMenu;
