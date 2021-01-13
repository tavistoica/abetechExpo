import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableHighlight,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { width } from "react-native-dimension";
import {
  Secondary_color,
  Primary_color,
  Main_color,
  Third_color,
} from "../../Helper/Common";

const bottomMenuBeforePlatformCheck = (props) => {
  return (
    <>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={async () => {
          props.navigation.navigate("product_list");
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
          props.navigation.navigate("favs");
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
          // props.removeUser();
          props.navigation.navigate("discoveryPage");
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
          // props.removeUser();
          props.navigation.navigate("mycart");
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
          props.navigation.navigate("edit_profile");
        }}
      >
        <MaterialIcons
          name="person-outline"
          color={Secondary_color()}
          size={26}
          style={styles.drawerItem_icon}
        />
      </TouchableOpacity>
    </>
  );
};

const BottomMenu = (props) => {
  return (
    <>
      {Platform.OS === "ios" ? (
        <SafeAreaView
          style={[styles.headerIos, { backgroundColor: Main_color() }]}
        >
          {bottomMenuBeforePlatformCheck(props)}
        </SafeAreaView>
      ) : (
        <View style={[styles.headerAndroid, { backgroundColor: Main_color() }]}>
          {bottomMenuBeforePlatformCheck(props)}
        </View>
      )}
    </>
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
  drawerItemDiscovery: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 10,
  },
  drawerItem_icon: {
    marginRight: 7,
  },
  msg_list: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
  },
  msg_input: {
    flex: 1,
    height: 55,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Main_color(),
    width: width(100),
  },
  inputTxt: {
    textAlignVertical: "center",
    borderColor: "#fff",
    width: width(70),
    height: "70%",
    textAlign: "left",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    width: width(10),
  },
});

export default BottomMenu;
