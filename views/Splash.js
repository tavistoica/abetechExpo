import React from "react";
import {
  View,
  Image,
  ImageBackground,
  Alert,
  StatusBar,
  LogBox,
} from "react-native";
import { GlobalImgs } from "@assets/imgs";
import { _getAppSetting } from "../Helper/FirebaseHelper";
import Spinner from "react-native-loading-spinner-overlay";
import { width, height } from "react-native-dimension";
import { connect } from "react-redux";
import * as actions from "./actions";

// LogBox.ignoreWarnings([
//   "Non-serializable values were found in the navigation state",
// ]);

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      loading: false,
      logo: "",
    };
  }

  componentDidMount() {
    this.loadSetting();
  }

  loadSetting = async () => {
    this.setState({ loading: true });
    let setting = await _getAppSetting();
    if (setting == null) {
      Alert("Sorry, we could not get setting information.");
      return;
    }
    global.setting = setting;
    console.log("setting : ", global.setting);
    this.setState({ loading: false, logo: setting.logo.original });
    var that = this;
    setTimeout(function() {
      that.goMain();
    }, 2500);
  };

  goMain = async () => {
    // if (this.props.auth.id === null) {
    //   this.props.navigation.replace("login");
    // } else {
    this.props.navigation.replace("home");
    // }
  };

  render() {
    return (
      <>
        {this.state.loading === true ? (
          <Spinner visible={true} />
        ) : (
          <>
            <StatusBar hidden />
            <ImageBackground
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={GlobalImgs.bg}
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
                  source={{ uri: this.state.logo }}
                />
              </View>
            </ImageBackground>
          </>
        )}
      </>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStatetoProps,
  actions
)(Splash);
