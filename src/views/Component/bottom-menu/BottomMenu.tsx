import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import OsWrapper from "../OsWrapper";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import BottomMenuElement from "./components/BottomMenuElement";
// import * as RootNavigation from "../RootNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { NavigationContainer } from "@react-navigation/native";

let colors = {};

interface Props {
  settings: any;
}

const BottomMenu = (props: Props) => {
  const Tab = createBottomTabNavigator();
  const [activeScreen, setActiveScreen] = useState("");
  colors = props.settings.colors;

  // useEffect(() => {
  //   setActiveScreen(
  //     RootNavigation.navigationRef.current.getCurrentRoute().name
  //   );
  // }, [RootNavigation.navigationRef.current.getCurrentRoute()]);

  return (
    <OsWrapper
      styleIOS={styles.headerIos}
      styleAndroid={styles.headerAndroid}
      backColor={props.settings.colors.main_color}
    >
      <BottomMenuElement
        settings={props.settings}
        route={"product_list"}
        size={26}
        icon={"search-outline"}
      />
      <BottomMenuElement
        settings={props.settings}
        route={"favs"}
        size={26}
        icon={"heart-outline"}
      />
      <BottomMenuElement
        settings={props.settings}
        route={"discoveryPage"}
        size={45}
        icon={"compass-outline"}
      />
      <BottomMenuElement
        settings={props.settings}
        route={"mycart"}
        size={26}
        icon={"cart-outline"}
      />
      <BottomMenuElement
        settings={props.settings}
        route={"profile"}
        size={26}
        icon={"person-circle-outline"}
      />
    </OsWrapper>
  );
};

const styles = StyleSheet.create({
  headerIos: {
    flexDirection: "row",
    width: "100%",
  },
  headerAndroid: {
    flexDirection: "row",
    width: "100%",
  },
});

const mapStatetoProps = (state: any) => {
  return {
    settings: state.settings,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(BottomMenu);
