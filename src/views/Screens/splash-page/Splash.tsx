import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../actions";

interface Props {
  settings: Settings;
  auth: Auth;
  getCategory: (body: object) => any;
  getAppSettings: () => any;
  getFavorite: (id: string) => any;
  getProducts: (query: object) => any;
  productsLoading: () => any;
  navigation: any;
}

interface Settings {
  errorMessage: string;
  logo: string;
}

interface Auth {
  id: string;
}

interface State {
  settings: Settings;
  auth: Auth;
}

const Splash = (props: Props) => {
  useEffect(() => {
    props.getCategory({});
    props.productsLoading();
    props.getProducts({});
    props.getAppSettings();
    props.getFavorite(props.auth.id);
    if (props.settings.errorMessage !== null) return;
    setTimeout(() => {
      props.navigation.replace("product_list");
    }, 2500);
  }, []);

  return (
    <>
      {/* <ImageBackground style={styles.image} source={{ uri: null }}> */}
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: "50%",
            height: "50%",
            marginBottom: "20%",
            resizeMode: "cover",
          }}
          source={{ uri: props.settings.logo }}
        />
      </View>
      {/* </ImageBackground> */}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

const mapStatetoProps = (state: State) => {
  return {
    settings: state.settings,
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Splash);
