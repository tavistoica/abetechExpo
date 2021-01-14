import React, { useState } from "react";
import { View, Image, ImageBackground, Alert, StatusBar } from "react-native";
import { GlobalImgs } from "@assets/imgs";
import { _getAppSetting } from "../../Helper/FirebaseHelper";
import Spinner from "react-native-loading-spinner-overlay";
import { width, height } from "react-native-dimension";
import { connect } from "react-redux";
import * as actions from "../../actions";

const Splash = (props) => {
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(true);

  const loadSetting = async () => {
    let setting = await _getAppSetting();
    if (setting == null) {
      Alert("Sorry, we could not get setting information.");
      return;
    }
    global.setting = setting;
    setLogo(setting.logo.original);
    setLoading(false);
    setTimeout(() => {
      props.navigation.replace("home");
    }, 2500);
  };

  loadSetting();

  return (
    <>
      {loading === true ? (
        <Spinner visible={true} />
      ) : (
        <>
          <StatusBar hidden />
          <ImageBackground
            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
            // source={GlobalImgs.bg}
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
                source={{ uri: logo }}
              />
            </View>
          </ImageBackground>
        </>
      )}
    </>
  );
};

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Splash);
