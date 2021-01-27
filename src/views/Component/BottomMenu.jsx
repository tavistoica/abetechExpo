import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { width } from "react-native-dimension";
import OsWrapper from "./OsWrapper";
import * as RootNavigation from "./RootNavigation";
import { connect } from "react-redux";
import * as actions from "../../actions";

let colors = {};

const BottomMenu = (props) => {
  colors = props.settings.colors;
  return (
    <OsWrapper
      styleIOS={styles.headerIos}
      styleAndroid={styles.headerAndroid}
      backColor={props.settings.colors.main_color}
    >
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          RootNavigation.navigate("product_list");
        }}
      >
        <MaterialIcons
          name="search"
          color={props.settings.colors.secondary_color}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => RootNavigation.navigate("favs")}
      >
        <MaterialIcons
          name="favorite-border"
          color={props.settings.colors.secondary_color}
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
          color={props.settings.colors.secondary_color}
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
          color={props.settings.colors.secondary_color}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          RootNavigation.navigate("profile");
        }}
      >
        <MaterialIcons
          name="person-outline"
          color={props.settings.colors.secondary_color}
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
    backgroundColor: colors.main_color,
  },
  headerAndroid: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    width: width(100),
    height: "5%",
    backgroundColor: colors.main_color,
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

const mapStatetoProps = (state) => {
  return {
    settings: state.settings,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(BottomMenu);
