import React, { useState, useEffect } from "react";
import { View, Image, ImageBackground, StatusBar } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { width, height } from "react-native-dimension";
import { connect } from "react-redux";
import * as actions from "../../actions";

const Splash = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.getCategory();
    props.getAppSettings();
    props.getFavorite(props.auth.id);
    if (props.settings.errorMessage !== null) return;
    setLoading(false);
    setTimeout(() => {
      props.navigation.replace("product_list");
    }, 2500);
  }, []);

  return (
    <>
      <ImageBackground
        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        source={{ uri: null }}
      >
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
              width: width(50),
              height: width(50),
              marginBottom: height(20),
              resizeMode: "cover",
            }}
            source={{ uri: props.settings.logo }}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    settings: state.settings,
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Splash);
